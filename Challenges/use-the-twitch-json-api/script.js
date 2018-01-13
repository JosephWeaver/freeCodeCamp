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
      $streams =  $("#streams"),

      // cache API URL
      API_URL =  "https://wind-bow.gomix.me/twitch-api",

      // define stream list, info, status
      streams = [
        "freecodecamp",
        "esl_sc2",
        "day9tv"
      ],

      streamsData = [], // stores all data from streams
      liveStreams = []; // stores which streams are live

  // get stream data from Twitch

  streamsData.push(getStreamData("freecodecamp"));
  console.log(streamsData);

  // for (let i = 0; i < streams.length; i++){
  //   getStreamData(streams[i]);
  // }
  // for (let i = 0; i < streamsInfo.length; i++){
  //   $streams.html(streamsInfo[i]).hide().delay().slideDown(284);
  // }

  // update stream status every few seconds
  // setInterval(getStreamData(streams, "live"), 2843);

  // nav click, input change, and search submit handlers
  $navLink.on("click", e => showStreams(e));
  $input.on("input", e => searchStreams(e));
  $search.on("submit", e => searchStreams(e));
  // setInterval(() => console.log(liveStreams), 2843);

  // define function to pull JSON from Twitch API
  function getStreamData(stream){
    // return stream;
    return getStreamInfo(stream);
    // return streams;
    // for (var i = 0; i < stream.length; i++) {
      // let stream = stream[i];
      // $.getJSON(API_URL + "/streams/" + stream + "?callback=?", data => {
      //   if(data.stream){
      //     streamsInfo.push(LIify(data.stream.channel, "live"));
      //   } else {
      //     $.getJSON(API_URL + "/channels/" + stream + "?callback=?", data => {
      //     streamsInfo.push(LIify(data));
      //     });
      //   }
      //   // $streams.html(li).hide().delay().slideDown(284);
      // });
    // }
  }

  function LIify(data, live = null){
    // console.clear();
    // console.log(data);
    var li = "<li id='" + data.name + "'" + (live? " class='live'" : "") + "'>";
        li+= "  <div class='bg' style='background-image: url(" + data.profile_banner + ")'></div>";
        li+= "  <div class='avatar'><img src='" + data.logo + "'></div>";
        li+= "  <div class='info'>";
        li+= "    <a href='https://www.twitch.tv/" + data.name + "' target='_blank'>";
        li+= "      <div class='name'>" + data.display_name + "</div>";
        li+= live ? "<div class='stream'>Streaming: " + data.status + "</div>" : "";
        li+= "    </a>";
        li+= "  </div>";
        li+= "</li>";
    return li;
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

  // function to get stream or channel info
  function getStreamInfo(channelName){
    // console.log(channelName);
    return channelName;
    $.getJSON(API_URL + "/streams/" + channelName + "?callback=?", data => {
      if (data.stream){
        // console.log(data.stream);
        return data.stream.channel;
      } else {
        $.getJSON(API_URL + "/channels/" + channelName + "?callback=?", data => {
          // console.log(data.display_name);
          return data.display_name;
        });
      }
    });
  }
  // function getStreamInfo3(c){
  //   $.getJSON(API_URL+"/streams/"+c+"?callback=?",data=>{
  //      data.stream ? data.stream.channel :
  //     $.getJSON(API_URL+"/channels/"+c+"?callback=?",data=>data);
  //   });
  // }

});