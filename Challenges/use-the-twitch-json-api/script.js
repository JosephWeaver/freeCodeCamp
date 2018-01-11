// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  // use strict
  "use strict";

  // clear console
  console.clear();

  // cache DOM elements
  let $navLink =  $("nav a"),
      $search =   $("#search"),
      $input =    $("#input"),
      $main =     $("#main"),
      $streams =  $("#streams"),

      // cache API URL
      API_URL =  "https://wind-bow.gomix.me/twitch-api",

      // define stream list, info, status
      streams = [
        "freecodecamp",
        "esl_sc2",
        "day9tv"
      ],
      streamsInfo = [],
      liveStreams = [];

  // get stream data from Twitch
  for (let i = 0; i < streams.length; i++){
    streamsInfo.push(getStreamData(streams[i]));
  }

  // update stream status every few seconds
  // setInterval(getStreamData(streams, "live"), 2843);

  // nav click, input change, and search submit handlers
  $navLink.on("click", e => showStreams(e));
  $input.on("input", e => searchStreams(e));
  $search.on("submit", e => searchStreams(e));

  console.log(streamsInfo);
  // setInterval(() => console.log(liveStreams), 2843);

  // define function to pull JSON from Twitch API
  function getStreamData(stream, live = null){
    return live ? $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+stream+"?callback=?", data => {
        let li = $("<li>");
        li.attr("style","background: url(" + data.stream.channel.profile_banner + ")").attr("class","live").append($("<div>").attr("class", "avatar").append($("<img>").attr("src", data.stream.channel.logo))).append($("<div>").attr("class", "info").append($("<a>").attr("href", "https://www.twitch.tv/" + stream).attr("target", "_blank").append($("<div>").attr("class", "name").html(data.stream.channel.display_name)).append($("<div>").attr("class", "stream").html(data.stream.channel.display_name)))).append($("<div>").attr("class", "status").html(live ? "LIVE" : "Offline"));}) : $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/"+stream+"?callback=?", data => {
      console.log(data);
        let li = $("<li>");
        li.attr("style","background: url(" + data.profile_banner + ")");
        li.append($("<div>").attr("class", "avatar").append($("<img>").attr("src", data.logo)));
        li.append($("<div>").attr("class", "info").append($("<a>").attr("href", "https://www.twitch.tv/" + stream).attr("target", "_blank").append($("<div>").attr("class", "name").html(data.display_name)).append($("<div>").attr("class", "stream").html(data.display_name)))).append($("<div>").attr("class", "status").html(live ? "LIVE" : "Offline"));
        $streams.prepend(li).hide().delay().slideDown(284);
      });
    }

    // function fired when nav links are clickedfor clicking all, live, offline
    function showStreams(e){
      let $clicked = $("#" + e.target.id);
      $clicked.addClass("selected").siblings().removeClass("selected");
      switch(e.target.id){
        case "live": console.log("show live"); break;
        case "offline": console.log("show offline"); break;
        default: console.log("show all");
      }
    }

    // function for searching streamers list (extra)
    function searchStreams(e){
      e.preventDefault();
      console.log($input.val());
    }

    // function for watching twitch stream (extra)
	function watchStream(){

	}

  });