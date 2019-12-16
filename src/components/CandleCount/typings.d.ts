type Timezone = string;

interface LightingInfo {
  count: number;
  lightingTime: Date;
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
  place_id: string;
  types: string[];
}

type GeocodingApiResponse =
  | {
      status: "OK";
      results: GeocodingResult[];
    }
  | { status: "ZERO_RESULTS"; results: [] };

type TonightChanukahData =
  | {
      label: "Chanukah";
      candleCount: number; // 1 <= x <= 8
      cityName: string | null;
      candleLightingTime: { day: "Weekday"; time: Date } | { day: "Friday" };
    }
  | {
      label: "NotChanukah";
      daysUntilChanukah: number;
    };
