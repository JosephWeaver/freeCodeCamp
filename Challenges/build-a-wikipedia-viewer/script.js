// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

// clear console
console.clear();

// save articles container from DOM
const $articles = $("#articles ul"),

      // set base URL for Wikipedia links
      WP_Page = "https://en.wikipedia.org/wiki/",

      // declare API string cheese
      WP_API = "https://en.wikipedia.org/w/api.php",
      action = "?action=query", // query WP API
      search = "&list=search", // article search
      callback = "&callback=?", // blank callback
      format = "&format=json", // format is JSON
      version = "&formatversion=2", // new format
      rand = "&generator=random", // get random pages
      rand2 = "&list=random", // get random articles
      notalk = "&grnnamespace=0", // no Talk: namespace
      notalk2 = "&rnnamespace=0", // no Talk: namespace
      rnlimit = "&rnlimit=", // set number of articles
      extracts = "&prop=extracts", // get extracts
      exlength = "&exchars=", // set excerpt length
      exintro = "&exintro=1", // set excerpt intro
      expltext = "&explaintext=1", // set explain text
      revisions = "&prop=revisions", // get page revisions
      rvcontent = "&rvprop=content", // get page content

      // construct API query for random pages
      randomQuery = WP_API + action + format + version + rand2 + notalk2 + rnlimit + "15" + "&titles=Main_page" + callback;

//       // construct API query for searches
//       searchQueryBase = WP_API + action + format + version + "&list=search&utf8=&srsearch=";

// old API queries for searches (didn't work)
//searchQueryBase = WP_API + action + format + extracts + exlength + "500" + expltext + exintro + rand + notalk + "&titles=",
//searchQueryBase=WP_API+action+format+"&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + $("input").val() + "&callback=JSON_CALLBACK";

// declare search  results container array
let searchResults = [
  // {
  //   title: "Ayyy fam",
  //   snippet: "this is the shit"
  // },
  // {
  //   title: "2 real",
  //   snippet: "this is not the shit"
  // },
  // {
  //   title: "third time's the charm",
  //   snippet: "this is the tits"
  // }
];

// document ready
$(function(){

  // prevent default on #search form submit
  $("#search").on("submit", e => e.preventDefault());

  // when input field is changed
  $("input").on("input", function(e) {

    // empty search results array and remove displayed list
    searchResults = [];
    $articles.html("");

    // search for input value
    searchFor($(this).val());

    // log search results
    // console.log(searchResults[0].title);

    // display new search results list
    makeUL(searchResults);

  });

  // get JSON from
  function searchFor(inputValue){
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + inputValue + "&utf8=&callback=?", (data) => {
      // console.log(data);
      for (var i = 0; i < data.query.search.length; i++){
        searchResults.push(data.query.search[i]);
      }
    });
  }

  // take results and create a list
  function makeUL(res){
    res.forEach(res => { makeLI(res.title, res.snippet); });
  }
  // create a list item of a single result
  function makeLI(title, snippet = null){
    $articles.append("<li><a href='" + WP_Page + title + "' target='_blank'><h2>" + title + "</h2>" + (snippet !== null ? "<p>" + snippet + "</p>" : "") + "</a></li>");
  }
  // function makeLIOld(title, snippet){
  //   $articles.append("<li><a href='" + WP_Page + title + "' target='_blank'><h2>" + title + "</h2><p>" + snippet + "</p></a></li>");
  // }
  function getRandomValues(){
    $.getJSON(randomQuery, function(data) {
      for (var i = 0; i < data.query.random.length; i++) {
        // console.log("Random Title: " + data.query.random[i].title);
        makeLI(data.query.random[i].title);
        // var title = data.query.random[i].title;
        // console.log(title);
        // $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=" + title + "&callback=?", function(data){
        //   // console.log("content: " + data.pages[i].revisions[0].content);
        //   var snippet = data.pages[i].revisions[0].content;
        //   makeLI(title, snippet);
        //   // var keys = [];
        //   // for (var x in data.query.pages) {
        //   //   if (data.query.pages.hasOwnProperty(x)){
        //   //     console.log("here's the ID!: " + x); //keys.push(l);
        //   //   }
        //   // }
        // });
        // $articles.prepend(
        //   "<li>" +
        //     "<a href='" + WP_Page + data.query.random[i].title + "' target='_blank'>" +
        //       "<h2>" + data.query.random[i].title + "</h2>" +
        //       "<p>" + data.query.random[i].extracts + "</p>" +
        //     "</a>" +
        //   "</li>");
      }
    });
  }

  // when random articles button is clicked
  $("#random").click(e => {
    e.preventDefault(); // prevent default
    $articles.html(""); // empty displayed results list
    getRandomValues();
  });

  // $("input").on("input", function(e) {
  //   console.log($(this).val());
  //   $.getJSON(randomQueryBase + $(this).val(), function(data) {
  //     console.log(data);
  //     console.log(data.query.search[0].title);
  //     console.log(data.query.search[0].snippet);
  //     // console.log(data.query.pages[0].title);
  //     for (var i = 0; i < data.query.search.length; i++) {
  //       $articles.append("<li><b>"+data.query.search[i].title+"</b></li>");
  //       $articles.append("<li>"+data.query.search[i].extract+"</li>");
  //       // console.log(data.query.random[i].title);
  //     }
  //   });
  //   console.log(results[0].title);
  // });
  //
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
  // function getRandomValues(){
  //   $.getJSON(randomQuery, function(data) {
  //     // console.log(data.query.pages[0].title);
  //     // console.log(data.query.random.length);
  //     for (var i = 0; i < data.query.random.length; i++) {
  //       // console.log("Random ID: " + data.query.random[i].id);
  //       console.log("Random Title: " + data.query.random[i].title);
  //       // var queryy = "https://en.wikipedia.org/w/api.php?format=json&formatversion=2&action=query&prop=extracts&exintro=&explaintext=&titles=" + data.query.random[i].title;
  //       // // var query2 = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&generator=random&exlimit=1&exchars=250&callback=?";
  //       // $.getJSON(queryy, function(data) {
  //       //   // console.log(data.query);
  //       //   console.log(data.query.pages[0].title);
  //       //   console.log(data.query.pages[0].extract);
  //       // });
  //       // console.log(excerpt);
  //       $articles.prepend(
  //         "<li>" +
  //           "<a href='" + WP_Page + data.query.random[i].title + "' target='_blank'>" +
  //             "<h2>" + data.query.random[i].title + "</h2>" +
  //             "<p>" + data.query.random[i].extracts + "</p>" +
  //           "</a>" +
  //         "</li>");
  //       // console.log(data.query.random[i].title);
  //     }
  //   });
  // }
  // function searchFor(inputValue){
  //   $.getJSON(searchQueryBase + "&titles=" + inputValue + callback, function(data) {
  //     for (var i = 0; i < data.query.search.length; i++){
  //       console.log(data);
  //       // searchResults.push(data.query.search[i]);
  //     }
  //   });
  // }

});
