const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {getGeoLocation} = require('./utils/geo-api')
const {getWeather} = require('./utils/forecast-api')

const app = express()
const port = process.env.PORT || 3000

// paths for express config
const staticDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set static directory to serve
app.use(express.static(staticDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Andrew'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    author: 'Andrew'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address is required',
    })
  }
  getGeoLocation(req.query.address, (geoError, response) => {
    if (geoError) {
      return res.send({
        error: geoError,
      })
    }
    getWeather(response, (weatherError, weather) => {
      if (weatherError) {
        return res.send({
          error: weatherError,
        })
      }
      return res.send({
        temperature: weather.temp,
        description: weather.desc,
        location: req.query.address
      })
    })
  })
})

app.get('/about/*', (req, res) => {
  res.render('not-found',{
    title: 'About articles not found',
    author: 'Andrew'
  })
})

app.get('*', (req, res) => {
  res.render('not-found',{
    title: 'Page Not Found',
    author: 'Andrew'
  })
})

app.listen(port, () => console.log(`Running on port ${port}.`))