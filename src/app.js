function displayTemperature(response) {
  console.log(response.data);
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
let apiKey = "0bf9a64f249d8b9bdf366b82bcb3cbf3";
let unit = "metric";
let city = "Tallinn";
let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiCall).then(displayTemperature);
