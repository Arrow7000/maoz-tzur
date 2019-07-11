import React, { Component, useState, useEffect } from "react";
import moment from "moment";
import {
  makeLocationAndHebcalReqs,
  extractLightingInfo,
  FullLightingInfo,
  getGeoLocation,
  PreciseLocationInfo
} from "./CandleCountHelpers";

function CandleCount() {
  const [allowGeo, setAllowGeo] = useState(false);

  const [lightingInfo, setLightingInfo] = useState<FullLightingInfo | null>(
    // null // { count: 1, location: "Edgware", time: "5:36pm" }
    { count: 1, location: "Edgware", timeStr: "5:36pm", date: moment() }
  );

  useEffect(() => {
    async function onMount() {
      const { state } = await navigator.permissions.query({
        name: "geolocation"
      });

      console.log(state);

      let location: PreciseLocationInfo | null = null;

      if (state === "granted") {
        console.log(state);

        // already been granted
        if (!allowGeo) {
          setAllowGeo(true);
        }
      }

      if (allowGeo) {
        location = await getGeoLocation();
      }

      const result = await makeLocationAndHebcalReqs(location);
      const info = extractLightingInfo(result);
      setLightingInfo(info);
    }

    onMount();
  }, [allowGeo]);

  if (lightingInfo) {
    const { count, location, timeStr } = lightingInfo;

    return (
      <>
        <h3>
          Tonight in {location} one lights {count} candle
          {count === 1 ? "" : "s"} at {timeStr}
        </h3>
        {navigator.geolocation && !allowGeo && (
          <a onClick={() => setAllowGeo(true)}>Wrong location?</a>
        )}
      </>
    );
  } else {
    return null;
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
