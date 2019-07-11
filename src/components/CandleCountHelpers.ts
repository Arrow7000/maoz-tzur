import axios from "axios";
import find from "lodash/find";
import moment, { Moment } from "moment";

const apiKey = "540aeef7e13540ecbfad5d2023d5998c";

const locationUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

const regex = /^Chanukah: (\d) Candles?: (\d\d?:\d\dpm)$/;

const jerusalemGeonameId = "281184";

interface LightingInfo {
  count: number;
  timeStr: string;
  date: Moment;
}

export interface FullLightingInfo extends LightingInfo {
  location: string;
}

interface LocationInfo {
  geoname_id: string;
  city: string;
  latitude: string;
  longitude: string;
  time_zone: { name: string };
}

/**
 * From IPGeolocation timezone API
 */
export interface PreciseLocationInfo {
  latitude: number;
  longitude: number;
  tzId: string;
  cityName: string;
}

export interface HebCalItem {
  memo?: string;
  title: string;
  date: string;
  subcat?: string;
  link?: string;
  category: string;
  hebrew: string;
}

type HebCalResponse = {
  items: HebCalItem[];
};

export interface LocationHebCalResult {
  geoname_id: string;
  city: string;
  items: HebCalItem[];
  now: Moment;
}

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

  const now = moment();

  return { city, geoname_id, items: data.items, now };
}

function getLightingInfoFromHebcalItem(item: HebCalItem): LightingInfo | null {
  const regexResult = item.title.match(regex);
  if (regexResult) {
    return {
      count: parseInt(regexResult[1]),
      timeStr: regexResult[2],
      date: moment(item.date)
    };
  }
  return null;
}

export function extractLightingInfo({
  geoname_id,
  city,
  items,
  now
}: LocationHebCalResult): FullLightingInfo | null {
  const fridayNum = 5; // Sun=0, Sat=6
  const itsFriday = now.day() === fridayNum;
  const todayDate = now.format("YYYY-MM-DD");
  const inJerusalem = geoname_id === jerusalemGeonameId;

  const chanukahItems = items.filter(item => item.title.match(regex));
  const todayItem = find(
    chanukahItems,
    item =>
      // item.date.startsWith(todayDate)
      true
  );

  /**
   * If it's friday and in Jerusalem: use 40 instead of 18 pre-shkiah time
   * else ULT
   */

  if (todayItem) {
    // It's Chanukah, bitches
    const lightingInfo = getLightingInfoFromHebcalItem(todayItem);
    if (lightingInfo) {
      if (inJerusalem && itsFriday) {
        return {
          ...lightingInfo,
          location: city,
          timeStr: moment(lightingInfo.date)
            .subtract(22, "minutes")
            .format("h:mma")
        };
      } else {
        return { ...lightingInfo, location: city };
      }
    }
  }
  return null;
}

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
