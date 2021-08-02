// City Results Variables
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndexEl = document.getElementById("uvIndex");
var nameEl = document.getElementById("cityDate");
// Buttons
var searchForm = document.getElementById("searchForm");
var searchEl = document.getElementById("search");

// API requirements and User Inputs
var cityInputEl = document.getElementById("citySearch");
var key = "e017ff1bdf19eb3fa5c2f9c7fc8fd4bc";

var cityNames = [];
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
  newButton.textContent = city;
  searchEl.appendChild(newButton);

  // add the city name to an array
  cityNames.push(city);
  localStorage.setItem("city", JSON.stringify(city));
  console.log(cityNames);
  // localstorage set item that array


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
      nameEl.innerHTML = data.name;
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          key
      )
        .then(function (responseInner) {
          return responseInner.json();
        })
        .then(function (dataInner) {
          console.log(dataInner)
          tempEl.innerHTML = dataInner.current.temp;
          windEl.innerHTML = dataInner.current.wind_speed;
          humidityEl.innerHTML = dataInner.current.humidity; 
          uvIndexEl.innerHTML = dataInner.current.uvi;
          changeColor(dataInner.current.uvi);
        });
    });
}

function loadData() {
  var loadData = localStorage.getItem("city")
  if (loadData == null || loadData == "") return;

  city = JSON.parse(loadData)

  for (i = 0; i < cityNames.length; i++) {
    var historyButton = document.createElement("button");
    historyButton.textContent = city;
    searchEl.appendChild(historyButton);
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
  } else if (uvIndex>= 8 && uvIndex <= 10) {
    uvIndexEl.style.backgroundColor = "red";
  }
};

loadData();
//upon event listener click loads data from fetch grabs lat and lon of city searched
searchForm.addEventListener("submit", search);
