// current date and time

let now = new Date();

let timeHour = now.getHours();
if (timeHour < 10) {
  timeHour = `0${timehour}`;
}
let timeMinutes = now.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let weekday = days[now.getDay()];

let h6 = document.querySelector("#current-time-date");
h6.innerHTML = `${weekday} ${timeHour}:${timeMinutes}`;

//week 5 -1

function showWeather(response) {
  let cityCurrent = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = `${cityCurrent}`;

  let weatherCurrent = response.data.weather[0].description;
  let weather = document.querySelector("#weather");
  weather.innerHTML = `${weatherCurrent}`;

  let temperatureCurrent = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${temperatureCurrent}`;

  let humidityCurrent = response.data.main.humidity;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `Humidity:${humidityCurrent}%`;

  let windCurrentspeed = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind:${windCurrentspeed} m/s`;

  let tempMaxCurrent = Math.round(response.data.main.temp_max);
  let tempMinCurrent = Math.round(response.data.main.temp_min);
  let tempMaxMin = document.querySelector("#max-min");
  tempMaxMin.innerHTML = `${tempMaxCurrent}°|${tempMinCurrent}°`;
}

function currentCity(city) {
  let apiKey = "3cd7c0aa89391f850a62418573a9be62";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  currentCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

//Extra

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3cd7c0aa89391f850a62418573a9be62";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector(".btn-outline-success");
button.addEventListener("click", getCurrentPosition);
