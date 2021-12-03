const form = document.querySelector('form')
const input = document.querySelector('input')
const message = document.querySelector('p')

const fetchWeather = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(body => {
      if (body.error) {
        console.error(body.error)
        message.innerHTML = body.error
      } else {
        const weather = body;
        message.innerHTML = `Today's weather is ${weather.description}, temperature is ${weather.temperature} C`
      }
    })
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetchWeather(input.value)

})