import axios from "axios";
import moment from "moment";
import { getInOrderOfPreference } from "./helpers";

const apiKey = "540aeef7e13540ecbfad5d2023d5998c";
const locationUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

const jerusalemGeonameId = "281184";

const chanukahRegex = /^Chanukah: (\d) Candles?: (\d\d?:\d\dpm)$/;

// All side-effecty functions in one place
export async function makeLocationAndHebcalReqs(
  preciseInfo: PreciseLocationInfo | null = null
): Promise<LocationHebCalResult> {
  const locationResponse = await axios.get<LocationInfo>(locationUrl);
  const {
    city,
    geoname_id,
    latitude,
    longitude,
    time_zone: { name: tzid }
  } = locationResponse.data;

  const hebcalUrl = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=on&geo=pos&m=0&s=off&latitude=${
    preciseInfo ? preciseInfo.latitude : latitude
  }&longitude=${preciseInfo ? preciseInfo.longitude : longitude}&tzid=${
    preciseInfo ? preciseInfo.tzId : tzid
  }`;
  const { data } = await axios.get<HebCalResponse>(hebcalUrl);

  const now = new Date();

  return { city, geoname_id, items: data.items, now };
}

function getLightingInfoFromHebcalItem(item: HebCalItem): LightingInfo | null {
  const regexResult = item.title.match(chanukahRegex);

  if (regexResult) {
    return {
      count: parseInt(regexResult[1]),
      // timeStr: regexResult[2],
      lightingTime: new Date(item.date)
    };
  }
  return null;
}

// export function extractLightingInfo({
//   geoname_id,
//   city,
//   items,
//   now
// }: LocationHebCalResult): FullLightingInfo | null {
//   const nowMoment = moment(now);

//   const fridayNum = 5; // Sun=0, Sat=6
//   const itsFriday = nowMoment.day() === fridayNum;
//   const todayDate = nowMoment.format("YYYY-MM-DD");
//   const inJerusalem = geoname_id === jerusalemGeonameId;

//   const chanukahItems = items.filter(item => item.title.match(regex));
//   const todayItem = find(
//     chanukahItems,
//     item =>
//       // item.date.startsWith(todayDate)
//       true
//   );

//   /**
//    * If it's friday and in Jerusalem: use 40 instead of 18 pre-shkiah time
//    * else ULT
//    */

//   if (todayItem) {
//     // It's Chanukah, bitches
//     const lightingInfo = getLightingInfoFromHebcalItem(todayItem);
//     if (lightingInfo) {
//       if (inJerusalem && itsFriday) {
//         return {
//           ...lightingInfo,
//           location: city,
//           timeStr: moment(lightingInfo.lightingTime)
//             .subtract(22, "minutes")
//             .format("h:mma")
//         };
//       } else {
//         return { ...lightingInfo, location: city };
//       }
//     }
//   }
//   return null;
// }

interface TimeZoneApiResponse {
  geo: {
    city: string;
  };
  timezone: string;
}

async function getGeoGivenCoords(
  latitude: number,
  longitude: number
): Promise<PreciseLocationInfo> {
  const url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${latitude}&long=${longitude}`;

  const { data } = await axios.get<TimeZoneApiResponse>(url);

  return {
    cityName: data.geo.city,
    latitude,
    longitude,
    tzId: data.timezone
  };
}

export function getGeoLocation(): Promise<PreciseLocationInfo | null> {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          getGeoGivenCoords(
            position.coords.latitude,
            position.coords.longitude
          ).then(resolve);
        },
        () => resolve(null)
      );
    } else {
      resolve(null);
    }
  });
}

/**
 * New functionality to extract only relevant information from Hebcal
 */

async function getLocationInfo({
  latitude,
  longitude
}: Coordinates): Promise<GeocodingResult | null> {
  const apiKey = "AIzaSyBOjCfj4s39EnTIynqE9n8VTG4BxwGxDKI";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  const { data } = await axios.get<GeocodingApiResponse>(url);

  if (data.status === "OK") {
    return getInOrderOfPreference(
      data.results,
      (geocodingResult, value) => geocodingResult.types.includes(value),
      "colloquial_area",
      "locality",
      "political"
    );
  } else {
    return null;
  }
}

type Timezone = string;

interface TonightChanukah {
  candleCount: number; // 1 <= x <= 8
  cityName: string | null;
  candleLightingTime: { day: "Weekday"; time: Date } | { day: "Friday" };
}

export async function getTodayChanukahEvent(
  today: Date,
  coords: Coordinates,
  timezone: Timezone
): Promise<TonightChanukah | null> {
  const { latitude, longitude } = coords;

  const hebcalUrl = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=on&geo=pos&m=0&s=off&latitude=${latitude}&longitude=${longitude}&tzid=${timezone}`;

  const { data } = await axios.get<HebCalResponse>(hebcalUrl);

  const todayMoment = moment(today);
  const todayDate = todayMoment.format("YYYY-MM-DD");

  const chanukahItems = data.items.filter(item =>
    item.title.match(chanukahRegex)
  );

  const todayItem = chanukahItems.find(
    item => item.date.startsWith(todayDate) // Get first one that matches today's date
    // () => true // get the first day of Chanukah, regardless of whether it matches today or not
  );

  if (todayItem) {
    // It's Chanukah, bitches

    const lightingInfo = getLightingInfoFromHebcalItem(todayItem);

    if (lightingInfo) {
      const geocodingResult = await getLocationInfo(coords);
      const cityName = geocodingResult
        ? geocodingResult.formatted_address
        : null;

      const fridayNum = 5; // Sun=0, Sat=6
      const itsFriday = todayMoment.day() === fridayNum;

      return {
        candleCount: lightingInfo.count,
        candleLightingTime: itsFriday
          ? { day: "Friday" }
          : { day: "Weekday", time: lightingInfo.lightingTime },
        cityName
      };
    }
  }
  return null;
}
