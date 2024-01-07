'use strict';

const cityLabel = document.querySelector("#cityName");
const dateLabel = document.querySelector("#date");
const timeLabel = document.querySelector("#time");
const temperatureLabel = document.querySelector("#temperature");
const feelsLikeLabel = document.querySelector("#feelsLike");
const humidityLabel = document.querySelector("#humidity");
const cloudLabel = document.querySelector("#cloud");
const windSpeedLabel = document.querySelector("#windSpeed");
const conditionLabel = document.querySelector("#condition");
const inputErrLabel = document.querySelector(".input-err")


async function getWeatherInfo(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`, {mode: "cors"});
    response.json().then(response => {
        cityLabel.textContent = response.location.name;
        
        const [date, _] = response.location.localtime.split(" ");

        dateLabel.textContent = new Intl.DateTimeFormat(navigator.locale, {
            dateStyle: 'full',
        }).format(new Date(date));

        conditionLabel.textContent = response.current.condition.text;
        temperatureLabel.textContent = `${response.current.temp_c} °C`;
        feelsLikeLabel.textContent = `${response.current.feelslike_c} °C`;
        humidityLabel.textContent = `${response.current.humidity} %`;
        cloudLabel.textContent = `${response.current.cloud} %`;
        windSpeedLabel.textContent = `${response.current.wind_kph} km/h`;
    });
}

document.querySelector(".year").textContent = new Date().getFullYear()

document.querySelector(".search-cta").addEventListener("click", (e) => {
    e.preventDefault();
    
    const cityName = document.querySelector("#city");

    if (!(cityName.value)) {
        inputErrLabel.textContent = "Please enter a city name";
        inputErrLabel.style.display = "block"
    } else {
        inputErrLabel.textContent = "";
        getWeatherInfo(cityName.value);
        cityName.value = "";
    }
});