const request = require('request')

const WEATHER_BASE_URL = 'http://api.weatherstack.com/';
const WEATHER_API_KEY = '7611e89b8f46c3cd2c547149c4449b5b';

const getWeather = (geoLocation, callBack) => { // callback type (errorMessage, response) => {}
    const url = getWeatherUrl(geoLocation);
    request(url, {json: true}, (error, res) => {
      if (error) {
        callBack('Unable to connect to weather service!')
      } else if (res.body.error) {
        callBack('Unable to find location')
      }
      const data = res.body;
      const curr = data.current;
      callBack(undefined, {desc: curr.weather_descriptions[0], temp: curr.temperature});
    });
}

const getWeatherUrl = ({lat, long} = {}) => {
  let url = `${WEATHER_BASE_URL}current?access_key=${WEATHER_API_KEY}&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=m`;
  return url;
}

module.exports = {
  getWeather
}