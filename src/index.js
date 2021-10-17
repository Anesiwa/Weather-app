function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

//Challenge 1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Challenge 2
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#locationInput");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Bonus

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function currentCityDetail(event) {
  function showCurrentTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
  }

  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let cityName = document.querySelector("#locationInput");
    let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${cityName}&appid=${apiKey}`;
    console.log(
      `Your latitude is ${latitude} and your longitude is ${longitude}`
    );
    axios.get(apiUrl).then(showCurrentTemperature);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", currentCityDetail);
