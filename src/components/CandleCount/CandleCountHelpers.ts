import axios from "axios";
import { getInOrderOfPreference, momentDay } from "./helpers";
import { captureException } from "@sentry/browser";

const chanukahRegex = /^Chanukah: (\d) Candles?: (\d\d?:\d\dpm)$/;

function getLightingInfoFromHebcalItem(item: HebCalItem): LightingInfo {
  const regexResult = item.title.match(chanukahRegex);

  if (regexResult) {
    return {
      count: parseInt(regexResult[1]),
      // timeStr: regexResult[2],
      lightingTime: new Date(item.date)
    };
  } else {
    throw new Error(
      `HebCalItem didn't contain Chanukah timing Title is: ${item.title}`
    );
  }
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

export async function getTodayChanukahEvent(
  today: Date,
  coords: Coordinates,
  timezone: Timezone
): Promise<TonightChanukahData> {
  const { latitude, longitude } = coords;

  const hebcalUrl = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=on&geo=pos&m=0&s=off&latitude=${latitude}&longitude=${longitude}&tzid=${timezone}`;

  const { data } = await axios.get<HebCalResponse>(hebcalUrl);

  if (!data.items) {
    const jsonStr = JSON.stringify(data, null, 2);
    const err = new Error(
      `Expected HebCal data to have "items" property but instead has shape ${jsonStr}`
    );
    captureException(err);
  }

  // change the 0 number to test various scenarios
  const todayMoment = momentDay(today).add(0, "days");

  const chanukahDatedItems = data.items.filter(item =>
    item.title.match(chanukahRegex)
  );

  const chanukahTodayOpt =
    chanukahDatedItems.find(item =>
      momentDay(item.date).isSame(todayMoment, "day")
    ) || null;

  if (chanukahTodayOpt) {
    // It's Chanukah, bitches 🕎

    const lightingInfo = getLightingInfoFromHebcalItem(chanukahTodayOpt);

    const geocodingResult = await getLocationInfo(coords);
    const cityName = geocodingResult ? geocodingResult.formatted_address : null;

    const fridayNum = 5; // Sun=0, Sat=6
    const itsFriday = todayMoment.day() === fridayNum;

    return {
      label: "Chanukah",
      candleCount: lightingInfo.count,
      candleLightingTime: itsFriday
        ? { day: "Friday" }
        : { day: "Weekday", time: lightingInfo.lightingTime },
      cityName
    };
  } else {
    const diff = -todayMoment.diff(
      momentDay(chanukahDatedItems[0].date),
      "days"
    );

    return { label: "NotChanukah", daysUntilChanukah: diff };
  }
}
