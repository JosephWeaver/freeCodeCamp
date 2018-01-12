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
      // $streams =  $("#streams"),

      // cache API URL
      API_URL =  "https://wind-bow.gomix.me/twitch-api",

      // define stream list, info, status
      streams = [
        "freecodecamp",
        "esl_sc2",
        "day9tv"
      ],
      streamsInfo = [];
      // liveStreams = [];

  // let Stream = function(streamInfo) {
  //   console.log(streamInfo);
  //   // if (streamInfo.stream){
  //   //   this.name = streamInfo.display_name || "Example";
  //   //   this.logo = streamInfo.logo || "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png";
  //   //   this.bgimage = streamInfo.profile_banner || "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png";
  //   //   this.bgcolor = streamInfo.profile_banner_background_color || "#000";
  //   //   this.status = streamInfo.status || "example status";
  //   // } else {
  //   //   this.name = "oops";
  //   // }
  // };
  // let streamsInfoListMaster = [];

// Only change code below this line.



  // get stream data from Twitch
  for (let i = 0; i < streams.length; i++){
    streamsInfo.push(getStreamData(streams[i]));
    // let myStream = new Stream(getStreamData(streams[i]));
    // streamsInfoListMaster.push(myStream);
  }

  // console.log(streamsInfoListMaster);
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
    if (live === null) {
      $.getJSON(API_URL + "/streams/"+stream+"?callback=?", data => {
        if (data.stream){
          return data.stream;
        } else {
          return data;
        }
        // let li = $("<li>");
        // li.attr("style","background: url(" + data.stream.channel.profile_banner + ")").attr("class","live").append($("<div>").attr("class", "avatar").append($("<img>").attr("src", data.stream.channel.logo))).append($("<div>").attr("class", "info").append($("<a>").attr("href", "https://www.twitch.tv/" + stream).attr("target", "_blank").append($("<div>").attr("class", "name").html(data.stream.channel.display_name)).append($("<div>").attr("class", "stream").html(data.stream.channel.display_name)))).append($("<div>").attr("class", "status").html(live ? "LIVE" : "Offline"));
      });
    } else {
      $.getJSON(API_URL + "/channels/"+stream+"?callback=?", data => {
        return data;
        // console.log(data);
        // let li = $("<li>");
        // li.attr("style","background: url(" + data.profile_banner + ")");
        // li.append($("<div>").attr("class", "avatar").append($("<img>").attr("src", data.logo)));
        // li.append($("<div>").attr("class", "info").append($("<a>").attr("href", "https://www.twitch.tv/" + stream).attr("target", "_blank").append($("<div>").attr("class", "name").html(data.display_name)).append($("<div>").attr("class", "stream").html(data.display_name)))).append($("<div>").attr("class", "status").html(live ? "LIVE" : "Offline"));
        // $streams.prepend(li).hide().delay().slideDown(284);
      });
    }
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
  // function watchStream(e){
  //   // watch stream
  // }

});