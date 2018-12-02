import React, { Component } from "react";
import axios from "axios";
import find from "lodash/find";
import moment, { Moment } from "moment";

const locationUrl =
  "https://api.ipgeolocation.io/ipgeo?apiKey=540aeef7e13540ecbfad5d2023d5998c";
const regex = /^Chanukah: (\d) Candles?: (\d\d?:\d\dpm)$/;

const jerusalemGeonameId = "281184";

interface LightingInfo {
  count: number;
  timeStr: string;
  date: Moment;
}

interface FullLightingInfo extends LightingInfo {
  location: string;
}

interface State {
  info: FullLightingInfo | null;
  hasError: boolean;
}

interface LocationInfo {
  geoname_id: string;
  city: string;
  latitude: string;
  longitude: string;
  time_zone: { name: string };
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
async function makeLocationAndHebcalReqs(): Promise<LocationHebCalResult> {
  const locationResponse = await axios.get<LocationInfo>(locationUrl);
  const {
    city,
    geoname_id,
    latitude,
    longitude,
    time_zone: { name: tzid }
  } = locationResponse.data;

  const hebcalUrl = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=on&geo=pos&m=0&s=off&latitude=${latitude}&longitude=${longitude}&tzid=${tzid}`;
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
  const todayItem = find(chanukahItems, item =>
    item.date.startsWith(todayDate)
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

export default class CandleCount extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { info: null, hasError: false };
    // this.state = { info: { count: 1, location: "Edgware", time: "5:36pm" } };
  }

  async componentDidMount() {
    const result = await makeLocationAndHebcalReqs();
    const info = extractLightingInfo(result);
    this.setState({ info });
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { info, hasError } = this.state;
    if (!hasError && info) {
      return (
        <h3>
          Tonight in {info.location} one lights {info.count} candle
          {info.count === 1 ? "" : "s"} at {info.timeStr}
        </h3>
      );
    } else {
      return null;
    }
  }
}
