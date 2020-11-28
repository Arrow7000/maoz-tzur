import React, { useState, useEffect, FC } from "react";
import moment from "moment";
import { getTodayChanukahEvent } from "./CandleCountHelpers";
import { getCurrentPosition } from "./getCurrentPosition";
import { pluralise } from "../../helpers";
import { Button } from "./Button";
import { captureException } from "@sentry/browser";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styled from "styled-components";

const prevAskedForGeoKey = "askedGeo";

enum NoGeoReason {
  NotAsked,
  Disallowed,
  AllowedButUnable,
}

/**
 * Discriminated union allows attaching custom information for each state and
 * makes illegal states unrepresentable
 */
type ChanukahState =
  | { label: "NoGeo"; reason: NoGeoReason }
  | { label: "ChanukahReqsInProgress" } // when cityName and lightingTime reqs are in progress
  | { label: "ChanukahReqsFailed" }
  | { label: "8thDayChanukah" }
  | { label: "NotChanukah"; daysUntilChanukah: number }
  | {
      label: "ChanukahReqComplete";
      candleCount: number;
      candleLightingTime: { day: "Weekday"; time: Date } | { day: "Friday" };
      cityName: string | null;
    };

const Text = styled.h3`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export const useGetCandleCount = (): [
  state: ChanukahState,
  askLocationPermission: VoidFunction
] => {
  const maxAttempts = 3;
  const [attemptsCount, setAttemptsCount] = useState(0);

  const [previouslyAsked, setPreviouslyAsked] = useLocalStorage(
    prevAskedForGeoKey
  );

  const [askedPermission, setAskedPermission] = useState(!!previouslyAsked);

  const initialState: ChanukahState = previouslyAsked
    ? { label: "ChanukahReqsInProgress" }
    : { label: "NoGeo", reason: NoGeoReason.NotAsked };

  const [state, setState] = useState<ChanukahState>(initialState);

  useEffect(() => {
    if (askedPermission) {
      getLocationAndSetState();
      setPreviouslyAsked("1");
    }
  }, [askedPermission]); // need to rethink this so we don't get into an infinite loop

  useEffect(() => {
    if (
      askedPermission &&
      state.label === "ChanukahReqsFailed" &&
      attemptsCount < maxAttempts
    ) {
      setAttemptsCount((c) => c + 1);

      setTimeout(() => {
        getLocationAndSetState();
        setPreviouslyAsked("1");
      }, 1000 * 2 ** attemptsCount); // exponential backoff
    }
  }, [state]);

  async function getLocationAndSetState() {
    setState({ label: "ChanukahReqsInProgress" });

    const result = await getCurrentPosition();

    if (result.type === "Success") {
      const timezoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

      try {
        const tonightChanukah = await getTodayChanukahEvent(
          new Date(),
          result.coordinates,
          timezoneId
        );

        if (tonightChanukah.label === "Chanukah") {
          setState({ ...tonightChanukah, label: "ChanukahReqComplete" });
        } else if (
          tonightChanukah.label === "NotChanukah" ||
          tonightChanukah.label === "8thDayChanukah"
        ) {
          setState(tonightChanukah);
        }
      } catch (error) {
        setState({ label: "ChanukahReqsFailed" });
        captureException(error);
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

  const askLocationPermission = () => setAskedPermission(true);
  return [state, askLocationPermission];
};

interface CandleCountProps {
  state: ChanukahState;
  askLocationPermission: VoidFunction;
}

export const CandleCount: FC<CandleCountProps> = ({
  state,
  askLocationPermission,
}) => {
  switch (state.label) {
    case "NoGeo":
      const { reason } = state;

      switch (reason) {
        case NoGeoReason.NotAsked:
          return (
            <Button onClick={askLocationPermission}>
              Use your location to get candle lighting times
            </Button>
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

    case "8thDayChanukah":
      return (
        <>
          <Text>
            It's the 8th day of Chanukah which means no candles are lit tonight
            😢
          </Text>
          <Text>We hope to see you next year! 👋</Text>
        </>
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
              Shabbat candles – the exact time of which depends on the local
              custom in {displayCityName}.
            </Text>
          </>
        );
      }
  }
};

/**
 * @TODOs:
 * - [x] style geolocation button
 * - [x] style text
 * - add different nusachim
 *    - [x] get from rabbi roselaar's links
 *    - [x] add nusach selector buttons
 *    - make button clearer
 *    - maybe have popup to point towards nusach selector
 * - [x] make chanukah in svg
 * - [x] make chanukah display right number of candles
 * - add tests for new functions!
 */
