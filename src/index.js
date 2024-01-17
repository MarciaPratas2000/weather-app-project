function handleSearchFormSubmit(event) {
    event.preventDefault();
    let userInput = document.querySelector("#search-input");
    let cityDisplay = document.querySelector("#current-city");
    cityDisplay.innerHTML = userInput.value;
  }
  
  let searchForm = document.querySelector("#city-form");
  searchForm.addEventListener("submit", handleSearchFormSubmit);
  