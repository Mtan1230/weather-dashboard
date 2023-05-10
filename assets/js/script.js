const btn = $('#btn');
const input = $('.input');
const cities = $('#cities');



const history = [];

function getWeather() {

}

btn.on('click', function () {
    const cityInput = input.val();
    if (!history.includes(cityInput)) {
        history.push(cityInput);
        cities.append( "<li>" + cityInput + "</li>" )
    }
    getWeather();
})