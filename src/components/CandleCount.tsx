import React, { Component } from "react";
import axios from "axios";
import find from "lodash/find";
import moment from "moment";

const locationUrl = `http://api.ipstack.com/check?access_key=${
  process.env.IP_STACK_KEY
}&format=1`;
const regex = /^Chanukah: (\d) Candles?: (\d\d?:\d\dpm)$/;

interface LightingInfo {
  count: number;
  time: string;
}

interface FullLightingInfo extends LightingInfo {
  location: string;
}

interface State {
  info: FullLightingInfo | null;
  hasError: boolean;
}

interface LocationInfo {
  city: string;
  location: { geoname_id: number };
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

// All side-effecty functions in one place
async function makeLocationAndHebcalReqs() {
  const locationResponse = await axios.get<LocationInfo>(locationUrl);
  const {
    city,
    location: { geoname_id }
  } = locationResponse.data;

  const hebcalUrl = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=on&geo=geoname&m=0&s=off&geonameid=${geoname_id}`;
  const { data } = await axios.get<HebCalResponse>(hebcalUrl);
  const todayDate = moment().format("YYYY-MM-DD");

  return { city, items: data.items, todayDate };
}

function getLightingInfoFromHebcalItem(item: HebCalItem): LightingInfo | null {
  const regexResult = item.title.match(regex);
  if (regexResult) {
    return {
      count: parseInt(regexResult[1]),
      time: regexResult[2]
    };
  }
  return regexResult;
}

export function extractLightingInfo({
  city,
  items,
  todayDate
}: {
  city: string;
  items: HebCalItem[];
  todayDate: string;
}): FullLightingInfo | null {
  const chanukahItems = items.filter(item => item.title.match(regex));
  const todayItem = find(chanukahItems, item =>
    item.date.startsWith(todayDate)
  );

  if (todayItem) {
    // It's Chanukah, bitches
    const lightingInfo = getLightingInfoFromHebcalItem(todayItem);
    if (lightingInfo) {
      return { ...lightingInfo, location: city };
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
          {info.count === 1 ? "" : "s"} at {info.time}
        </h3>
      );
    } else {
      return null;
    }
  }
}
