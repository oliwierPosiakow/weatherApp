const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const errorMsg = document.querySelector('.error')
const panelEl = document.querySelector('.panel-wrapper')

const dateEl = document.querySelector('.date')
const cityName = document.querySelector('.city-name')
const tempImg = document.querySelector('img')
const tempDesc = document.querySelector('.temp-desc')
const temp = document.querySelector('.temp')

const tempFeel = document.querySelector('.temp-feel')
const tempMax = document.querySelector('.temp-max')
const tempMin = document.querySelector('.temp-min')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=2edb0ca1cc5adb11398da94d57e15303'
const apiUnits = '&units=metric'
const apiLang = ''

//calculating local time based on timezone
const timeLocal = (offset) =>{
    date = new Date()
    localTime = date.getTime()
    localOffset = date.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var city = utc + (1000 * offset)
    newDate = new Date(city).toString().slice(4,21)
    return newDate
}

//function which fetches data from an API and inserts it into the textContent of an elements

const checkWeather = () =>{

    const apiCity = inputEl.value || "Barcelona"

    const url = apiLink + apiCity + apiKey + apiUnits + apiLang

    console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            errorMsg.style.display = 'none'
            wind.textContent = `${data.wind.speed} m/s`
            humidity.textContent = `${data.main.humidity} %`
            pressure.textContent = `${data.main.pressure} hPa`
            tempFeel.textContent = `${Math.floor(data.main.feels_like)} °C`
            tempMax.textContent = `${Math.floor(data.main.temp_max)} °C`
            tempMin.textContent = `${Math.floor(data.main.temp_min)} °C`
            tempDesc.textContent = `${data.weather[0].description}`
            cityName.textContent = `${data.name}, ${data.sys.country}`
            dateEl.textContent = `${timeLocal(data.timezone)}`
            temp.textContent = `${Math.floor(data.main.temp)} °C`
            tempImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            panelEl.style.display = 'flex'
        }).catch(error => {

            panelEl.style.display = 'none'
            errorMsg.style.display = 'flex'
            tempImg.src = ''

        }).finally(() => {
            inputEl.value = ''
        })
}
buttonEl.addEventListener('click', checkWeather)