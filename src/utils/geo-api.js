const request = require('request')

const MAP_BOX_BASE_URL = 'https://api.mapbox.com/';
const MAP_BOX_API_KEY = 'pk.eyJ1IjoiYWI3OSIsImEiOiJja3Z6Mm52Z3U0ZW03MndrbGg0YTFnaDRuIn0.4SRBee5QZmt04kCk1uW3Iw';

const getGeoLocation = (query, callback) => { // callback type (errorMessage, response) => {}
  const options = {
    limit:1,
  }
  const url = getGeoCodingUrl(query, options);
  request(url,{json: true}, (error, res) => {
    if (error) {
      return callback('Unable to get requested location')
    } else if (res.body.features.length === 0) {
      return callback('Unable to find location. Try another search.')
    }
    const data = res.body;
    const [long, lat] = data.features[0].center;
    callback(undefined, {lat, long});
  });
}

const getGeoCodingUrl = (query, options) => {
  let url = `${MAP_BOX_BASE_URL}geocoding/v5/mapbox.places/${
  query}.json?access_token=${MAP_BOX_API_KEY}`;
  Object.keys(options).forEach(key => {
    const add = `&${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`;
    url+=add;
  });
  return url;
}

module.exports = {
  getGeoLocation
}