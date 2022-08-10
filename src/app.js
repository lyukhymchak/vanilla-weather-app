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
}

let apiKey = "0bf9a64f249d8b9bdf366b82bcb3cbf3";
let unit = "metric";
let city = "Tallinn";
let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiCall).then(displayTemperature);
