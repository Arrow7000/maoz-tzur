import React, { Component, useState, useEffect } from "react";
import moment from "moment";
import {
  makeLocationAndHebcalReqs,
  // extractLightingInfo,
  // getGeoLocation,
  getTodayChanukahEvent
} from "./CandleCountHelpers";
import { getCurrentPosition } from "./getCurrentPosition";

const prevAskedForGeoKey = "askedGeo";

enum NoGeoReason {
  NotAsked,
  Disallowed,
  AllowedButUnable
}

// maybe use this because it allows attaching custom information for each state and makes illegal states unrepresentable
type StateDiscrUnion =
  // | { label: "NotChanukahOrUnsure" }
  | { label: "NoGeo"; reason: NoGeoReason }
  | { label: "ChanukahReqsInProgress" } // when cityName and lightingTime reqs are in progress
  | { label: "ChanukahReqsFailed" } // when cityName and lightingTime reqs are in progress
  | { label: "NotChanukah" } // when cityName and lightingTime reqs are in progress
  | {
      label: "ChanukahReqComplete";
      candleCount: number;
      candleLightingTime: { day: "Weekday"; time: Date } | { day: "Friday" };
      cityName: string | null;
    };

function CandleCount() {
  const timezoneId = Intl.DateTimeFormat().resolvedOptions().timeZone; // used in Hebcal API
  const allowedPreviously = !!localStorage.getItem(prevAskedForGeoKey);

  const initialState: StateDiscrUnion = allowedPreviously
    ? { label: "ChanukahReqsInProgress" }
    : { label: "NoGeo", reason: NoGeoReason.NotAsked };

  const [state, setState] = useState<StateDiscrUnion>(initialState);

  useEffect(() => {
    if (allowedPreviously) {
      getLocationAndSetState();
    }
  }, []);

  async function getLocationAndSetState() {
    setState({ label: "ChanukahReqsInProgress" });
    localStorage.setItem(prevAskedForGeoKey, "1");

    const result = await getCurrentPosition();

    if (result.type === "Success") {
      // result.coordinates
      const tonightChanukahOpt = await getTodayChanukahEvent(
        new Date(),
        result.coordinates,
        timezoneId
      );
      if (tonightChanukahOpt) {
        setState({ label: "ChanukahReqComplete", ...tonightChanukahOpt });
      } else {
        setState({ label: "NotChanukah" });
      }
    } else {
      const { reason } = result;

      if (reason === "PermissionDenied") {
        setState({ label: "NoGeo", reason: NoGeoReason.Disallowed });
      } else {
        setState({ label: "NoGeo", reason: NoGeoReason.AllowedButUnable });
      }
    }
  }

  switch (state.label) {
    case "NoGeo":
      const { reason } = state;

      switch (reason) {
        case NoGeoReason.NotAsked:
          return (
            <button onClick={getLocationAndSetState}>
              Use your location to get candle lighting times
            </button>
          );

        case NoGeoReason.AllowedButUnable:
          return (
            <h1>
              Couldn't retrieve your location right now. Please try again later.
            </h1>
          );

        case NoGeoReason.Disallowed:
          return (
            <h1>
              Location data not granted. Reset your website permissions to get
              lighting information.
            </h1>
          );
      }
    case "ChanukahReqsInProgress":
      return <h1>Retrieving information for your location...</h1>;
    case "ChanukahReqsFailed":
      return (
        <h1>
          Couldn't retrieve information for your location right now. Please try
          again later.
        </h1>
      );
    case "NotChanukah":
      return <h1>It is not Chanukah tonight.</h1>;
    case "ChanukahReqComplete":
      const { candleLightingTime, cityName } = state;
      const displayCityName = cityName ? `for ${cityName}` : `in your location`;

      if (candleLightingTime.day === "Weekday") {
        return (
          <h1>
            Lighting time {displayCityName} tonight is{" "}
            {moment(candleLightingTime.time).format("h:mm A")}
          </h1>
        );
      } else {
        return (
          <h1>
            The Chanukah lighting time {displayCityName} is just before the time
            of lighting Shabbat candles, the time of which will depend on your
            city's custom.
          </h1>
        );
      }
  }
}

/**
 * Class component wrapper for error boundary
 */

interface ErrorHaver {
  hasError: boolean;
}

export class CandleCountWithBoundary extends Component<{}, ErrorHaver> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    } else {
      return <CandleCount />;
    }
  }
}
