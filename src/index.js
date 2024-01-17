
function displayCity(city) {
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;
}

function displayTemperatureValue(temperature) {
    let TempElement = document.querySelector(".current-temperature-value");
    TempElement.innerHTML = Math.round(temperature);
}
function refreshWeather(response) {
    console.log(response);
    let data = response.data;
    if (data.city !== undefined) {
        displayCity(data.city);
        displayTemperatureValue(data.temperature.current);
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