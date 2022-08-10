function showDate() {
  let dateText = document.querySelector("#date");
  let date = new Date();
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
  let temp = document.querySelector("#temp");
  temp.innerHTML = temperature;

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
  showDate();
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

let submit = document.querySelector("#submit");
let city = submit.addEventListener("click", submitCity);

let button = document.querySelector("#currentButton");
let loc = button.addEventListener("click", findLocation);
