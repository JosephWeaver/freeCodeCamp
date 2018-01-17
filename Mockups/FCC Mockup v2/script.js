// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  let $panelTitle = $("#panels .title");

  $panelTitle.dblclick(function(){
    $(this).toggleClass("hidden");
    $(this).next(".content").toggleClass("hidden");
  });

});