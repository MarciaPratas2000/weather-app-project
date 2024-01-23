// Display Functions
function formatDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
  }

  if (currentHour < 10) {
      currentHour = `0${currentHour}`;
  }
  let nowDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return nowDate;
}

function displayTime(timeUpdate) {
  let time = document.querySelector("#date-now");
  time.innerHTML = formatDate(new Date(timeUpdate));
}

function displayCity(city) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
}

function displayTemperatureValue(temperature) {
  let TempElement = document.querySelector(".current-temperature-value");
  TempElement.innerHTML = Math.round(temperature);
}

function displayHumidity(humidity) {
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `${humidity}%`;
}

function displayWindSpeed(windSpeed) {
  let windSpeedElement = document.querySelector("#current-wind");
  windSpeedElement.innerHTML = `${windSpeed}Km/h`;
}

function displayDescription(description) {
  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = `${description}`;
}

function displayIcon(iconUrl, altText) {
  let iconElement = document.querySelector(".current-temperature-icon");
  let imgElement = document.createElement("img");
  imgElement.src = iconUrl;
  imgElement.alt = altText;
  iconElement.innerHTML = '';
  iconElement.appendChild(imgElement);
}

function displayForecast(response) {
  console.log(response.data);
  let days = response.data.daily;
  let forecastHtml = "";
  days.forEach(function (day, index) {
      if (index < 5) {
          forecastHtml =
              forecastHtml +
              `
              <div class="column">
                  <div class="forecast-day">${formatDay(day.time)}</div>
                  <div class="forecast-emoji">
                      <img src="${day.condition.icon_url}" alt="${day.condition.icon}" />
                  </div>
                  <div class="forecast-min-max-temp">
                      <span class="max-temperature"><strong>${Math.round(day.temperature.maximum)}º</strong></span>
                      <span class="min-temperature">${Math.round(day.temperature.minimum)}º</span>
                  </div>
              </div>
              `;
      }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

// API Functions
function refreshWeather(response) {
  console.log(response);
  let data = response.data;
  if (data.city !== undefined) {
      displayTime(data.time * 1000);
      displayCity(data.city);
      displayTemperatureValue(data.temperature.current);
      displayHumidity(data.temperature.humidity);
      displayWindSpeed(data.wind.speed);
      displayDescription(data.condition.description);
      displayIcon(data.condition.icon_url, data.condition.icon);
      getForecast(data.city);
  }
}

function cityUpdate(city) {
  let apiKey = "ec0ft3ef184fa26o40bf0860bad82dc8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ec0ft3ef184fa26o40bf0860bad82dc8";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

// Event Handlers
function showNewCityInfo(event) {
  event.preventDefault();
  let newCityname = "Paris"; // Assuming a default value
  let inputCity = document.querySelector("#search-input");
  newCityname = inputCity.value.trim();
  cityUpdate(newCityname);
}

// Initialization
let form = document.querySelector("#city-form");
form.addEventListener("submit", showNewCityInfo);

window.addEventListener("load", function () {
  // Load default weather information for Lisbon on page load
  cityUpdate("Lisbon");
});
