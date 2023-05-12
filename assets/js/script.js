const btn = document.getElementById('btn');
const input = document.getElementsByClassName('input');
const cities = document.getElementById('cities');
const date = document.getElementsByClassName('date');
const icon = document.getElementsByClassName('weather-icon');
const temp = document.getElementsByClassName('temp');
const wind = document.getElementsByClassName('wind');
const humidity = document.getElementsByClassName('humidity');

const redirectUrl = './404.html';
let history = [];

function loadStorage() {
    const saveHistory = JSON.parse(localStorage.getItem("search history"));
    if (saveHistory) {
        history = saveHistory;
        history.forEach(element => {
            const cityName = document.createElement('li');
            cityName.textContent = element;
            cities.appendChild(cityName);
        });
    }
}
loadStorage();

//handle weather data
function display(w) {
    //set list and local storage
    if (!history.includes(w.today.name)) {
        const cityName = document.createElement('li');
        cityName.textContent = w.today.name;
        cities.appendChild(cityName);
        history.push(w.today.name);
        localStorage.setItem("search history", JSON.stringify(history));
    }
    //display current weather
    date[0].textContent = w.today.name + ' (' + w.today.date + ') ';
    icon[0].src = `http://openweathermap.org/img/w/${w.today.icon}.png`;
    temp[0].textContent = 'Temp: ' + w.today.temp;
    wind[0].textContent = 'Wind: ' + w.today.wind;
    humidity[0].textContent = 'Humidity: ' + w.today.humidity;
    //display 5-day weather
    for (let i = 1; i < 6; i++) {
        date[i].textContent = w['day-' + i].date;
        icon[i].src = `http://openweathermap.org/img/w/${w['day-' + i].icon}.png`;
        temp[i].textContent = 'Temp: ' + w['day-' + i].temp;
        wind[i].textContent = 'Wind: ' + w['day-' + i].wind;
        humidity[i].textContent = 'Humidity: ' + w['day-' + i].humidity;
    }
}

//function to get weather data with lat&lon
async function getWeather(lat, lon) {
    const weather = {};
    const key = 'a0af9f546396a2dca8ce456ef5c97485';
    const urlW = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    const urlF = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    //get current weather
    await fetch(urlW)
        .then(res => {
            if (res.status === 404) {
                document.location.replace(redirectUrl);
            }
            return res.json();
        })
        .then(data => {
            weather['today'] = {
                name: data.name,
                date: dayjs(data.dt * 1000).format('MM/DD/YYYY'),
                icon: data.weather[0].icon,
                temp: ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + '°F',
                wind: data.wind.speed + ' MPH',
                humidity: data.main.humidity + ' %'
            }
        })
        .catch(error => {
            console.error(error);
        });
    //get 5-day forecast
    await fetch(urlF)
        .then(res => {
            if (res.status === 404) {
                document.location.replace(redirectUrl);
            }
            return res.json();
        })
        .then(data => {
            //loop over the data, start with 6 which is 24 hrs from now 
            for (let i = 6, j = 1; i < data.list.length; i += 8, j++) {
                weather['day-' + j] = {
                    date: dayjs(data.list[i].dt * 1000).format('MM/DD/YYYY'),
                    icon: data.list[i].weather[0].icon,
                    temp: ((data.list[i].main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + '°F',
                    wind: data.list[i].wind.speed + ' MPH',
                    humidity: data.list[i].main.humidity + ' %'
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
    display(weather);
}

//function to get lat&lon of the input city name
async function getGeo(city, callback) {
    const key = 'a0af9f546396a2dca8ce456ef5c97485';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;
    await fetch(url)
        .then(res => {
            if (res.status === 404) {
                document.location.replace(redirectUrl);
            }
            return res.json();
        })
        .then(data => {
            if (data[0]) {
                callback(data[0].lat, data[0].lon)
            } else {
                return;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

btn.addEventListener('click', () => {
    const cityInput = input[0].value;
    if (cityInput) {
        getGeo(cityInput, getWeather);
    }
})

cities.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        getGeo(e.target.textContent, getWeather);
    }
})