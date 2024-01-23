
function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
  
  function displayTime(timeUpdate){
  let time = document.querySelector("#date-now");
  time.innerHTML = formatDate(new Date (timeUpdate));
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
    windSpeedElement.innerHTML = `${windSpeed} Km/h`;
}

function displayDescription(description) {
    let descriptionElement = document.querySelector("#current-description");
    descriptionElement.innerHTML = `${description}`;
}

function displayIcon(iconUrl, altText) {
    let iconElement = document.querySelector(".current-temperature-icon");
    // Create an img element
    let imgElement = document.createElement("img");
    imgElement.src = iconUrl;
    imgElement.alt = altText;
    // Clear existing content and append the img element
    iconElement.innerHTML = '';  
    iconElement.appendChild(imgElement);
}

function refreshWeather(response) {
    console.log(response);
    let data = response.data;
    if (data.city !== undefined) {
        displayTime(data.time*1000);
        displayCity(data.city);
        displayTemperatureValue(data.temperature.current);
        displayHumidity(data.temperature.humidity);
        displayWindSpeed(data.wind.speed);
        displayDescription(data.condition.description);
        displayIcon(data.condition.icon_url, data.condition.icon);
    }
}

 // Update the API URL with the newCityname
 function cityUpdate(city){
 let apiKey = "ec0ft3ef184fa26o40bf0860bad82dc8";
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
// Make the API call
axios.get(apiUrl).then(refreshWeather);}
 
 function showNewCityInfo(event) {
    event.preventDefault();
    let newCityname = "Paris"; // Assuming a default value
    let inputCity = document.querySelector("#search-input");
    newCityname = inputCity.value.trim();
    cityUpdate(newCityname);
  }
  
  let form = document.querySelector("#city-form");
  form.addEventListener("submit", showNewCityInfo);
  
  // Load default weather information for Lisbon on page load
  function defaultCityFunction(){
  cityUpdate("Lisbon");
      }
  window.addEventListener("load", defaultCityFunction );


  function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";
  
    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="column">
          <div class="forecast-day" >${day} </div>
          <div class="forecast-emoji" >☀️</div>
          <div class="forecast-min-max-temp">
          <span class="max-temperature"><strong>15ºC</strong></span>
          <span class="min-temperature">9ºC</span>
          </div>
          </div>
      `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  

  displayForecast();