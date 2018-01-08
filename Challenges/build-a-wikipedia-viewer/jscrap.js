$(function () {
  // console.clear();
  const articles = $("#articles ul"),
        random = $("#random"),
        search = $("#search"),
        input = $("input"),
        wikipedia = "https://en.wikipedia.org/wiki/",
        API = "https://en.wikipedia.org/w/api.php",
        randomQuery = API + "?action=query&format=json&formatversion=2&list=random&rnnamespace=0&rnlimit=15&titles=Main_page&callback=?";
  let searchString = "",
      searchResults = [
        // {
        //   title: "Result 1 Title",
        //   snippet: "Result text result text result text result text result text result text result text result text result text result text result text result text result text result text"
        // },
        // {
        //   title: "Result 2 Title",
        //   snippet: "Result text result text result text result text result text result text result text result text result text result text result text result text result text result text"
        // },
        // {
        //   title: "Result 3 Title",
        //   snippet: "Result text result text result text result text result text result text result text result text result text result text result text result text result text result text"
        // },
        // {
        //   title: "Result 4 Title",
        //   snippet: "Result text result text result text result text result text result text result text result text result text result text result text result text result text result text"
        // },
        // {
        //   title: "Result 5 Title",
        //   snippet: "Result text result text result text result text result text result text result text result text result text result text result text result text result text result text"
        // }
      ],
      searchQuery = API + "?action=query&format=json&generator=search&gsrsearch=" + searchString + "&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&exchars=184&exlimit=max&explaintext=true&exintro=true&piprop=thumbnail&pilimit=max&pithumbsize=243";

  random.click(e => {
    e.preventDefault();
    getRandom();
  });
  search.on("submit", e => e.preventDefault());
  input.autocomplete({
    // appendTo: input,
    source: function (request, response) {
      $.ajax({
        url: API,
        dataType: 'jsonp',
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function (data) {
          response(data[1]);
        }
      });
    }
  });


  input.on("input", e => searchFor());

  // get JSON from
  function searchFor(){
    emptyResults();
    searchString = input.val();
    $.getJSON(searchQuery, data => {
      var pages = data.query.pages;
      $.map(pages, function (page) {
        var pageElement = $('<div>');
        pageElement.append($('<h2>').append($('<a>').attr('href', wikipedia + page.title).text(page.title)));
        if (page.thumbnail) pageElement.append($('<img>').attr('width', 243).attr('src', page.thumbnail.source));
        pageElement.append($('<p>').text(page.extract));
        pageElement.append($('<hr>'));
        articles.append(pageElement);
      });

      // for (var i = 0; i < data.query.search.length; i++){
      //   searchResults.push(data.query.search[i]);
      // }
    });
    makeUL(searchResults);
  }

  // take results and create a list
  function makeUL(res){
    res.forEach(res => { makeLI(res.title, res.snippet); });
  }
  // create a list item of a single result
  function makeLI(title, snippet = null){
    articles.append("<li><a href='" + wikipedia + title + "' target='_blank'><h2>" + title + "</h2>" + (snippet !== null ? "<p>" + snippet + "</p>" : "") + "</a></li>");
  }
  // function makeLIOld(title, snippet){
  //   articles.append("<li><a href='" + wikipedia + title + "' target='_blank'><h2>" + title + "</h2><p>" + snippet + "</p></a></li>");
  // }
  function getRandom(){
    emptyResults();
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
        // articles.prepend(
        //   "<li>" +
        //     "<a href='" + wikipedia + data.query.random[i].title + "' target='_blank'>" +
        //       "<h2>" + data.query.random[i].title + "</h2>" +
        //       "<p>" + data.query.random[i].extracts + "</p>" +
        //     "</a>" +
        //   "</li>");
      }
    });
  }
  function emptyResults(){
    articles.html("");
    searchResults = [];
  }

  // $("input").on("input", function(e) {
  //   console.log($(this).val());
  //   $.getJSON(randomQueryBase + $(this).val(), function(data) {
  //     console.log(data);
  //     console.log(data.query.search[0].title);
  //     console.log(data.query.search[0].snippet);
  //     // console.log(data.query.pages[0].title);
  //     for (var i = 0; i < data.query.search.length; i++) {
  //       articles.append("<li><b>"+data.query.search[i].title+"</b></li>");
  //       articles.append("<li>"+data.query.search[i].extract+"</li>");
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
  //       // articles.append("<li><b>"+data.query.random[i].title+"</b></li>");
  //       // articles.append("<li>"+data.query.random[i].extract+"</li>");
  //       // console.log(data.query.random[i].title);
  //     }
  //   });
  //   return false;
  // }
  // function getRandom(){
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
  //       articles.prepend(
  //         "<li>" +
  //           "<a href='" + wikipedia + data.query.random[i].title + "' target='_blank'>" +
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