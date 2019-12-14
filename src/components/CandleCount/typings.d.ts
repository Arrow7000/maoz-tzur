interface LightingInfo {
  count: number;
  // timeStr: string;
  lightingTime: Date;
}

interface FullLightingInfo extends LightingInfo {
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
interface PreciseLocationInfo {
  latitude: number;
  longitude: number;
  tzId: string;
  cityName: string;
}

/**
 * From Hebcal API
 */
interface HebCalItem {
  memo?: string;
  title: string;
  date: string;
  subcat?: string;
  link?: string;
  category: string;
  hebrew: string;
}

interface HebCalResponse {
  items: HebCalItem[];
}

interface LocationHebCalResult {
  geoname_id: string;
  city: string;
  items: HebCalItem[];
  now: Date;
}

/**
 * From Google Maps Reverse Geocoding API
 */

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    //  "location" : {
    //     "lat" : 40.714232,
    //     "lng" : -73.9612889
    //  },
    //  "location_type" : "ROOFTOP",
    //  "viewport" : {
    //     "northeast" : {
    //        "lat" : 40.7155809802915,
    //        "lng" : -73.9599399197085
    //     },
    //     "southwest" : {
    //        "lat" : 40.7128830197085,
    //        "lng" : -73.96263788029151
    //     }
    //  }
  };
  place_id: string;
  types: string[];
}

type GeocodingApiResponse =
  | {
      status: "OK";
      results: GeocodingResult[];
    }
  | { status: "ZERO_RESULTS"; results: [] };
