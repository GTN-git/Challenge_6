var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uvIndex");
//on past load show past city searches to the left in the City section.

//search for a city or click on a past city

//upon event listener click loads data from fetch grabs lat and lon of city searched

// get data from the weather API
var lat = "33.44"
var lon = "-94.04"
var apiKey ="572d14321ae6789e9c768be6fb36520d"

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&appid="+apiKey+"&units=imperial")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    temp.innerHTML= data.current.temp;
    console.log(data);
  });

  // populate the elements

  // add the city to the search history log and store to local storage

  //uv index needs to change color based on index
console.log(4 + 5)
