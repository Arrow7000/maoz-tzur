type GeolocationResult =
  | { type: "Success"; coordinates: Coordinates }
  | {
      type: "Fail";
      reason: "PermissionDenied" | "PositionUnavailable" | "Timeout";
    };

/**
 * Wrapper for geolocation with more ergonomic API
 */
export async function getCurrentPosition(): Promise<GeolocationResult> {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({ type: "Success", coordinates: coords });
      },
      ({ code, PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT }) => {
        const reason = (() => {
          switch (code) {
            case PERMISSION_DENIED:
              return "PermissionDenied";
            case POSITION_UNAVAILABLE:
              return "PositionUnavailable";
            case TIMEOUT:
            default:
              return "Timeout";
          }
        })();

        resolve({ type: "Fail", reason });
      },
      { timeout: 5000 }
    );
  });
}
