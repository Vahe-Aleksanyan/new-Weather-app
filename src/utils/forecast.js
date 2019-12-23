const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/288d093bb13b5f6b82549a0366f79821/${lat},${long}?units=auto`;
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback("check connection, cannot reaqch to the server", undefined);
        } else if (body.error) {
            callback('invalid coordinates, try other ones', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} IT is cureently ${body.currently.temperature} degrees,
            there is ${body.currently.precipProbability} % chance of rain `);
        }
    })
};


module.exports = forecast;