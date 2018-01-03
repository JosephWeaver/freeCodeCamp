// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js

// declare variables
var weather,
	html,
	lat,
	long;

// when jQuery document ready fires...
$(function(){

// display weather info
displayWeather();

});

// function definitions
function displayWeather(){

// get weather info
weather = getWeather();

  weather.name = data.name;
  weather.icon = data.description;
  weather.humidity = data.main.humidity;
  weather.windSpeed = data.wind.speed;
  weather.tempC = data.main.temp;
  weather.tempF = tempC * 9 / 5 + 32;

}
function getWeather(){
// check if geolocation is available
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
	queryAPI(position.coords.latitude, position.coords.longitude);
	// element.html("temperature is" + tempF);
  });
  // if geolocation unavailable or denied by user, throw error
} else {
  console.log("No geolocation available. Sorry!");
}
}
function queryAPI(lat, long){
// query weather API
$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long, function(data) {
  console.log(data);
  weather.name = data.name;
  weather.icon = data.description;
  weather.humidity = data.main.humidity;
  weather.tempC = data.main.temp;
  weather.tempF = tempC * 9 / 5 + 32;
});
}
function parseIcon(icon) {
switch (icon) {
  case 'drizzle':     setIcon(icon); break;
  case 'clouds':      setIcon(icon); break;
  case 'rain':        setIcon(icon); break;
  case 'snow':        setIcon(icon); break;
  case 'clear':       setIcon(icon); break;
  case 'thunderstom': setIcon(icon); break;
  default: $('div.clouds').removeClass('hide');
}
}
function setIcon(icon) {
$('div.' + icon).removeClass('hide');
}
