import 'whatwg-fetch';

function getTimes() {
    return new Promise((resolve, reject) => {
        fetch('http://freegeoip.net/json/')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                return fetch(`http://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&month=now&c=on&maj=on&geo=pos&latitude=${res.latitude}&longitude=${res.longitude}&tzid=UTC`);
            })
            .then(res => res.json())
            .then(res => {
                resolve(res);
            })
            .catch(function(error) {
                reject('request failed', error)
            });
    });
}

export default getTimes;