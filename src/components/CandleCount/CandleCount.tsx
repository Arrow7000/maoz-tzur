import React, { Component, useState, useEffect, FC } from "react";
import moment from "moment";
import { getTodayChanukahEvent } from "./CandleCountHelpers";
import { getCurrentPosition } from "./getCurrentPosition";
import { useLocalStorage, pluralise } from "./helpers";

const prevAskedForGeoKey = "askedGeo";

enum NoGeoReason {
  NotAsked,
  Disallowed,
  AllowedButUnable
}

/**
 * Discriminated union allows attaching custom information for each state and
 * makes illegal states unrepresentable
 */
type StateDiscrUnion =
  // | { label: "NotChanukahOrUnsure" }
  | { label: "NoGeo"; reason: NoGeoReason }
  | { label: "ChanukahReqsInProgress" } // when cityName and lightingTime reqs are in progress
  | { label: "ChanukahReqsFailed" } // when cityName and lightingTime reqs are in progress
  | { label: "NotChanukah"; daysUntilChanukah: number }
  | {
      label: "ChanukahReqComplete";
      candleCount: number;
      candleLightingTime: { day: "Weekday"; time: Date } | { day: "Friday" };
      cityName: string | null;
    };

const Text: FC = ({ children }) => <h3>{children}</h3>;

function CandleCount() {
  const [previouslyAsked, setPreviouslyAsked] = useLocalStorage(
    prevAskedForGeoKey
  );

  const initialState: StateDiscrUnion = previouslyAsked
    ? { label: "ChanukahReqsInProgress" }
    : { label: "NoGeo", reason: NoGeoReason.NotAsked };

  const [state, setState] = useState<StateDiscrUnion>(initialState);

  useEffect(() => {
    if (previouslyAsked) getLocationAndSetState();
  }, []);

  async function getLocationAndSetState() {
    setState({ label: "ChanukahReqsInProgress" });
    setPreviouslyAsked("1");

    const result = await getCurrentPosition();

    if (result.type === "Success") {
      const timezoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const tonightChanukah = await getTodayChanukahEvent(
        new Date(),
        result.coordinates,
        timezoneId
      );

      if (tonightChanukah.label === "Chanukah") {
        setState({ ...tonightChanukah, label: "ChanukahReqComplete" });
      } else if (tonightChanukah.label === "NotChanukah") {
        setState(tonightChanukah);
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
            <Text>
              Couldn't retrieve your location right now. Please try again later.
            </Text>
          );

        case NoGeoReason.Disallowed:
          return (
            <Text>
              Location data was not granted. Reset your website permissions to
              display lighting information.
            </Text>
          );
      }
    case "ChanukahReqsInProgress":
      return <Text>Retrieving information for your location...</Text>;
    case "ChanukahReqsFailed":
      return (
        <Text>
          Could not retrieve information for your location right now. Please try
          again later.
        </Text>
      );
    case "NotChanukah":
      const { daysUntilChanukah } = state;

      return (
        <Text>
          It is {daysUntilChanukah} day{pluralise(daysUntilChanukah)} until the
          first night of Chanukah! 🕎
        </Text>
      );
    case "ChanukahReqComplete":
      const { candleLightingTime, cityName, candleCount } = state;
      const displayCityName = cityName || `your location`;

      if (candleLightingTime.day === "Weekday") {
        return (
          <Text>
            In {displayCityName} one lights {candleCount} candle
            {pluralise(candleCount)} at{" "}
            {moment(candleLightingTime.time).format("h:mm A")} tonight
          </Text>
        );
      } else {
        return (
          <>
            <Text>
              One lights {candleCount} candle{pluralise(candleCount)} today.
            </Text>
            <Text>
              The Chanukah lighting time on Fridays is just before the time of
              lighting Shabbat candles, the exact time of which will depend on
              the local custom in {displayCityName}.
            </Text>
          </>
        );
      }
  }
}

/**
 * Class component wrapper for error boundary
 */

export class CandleCountWithBoundary extends Component<
  {},
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  render() {
    if (this.state.hasError) {
      return null;
    } else {
      return <CandleCount />;
    }
  }
}

/**
 * @TODOs:
 * - style geolocation button
 * - style text
 * - add different nusachim
 *    - get from rabbi roselaar's links
 *    - add nusach selector buttons
 *    - make button clearer
 *    - maybe have popup to point towards nusach selector
 * - make chanukah in svg
 * - make chanukah display right number of candles
 * - add tests for new functions!
 */
