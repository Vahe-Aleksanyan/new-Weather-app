const request = require('request');

const geocode = (address, callbck) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmFoZS1hbGUiLCJhIjoiY2swcWkwbmU1MDd4YjNibXNjZTNvZTZuZiJ9.F3_kUa1MtCGIjqN1gu6u5g&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callbck('unable to connect', undefined);
        } else if (body.features.length === 0) {
            callbck('invalid adddres', undefined);
        } else {
            callbck(undefined, {
                latidute: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    });
};

module.exports = geocode;