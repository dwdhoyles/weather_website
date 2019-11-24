//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/46c6dd03b3696148ea7dbb0af8bb7214/' + latitude + "," + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.round(5 / 9 * (body.currently.temperature - 32)) + ' degrees celsius out. The high today is ' + Math.round(5 / 9 * (body.daily.data[0].temperatureHigh - 32)) + ' with a low of ' + Math.round(5 / 9 * (body.daily.data[0].temperatureLow - 32)) + '. There is a ' + body.currently.precipProbability + '% chance of rain in the next hour.')
        }
    })
}

module.exports = forecast