$(document).ready(function () {
    const btn = $('#btn');
    const input = $('.input');
    const cities = $('#cities');
    const redirectUrl = './404.html';

    const history = [];

    function getWeather(lat, lon) {
        const weather = {};
        const key = 'a0af9f546396a2dca8ce456ef5c97485';
        const urlW = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
        const urlF = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
        fetch(urlW)
            .then(res => {
                if (res.status === 404) {
                    document.location.replace(redirectUrl);
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
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
        fetch(urlF)
            .then(res => {
                if (res.status === 404) {
                    document.location.replace(redirectUrl);
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
                for (let i = 2, j = 1; i < data.list.length; i += 8, j++) {
                    weather['day-' + j] = {
                        date: dayjs(data.list[i].dt * 1000).format('MM/DD/YYYY'),
                        icon: data.list[i].weather[0].icon,
                        temp: ((data.list[i].main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + '°F',
                        wind: data.list[i].wind.speed + ' MPH',
                        humidity: data.list[i].main.humidity + ' %'
                    }
                }
                console.log(weather)
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getGeo(city, callback) {
        const key = 'a0af9f546396a2dca8ce456ef5c97485';
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`;
        fetch(url)
            .then(res => {
                if (res.status === 404) {
                    document.location.replace(redirectUrl);
                }
                return res.json();
            })
            .then(data => {
                if (data[0]) {
                    callback(data[0].lat, data[0].lon)
                }
            })
    }

    btn.on('click', () => {
        const cityInput = input.val();
        if (cityInput) {
            const data = getGeo(cityInput, getWeather);
        }
        if (!history.includes(cityInput)) {
            history.push(cityInput);
            cities.append("<li>" + cityInput + "</li>")
        }
    })

});