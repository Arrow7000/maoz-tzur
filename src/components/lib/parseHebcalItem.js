const samples = [{
        "title": "Candle lighting: 3:34pm",
        "hebrew": "הדלקת נרות",
        "date": "2016-12-23T15:34:00-00:00",
        "category": "candles"
    },
    {
        "title": "Chanukah: 1 Candle: 5:05pm",
        "link": "http://www.hebcal.com/holidays/chanukah",
        "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
        "date": "2016-12-24T17:05:00-00:00",
        "category": "holiday",
        "hebrew": "חנוכה: א׳ נר"
    }
];


// console.log(samples.map(parseHebcalItem));


function parseHebcalItem(hebcalItem) {
    const item = hebcalItem;
    if (item.title) {
        if (item.title.includes('Chanukah')) {
            return {
                candles: parseInt(item.title[10], 10),
                time: item.title.slice(20)
            };
        }
    }
    return null;
}

export default parseHebcalItem;