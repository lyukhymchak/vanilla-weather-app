//Displaying the forecast data using the API
function displayForecast(response) {
  let forecast = response?.data?.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         <div class="col-2">
                <h3>${getDay(forecastDay.dt)}</h3>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
              </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//function to get a day of the week
function getDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "0bf9a64f249d8b9bdf366b82bcb3cbf3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatTime(response.data.dt * 1000);

  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function getCurrentDay(timeStamp) {
  let date = new Date(timeStamp);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function getCurrentTime(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}`;
}

function formatTime(timeStamp) {
  return `${getCurrentDay(timeStamp)} ${getCurrentTime(timeStamp)}`;
}

function search(city) {
  let apiKey = "0bf9a64f249d8b9bdf366b82bcb3cbf3";
  let unit = "metric";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("disabled");
  celsiusLink.classList.add("disabled");
  axios.get(apiCall).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#text-input");
  search(cityInputElement.value);
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Number(currentTemperature.innerHTML);
  currentTemperature.innerHTML = Math.round((temperature - 32) * (5 / 9));
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("disabled");
  celsiusLink.classList.add("disabled");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Number(currentTemperature.innerHTML);
  currentTemperature.innerHTML = Math.round(temperature * 1.8 + 32);
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove("disabled");
  fahrenheitLink.classList.add("disabled");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("Tallinn");
displayForecast();
