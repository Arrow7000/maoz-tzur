import {
  HebCalItem,
  extractLightingInfo,
  LocationHebCalResult
} from "./CandleCount";
import moment from "moment";

const sampleApiResponse: HebCalItem[] = [
  {
    category: "candles",
    hebrew: "הדלקת נרות",
    title: "Candle lighting: 3:43pm",
    date: "2018-11-23T15:43:00-00:00"
  },
  {
    title: "Candle lighting: 3:37pm",
    date: "2018-11-30T15:37:00-00:00",
    category: "candles",
    hebrew: "הדלקת נרות"
  },
  {
    subcat: "major",
    link: "https://www.hebcal.com/holidays/chanukah",
    memo:
      "The Jewish festival of rededication, also known as the Festival of Lights",
    date: "2018-12-02T16:44:00-00:00",
    title: "Chanukah: 1 Candle: 4:44pm",
    hebrew: "חנוכה: א׳ נר",
    category: "holiday"
  },
  {
    subcat: "major",
    link: "https://www.hebcal.com/holidays/chanukah",
    title: "Chanukah: 2 Candles: 4:43pm",
    memo:
      "The Jewish festival of rededication, also known as the Festival of Lights",
    date: "2018-12-03T16:43:00-00:00",
    hebrew: "חנוכה: ב׳ נרות",
    category: "holiday"
  },
  {
    memo:
      "The Jewish festival of rededication, also known as the Festival of Lights",
    title: "Chanukah: 3 Candles: 4:43pm",
    date: "2018-12-04T16:43:00-00:00",
    subcat: "major",
    link: "https://www.hebcal.com/holidays/chanukah",
    category: "holiday",
    hebrew: "חנוכה: ג׳ נרות"
  }
];

describe("Testing extractLightingInfo functionality", () => {
  it("should return null when it's not Chanukah", () => {
    const input: LocationHebCalResult = {
      geoname_id: "12345",
      city: "Chicago",
      items: sampleApiResponse,
      now: moment("2018-11-17T16:43:00-00:00") // non-Chanukah date
    };
    const response = extractLightingInfo(input);
    expect(response).toEqual(null);
  });

  function testIsChanukahForDate(
    date: string,
    candleCount: number,
    timeStr: string
  ) {
    it(`should return right HebCal and location data when it's Chanukah for date ${date}`, () => {
      const city = "Chicago";
      const input: LocationHebCalResult = {
        geoname_id: "12345",
        city,
        items: sampleApiResponse,
        now: moment(date)
      };
      const response = extractLightingInfo(input);
      expect(response).toEqual({
        count: candleCount,
        timeStr,
        location: city,
        date: ""
      });
    });
  }

  testIsChanukahForDate("2018-12-02", 1, "4:44pm");
  testIsChanukahForDate("2018-12-04", 3, "4:43pm");
});
