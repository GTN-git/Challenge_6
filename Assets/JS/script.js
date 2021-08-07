// City Results Variables
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndexEl = document.getElementById("uvIndex");
var nameEl = document.getElementById("cityDate");
var forecast = document.getElementById("forecast");
var display = document.getElementById("searchDisplay");
var day1Title = document.getElementById("day1Title");
var day1Icon = document.getElementById("day1Icon");
var day1Temp = document.getElementById("day1Temp");
var day1Wind = document.getElementById("day1Wind");
var day1Humidity = document.getElementById("day1Humidity");
var day2Title = document.getElementById("day2Title");
var day2Icon = document.getElementById("day2Icon");
var day2Temp = document.getElementById("day2Temp");
var day2Wind = document.getElementById("day2Wind");
var day2Humidity = document.getElementById("day2Humidity");
var day3Title = document.getElementById("day3Title");
var day3Icon = document.getElementById("day3Icon");
var day3Temp = document.getElementById("day3Temp");
var day3Wind = document.getElementById("day3Wind");
var day3Humidity = document.getElementById("day3Humidity");
var day4Title = document.getElementById("day4Title");
var day4Icon = document.getElementById("day4Icon");
var day4Temp = document.getElementById("day4Temp");
var day4Wind = document.getElementById("day4Wind");
var day4Humidity = document.getElementById("day4Humidity");
var day5Title = document.getElementById("day5Title");
var day5Icon = document.getElementById("day5Icon");
var day5Temp = document.getElementById("day5Temp");
var day5Wind = document.getElementById("day5Wind");
var day5Humidity = document.getElementById("day5Humidity");
// Buttons
var searchForm = document.getElementById("searchForm");
var searchEl = document.getElementById("search");

// API requirements and User Inputs
var cityInputEl = document.getElementById("citySearch");
var key = "e017ff1bdf19eb3fa5c2f9c7fc8fd4bc";

var cityNames = [];
console.log(moment())
//on past load show past city searches to the left in the City section.

//search for a city or click on a past city

// upon page load, localstorage get item that array
// make buttons for each thing inside array
// add event listeners for each thing inside array

// get data from the weather API //upon event listener click loads data from fetch grabs lat and lon of city searched
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
function search(event) {
  event.preventDefault();
  var city = cityInputEl.value;

  var newButton = document.createElement("button");
  newButton.classList.add("historyBtn")
  newButton.textContent = city;
  searchEl.appendChild(newButton);

  // add the city name to an array
  if (JSON.parse(localStorage.getItem("city")) === null) {
    cityNames = [];
  } else {
    //parse out the items in local storage to JSON
    cityNames = JSON.parse(localStorage.getItem("city"));
  }
  cityNames.push(city);
  localStorage.setItem("city", JSON.stringify(cityNames));

  console.log(cityNames);
  // localstorage set item that array

  fetchCalls(city);
  // for loop through array and get the items we need
  cityInputEl.value="";
}

function fetchCalls(city) {
  // unhide the forecast cards
  forecast.removeAttribute("hidden");
  display.removeAttribute("hidden");
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      key +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      console.log(data);
      // populate the elements
      nameEl.innerHTML = data.name+ " Current ";
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          key +
          "&units=imperial"
      )
        .then(function (responseInner) {
          return responseInner.json();
        })
        .then(function (dataInner) {
          console.log(dataInner);
          tempEl.innerHTML = dataInner.current.temp + " F ";
          windEl.innerHTML = dataInner.current.wind_speed + " MPH ";
          humidityEl.innerHTML = dataInner.current.humidity + "%";
          uvIndexEl.innerHTML = dataInner.current.uvi;
          changeColor(dataInner.current.uvi);
          day1Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[1].weather[0].icon +
              ".png"
          );

          day1Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[1].weather[0].icon +
              ".png"
          );

          day1Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[1].weather[0].icon +
              ".png"
          );

          day2Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[2].weather[0].icon +
              ".png"
          );

          day3Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[3].weather[0].icon +
              ".png"
          );

          day4Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[4].weather[0].icon +
              ".png"
          );

          day5Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
              dataInner.daily[5].weather[0].icon +
              ".png"
          );
          
          day1Title.innerHTML = moment(dataInner.daily[1].dt*1000).format("MM/DD/YYYY");
          day1Temp.innerHTML = dataInner.daily[1].temp.day+ " F ";
          day1Wind.innerHTML = dataInner.daily[1].wind_speed+ " MPH ";
          day1Humidity.innerHTML = dataInner.daily[1].humidity+ "%";
          day2Title.innerHTML = moment(dataInner.daily[2].dt*1000).format("MM/DD/YYYY");
          day2Temp.innerHTML = dataInner.daily[2].temp.day+ " F ";
          day2Wind.innerHTML = dataInner.daily[2].wind_speed+ " MPH ";
          day2Humidity.innerHTML = dataInner.daily[2].humidity+ "%";
          day3Title.innerHTML = moment(dataInner.daily[3].dt*1000).format("MM/DD/YYYY");
          day3Temp.innerHTML = dataInner.daily[3].temp.day+ " F ";
          day3Wind.innerHTML = dataInner.daily[3].wind_speed+ " MPH ";
          day3Humidity.innerHTML = dataInner.daily[3].humidity+ "%";
          day4Title.innerHTML = moment(dataInner.daily[4].dt*1000).format("MM/DD/YYYY");
          day4Temp.innerHTML = dataInner.daily[4].temp.day+ " F ";
          day4Wind.innerHTML = dataInner.daily[4].wind_speed+ " MPH ";
          day4Humidity.innerHTML = dataInner.daily[4].humidity+ "%";
          day5Title.innerHTML = moment(dataInner.daily[5].dt*1000).format("MM/DD/YYYY");
          day5Temp.innerHTML = dataInner.daily[5].temp.day+ " F ";
          day5Wind.innerHTML = dataInner.daily[5].wind_speed+ " MPH ";
          day5Humidity.innerHTML = dataInner.daily[5].humidity+ "%";
        });
    });
}
function loadData() {
  var loadData = localStorage.getItem("city");
  if (loadData == null || loadData == "") return;

  cityNames = JSON.parse(loadData);
  console.log(cityNames);
  for (i = 0; i < cityNames.length; i++) {
    var historyButton = document.createElement("button");
    historyButton.classList.add("historyBtn");
    historyButton.textContent = cityNames[i];
    searchEl.appendChild(historyButton);

    historyButton.addEventListener("click", function (event) {
      var city = event.target.textContent;
      fetchCalls(city);
    });
  }
}

//trail down the array

// add the city to the search history log and store to local storage

//uv index needs to change color based on index
var changeColor = function (uvIndex) {
  if (uvIndex < 2) {
    uvIndexEl.style.backgroundColor = "green";
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    uvIndexEl.style.backgroundColor = "yellow";
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    uvIndexEl.style.backgroundColor = "orange";
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    uvIndexEl.style.backgroundColor = "red";
  }
};



loadData();
//upon event listener click loads data from fetch grabs lat and lon of city searched
searchForm.addEventListener("submit", search);
