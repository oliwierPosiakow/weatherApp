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



const timeLocal = (offset) =>{
    date = new Date()
    localTime = date.getTime()
    localOffset = date.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var city = utc + (1000 * offset)
    newDate = new Date(city).toString().slice(4,21)
    return newDate
}

const checkWeather = () =>{

    const apiCity = inputEl.value || "Barcelona"

    const url = apiLink + apiCity + apiKey + apiUnits + apiLang

    console.log(url)

    axios.get(url).then(response => {
        console.log(response.data) 
        errorMsg.style.display = 'none'
        
        wind.textContent = `${response.data.wind.speed} m/s`
        humidity.textContent = `${response.data.main.humidity} %`
        pressure.textContent = `${response.data.main.pressure} hPa`
        tempFeel.textContent = `${Math.floor(response.data.main.feels_like)} °C`
        tempMax.textContent = `${Math.floor(response.data.main.temp_max)} °C`
        tempMin.textContent = `${Math.floor(response.data.main.temp_min)} °C`
        tempDesc.textContent = `${response.data.weather[0].description}`
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`
        dateEl.textContent = `${timeLocal(response.data.timezone)}`
        temp.textContent = `${Math.floor(response.data.main.temp)} °C`
        tempImg.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
        panelEl.style.display = 'flex'
        

    }).catch(error => {
        if(error.response.data.cod === '404'){
            panelEl.style.display = 'none'
            errorMsg.style.display = 'flex'

        }

        [cityName, temp, tempFeel,tempDesc,pressure,humidity,wind,dateEl].forEach(el => {
            el.textContent = ''
        })
        tempImg.src = ''
    }).finally( () => {
        inputEl.value = ''
    })
}

buttonEl.addEventListener('click', checkWeather)