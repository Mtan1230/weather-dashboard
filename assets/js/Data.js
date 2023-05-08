{
    "cod": "200", //Internal parameter
    "message": 0, //Internal parameter
    "cnt": 40, //A number of timestamps returned in the API response
    "list": [
      {
        "dt": 1661871600, //Time of data forecasted, unix, UTC
        "main": {
          "temp": 296.76, //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          "feels_like": 296.98, //This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          "temp_min": 296.76, //Minimum temperature at the moment of calculation. This is minimal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          "temp_max": 297.87, //Maximum temperature at the moment of calculation. This is maximal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
          "pressure": 1015, //Atmospheric pressure on the sea level by default, hPa
          "sea_level": 1015, //Atmospheric pressure on the sea level, hPa
          "grnd_level": 933, //Atmospheric pressure on the ground level, hPa
          "humidity": 69, //Humidity, %
          "temp_kf": -1.11 //Internal parameter
        },
        "weather": [
          {
            "id": 500, //Weather condition id
            "main": "Rain", //Group of weather parameters (Rain, Snow, Extreme etc.)
            "description": "light rain", //Weather condition within the group. You can get the output in your language. Learn more.
            "icon": "10d" //Weather icon id
          }
        ],
        "clouds": {
          "all": 100 //Cloudiness, %
        },
        "wind": {
          "speed": 0.62, //Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
          "deg": 349, //Wind direction, degrees (meteorological)
          "gust": 1.18 //Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
        },
        "visibility": 10000, //Average visibility, metres. The maximum value of the visibility is 10km
        "pop": 0.32, //Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
        "rain": {
          "3h": 0.26 //Rain volume for last 3 hours, mm
        },
        "sys": {
          "pod": "d" //Part of the day (n - night, d - day)
        },
        "dt_txt": "2022-08-30 15:00:00" //Time of data forecasted, ISO, UTC
      },
    ],
    "city": {
      "id": 3163858,
      "name": "Zocca",
      "coord": {
        "lat": 44.34,
        "lon": 10.99
      },
      "country": "IT",
      "population": 4593,
      "timezone": 7200,
      "sunrise": 1661834187,
      "sunset": 1661882248
    }
  }