// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

console.clear();
var $articles = $("#articles ul");
var APIQueryRandomString = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&list=random&titles=Mafia_(party_game)&rnlimit=5&rnnamespace=0&callback=?&exintro=1";
var APIQuerySearchString = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=";

$(function(){
  $("#random").click(function(e){
    e.preventDefault();
    $.getJSON(APIQueryRandomString, function(data) {
      console.log(data.query.pages[0].title);
      for (var i = 0; i < data.query.random.length; i++) {
        $articles.prepend(
          "<li>" +
            "<h2>" + data.query.random[i].title + "</h2>" +
          "</li>");
        // console.log(data.query.random[i].title);
      }
    });
  });

//   $(".search").submit(function(e) {
//     e.preventDefault();
//     var $inputVal = $("input").val();
//     $.getJSON(APIQuerySearchString + $inputVal, function(data) {
//       console.log(data.query.pages[0].title);
//       for (var i = 0; i < data.query.pages.length; i++) {
//         alert("items");
//         $articles.append("<li><b>"+data.query.random[i].title+"</b></li>");
//         $articles.append("<li>"+data.query.random[i].extract+"</li>");
//         // console.log(data.query.random[i].title);
//       }
//     });
//     // console.log($("input").val());
//   });

  // var searchForm = document.getElementById("search");
  // if (searchForm.attachEvent) {
  //   searchForm.attachEvent("submit", processForm);
  // } else {
  //   searchForm.addEventListener("submit", processForm);
  // }
  // function processForm(e) {
  //   if (e.preventDefault) e.preventDefault();
  //   $.getJSON(APIQuerySearchString + $inputVal, function(data) {
  //     console.log(data.query.pages[0].title);
  //     for (var i = 0; i < data.query.pages.length; i++) {
  //       // $articles.append("<li><b>"+data.query.random[i].title+"</b></li>");
  //       // $articles.append("<li>"+data.query.random[i].extract+"</li>");
  //       // console.log(data.query.random[i].title);
  //     }
  //   });
  //   return false;
  // }

});

