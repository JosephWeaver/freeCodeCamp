// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(function(){

  // geolocation stuff
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      queryAPI(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert("No geolocation available. Sorry!");
  }

  // API query stuff
  function queryAPI(lat, long){
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long, function(data) {
      displayData(data);
    });
  }

  // display data to the page
  function displayData(data){

    // set vars
    var tempC = Math.round(data.main.temp * 10 ) / 10;
    var tempF = Math.round(((tempC) * 9 / 5 + 32) * 10 ) / 10;
    var location = data.name;
    var humid = data.main.humidity;
    var icon = data.weather[0].main;
    var wind = data.wind.speed;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;
    var now = Math.round(Date.now() / 1000);
    var timeOfDay = now < sunrise && now > sunset ? "night" : "day";

    // push API content to elements on page
    $("#temp .c").html(tempC);
    $("#temp .f").html(tempF);
    $("#humidity span").html(humid);
    $("#wind span").html(data.wind.speed);
    $("#icon").html("<i class='wi wi-" + timeOfDay + "-" + icon.toLowerCase() + "'></i> " + icon);
    $("#location").html(data.name.split(" ").join("<br>"));
    if(location.includes("San Francisco")){ $("body").addClass("sf"); }
  }

  // change fahrenheit to celsius and vice versa
  $("#f").click(function(){ $(this).hide(); $("#c").show(); });
  $("#c").click(function(){ $(this).hide(); $("#f").show(); });

});