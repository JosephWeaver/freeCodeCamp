// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

//---------------------------------------------

// double clicks should OPEN instead of closing

// remove the vertical bar when section is OPEN

// protect against closing ALL panels, somehow.

$(()=>{

  let $panelTitle = $("#panels .title"),
      $settings = $("a[href='#settings']");

  $panelTitle.dblclick(function(){
    $(this).toggleClass("hidden");
    $(this).next(".content").toggleClass("hidden");
  });

  $settings.click(function(){
    $(".content").toggleClass("dark light");
  });

});