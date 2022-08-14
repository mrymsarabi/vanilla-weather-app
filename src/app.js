function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `<div class="col text-center m-2 rounded small-cardd">
            <div>${formatDay(forecastDay.dt)}</div>
            <div><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /> </div>
            <div>${Math.round(
              forecastDay.temp.max
            )}° <span class="deg">${Math.round(
        forecastDay.temp.min
      )}°</span></div>
          </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function forecast(coordinates) {
  let apiKey = "41d1e592b396722d0de5abd6d14869ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahreheitTempeature = (celsiusTemperature * 9) / 2 + 32;
  temperatureElement.innerHTML = Math.round(fahreheitTempeature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".degree");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showIcon(weatherIcon) {
  let icon = document.querySelector("#icon");
  let src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  icon.innerHTML = `<img src="${src}">`;
}

function showDate(timestamp) {
  let dateText = document.querySelector("#date");
  let date = new Date(timestamp);
  let dateDay = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  dateText.innerHTML = `${day} ${hour}:${minute}<br>${dateDay} ${month}, ${year}`;
}

function clearText() {
  document.getElementById("text").value = "";
}

function displayTempCity(response) {
  //city name
  let city = response.data.name;
  let location = document.querySelector("#location");
  location.innerHTML = city;

  //temperature
  let temperature = response.data.main.temp;
  celsiusTemperature = temperature;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(temperature);

  //pressure
  let pressure = response.data.main.pressure;
  let pres = document.querySelector("#pressure");
  pres.innerHTML = ` ${pressure}`;

  //humidity
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#humidity");
  hum.innerHTML = ` ${humidity}%`;

  //wind
  let windSpeed = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = ` ${windSpeed} km/h`;

  //description
  let description = response.data.weather[0].description;
  let des = document.querySelector("#description");
  des.innerHTML = description;

  //date
  showDate(response.data.dt * 1000);
  showIcon(response.data.weather[0].icon);
  forecast(response.data.coord);
  clearText();
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#text").value;
  let apiKey = "41d1e592b396722d0de5abd6d14869ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempCity);
}

function handlePosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "41d1e592b396722d0de5abd6d14869ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempCity);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let submit = document.querySelector("#submit");
let city = submit.addEventListener("click", submitCity);

let button = document.querySelector("#currentButton");
let loc = button.addEventListener("click", findLocation);
