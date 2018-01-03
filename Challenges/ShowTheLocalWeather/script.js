// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js

$(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      queryAPI(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert("No geolocation available. Sorry!");
  }
  function queryAPI(lat, long){
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long, function(data) {
      $("#temp .c").html(Math.round(data.main.temp * 10 ) / 10);
      $("#temp .f").html(Math.round(((Math.round(data.main.temp * 10 ) / 10) * 9 / 5 + 32) * 10 ) / 10);
      $("#humidity span").html(data.main.humidity);
      $("#icon span").html(data.weather[0].description);
      $("#location").html(data.name.split(" ").join("<br>"));
      $("#wind span").html(data.wind.speed);
      if(data.name.includes("San Francisco")){ $("body").addClass("sf"); }
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
});