import React, { Component } from 'react';
import './DisplayTimes.css';
import moment from 'moment';
import getTimes from './getTimes';
import parseHebcalItem from './parseHebcalItem';

const samples = [{
    "title": "Chanukah: 1 Candle: 5:05pm",
    "link": "http://www.hebcal.com/holidays/chanukah",
    "memo": "The Jewish festival of rededication, also known as the Festival of Lights",
    "date": "2016-12-24T17:05:00-00:00",
    "category": "holiday",
    "hebrew": "חנוכה: א׳ נר"
}, {
    "title": "Candle lighting: 3:34pm",
    "hebrew": "הדלקת נרות",
    "date": "2016-12-23T15:34:00-00:00",
    "category": "candles"
}];

class DisplayTimes extends Component {
    constructor() {
        super();

        this.state = {
            time: null,
            candles: 0
        }
        getTimes()
            .then(res => {

                const days = res.items.filter(item => {
                    const today = moment().startOf('day');
                    if (moment(item.date).startOf('day').isSame(today)) {
                        return true;
                    }
                    return false;
                }).map(item => {
                    return parseHebcalItem(item);
                });

                const day = days.length && days.length < 2 ? days[0] : null;
                // console.log(day);
                this.setState(day || {});
            });
    }
    render() {
        // console.log(this.state);
        const time = this.state.time;
        const candles = this.state.candles;
        let content = '&nbsp;';

        if (time) {
            content = `Tonight one lights ${candles} candle${candles > 1 ? 's' : ''} at ${time}`;
        }

        return (<h3 className={`DisplayTimes DisplayTimes--${content !== '&nbsp;' ? 'has-content' : 'no-content'}`}>{content}</h3>);
    }
}

export default DisplayTimes;