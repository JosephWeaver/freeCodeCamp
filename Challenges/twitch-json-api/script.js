// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  "use strict";

  // declare variables
  let API_URL =  "https://wind-bow.gomix.me/twitch-api",
      $n = $("nav a"),
      $f = $("#search"),
      $i = $("#input"),
      $s = $("#streams"),
      list = ["day9tv",
              "dreamhackcs",
              "eleaguetv",
              "esl_csgo",
              "esl_sc2",
              "freecodecamp",
              "pashaBiceps",
              "s1mple",
              "starcraft",
              "wcs_america"
             ];

  // handle user interactions
  $n.on("click", e => showStreams(e));
  $i.on("input", e => searchStreams(e));
  $f.on("submit", e => searchStreams(e));

  // for each stream, display the data!
  for (let i = 0; i < list.length; i++){
    displayStreamData(list[i]);
  }

  // pull Twitch JSON API data
  function displayStreamData(channel){
    $.getJSON(API_URL + "/streams/" + channel + "?callback=?", data => {
      if (data.stream){
        LIify(data.stream.channel, "live");
      } else {
        $.getJSON(API_URL + "/channels/" + channel + "?callback=?", data => {
          LIify(data);
        });
      }
    });
  }

  // function to create and append a list items for a stream
  function LIify(data, live = null){
    // live ? console.log(data) : console.log(data);
    var li =  "<li id='" + data.name + "'" + (live ? " class='live'" : "") + ">";
    li += "  <div class='bg' style='background-image: url(" + data.profile_banner + ")'></div>";
    li += "  <div class='avatar'><img src='" + data.logo + "'></div>";
    li += "  <div class='info'>";
    li += "    <a href='https://www.twitch.tv/" + data.name + "' target='_blank'>";
    li += "      <div class='name'>" + data.display_name + "</div>";
    li += live ? "<div class='stream'><strong>Streaming:</strong> " + data.status + "</div>":
          "      <div class='stream'><strong>Last Stream:</strong> " + data.status + "</div>";
    li += "    </a>";
    li += "  </div>";
    li += "</li>";
    $s.append(li);
  }

  // handle nav a clicks
  function showStreams(e){
    let $clicked = $("#" + e.target.id);
    $clicked.addClass("selected").siblings().removeClass("selected");
    switch(e.target.id){
      case "live": $("#streams li:not(.live)").slideUp(); $("#streams li.live").slideDown(); break;
      case "offline": $("#streams li.live").slideUp(); $("#streams li:not(.live)").slideDown(); break;
      default: $("#streams li").slideDown();
    }
  }

  // handle search input
  function searchStreams(e){
    e.preventDefault();
    if ($i.val() === "") {
      $("#all").addClass("selected");
    } else {
      $n.removeClass("selected");
    }
    $s.children("li").each(function(){
      if ($(this).attr("id").indexOf($i.val().toLowerCase())){
        $(this).slideUp();
      } else {
        $(this).slideDown();
      }
    });
  }

});