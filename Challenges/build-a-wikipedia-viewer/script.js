// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js

// TO DO
//
// 1. FIX RANDOM ARTICLE VIEWER SO IT ACTUALLY LOADS 😅
// 2. FIX SEARCH KEYWORD HIGHLIGHT SO IT:
//    A. WORKS PROPERLY, AND
//    B. DOESN'T OVERFLOW BUFFER 😒
// 3. FIX IT SO RESULTS END UP IN THE PROPER ORDER! (i.e. "Kylo Ren" should show up FIRST)
// 4. POLISH OFF STUFF SO IT LOOKS EVEN BETTER!! 😎

$(()=>{ // jQuery document ready

  var articles = $("#articles ul"),
      button = $("button"),
      input = $("input"),
      random = $("#random"),
      search = $("#search"),
      Wikipedia = "https://en.wikipedia.org",
      WP_API = Wikipedia + "/w/api.php";

  var queryAPI = searchTerms => {
    $.ajax({
      url: WP_API,
      dataType: "jsonp",
      data: {
        action: "query",
        format: "json",
        generator: "search",
        gsrsearch: searchTerms,
        gsrnamespace: 0,
        gsrlimit: 1,
        prop: "extracts|pageimages",
        exchars: 484,
        exlimit: "max",
        explaintext: true,
        exintro: true,
        pilimit: "max",
        piprop: "thumbnail",
        pithumbsize: 256
      },
      success: data => {
        var results = data.query.pages;
        $.map(results, result => {
          var el = $('<li>');

//           console.log("original title: "+result.title);
//           console.extract("original title: "+result.extract);
//           var newTitle = result.title.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");

//           var newExtract = result.extract.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");
//           console.log("new title: "+newTitle);
//           console.extract("new title: "+newExtract);

          // $("body *:contains("+input.val()+")").html(function(_, html) {
          //   return html.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");
          // });
          el.append( $('<a>').attr('href',Wikipedia+"/wiki/"+result.title).append($('<h2>').text(result.title)).append(result.thumbnail?$('<img>').attr('width',128).attr('src',result.thumbnail.source):"").append($('<p>').text(result.extract)));
          articles.append(el).hide().fadeIn(284);
        });
      }
    });
  };
  var queryAPIRandom = () => {
    $.ajax({
      url: WP_API,
      dataType: "jsonp",
      data: {
        action: "query",
        format: "json",
        formatversion: 2,
        list: "random",
        rnnamespace: 0,
        rnlimit: 5,
        titles: "Main_page",
        callback: "?"
      },
      success: data => {
        var results = data.query.pages;
        $.map(results, result => {
          var el = $('<li>');
          el.append($('<h2>').append($('<a>').attr('href',Wikipedia+"/wiki/"+result.title).text(result.title)));
          if (result.thumbnail) el.append($('<img>').attr('width',128).attr('src',result.thumbnail.source));
          el.append($('<p>').text(result.extract));
          articles.append(el).hide().fadeIn(284);
        });
      }
    });
  };

  input.on("input", doSearch);
  button.click(doSearch);
  // search.on("submit", e => e.preventDefault());
  search.on("submit", function(){ return false; });
  random.click(e => {
    e.preventDefault();
    queryAPIRandom();
  });
  function doSearch(){
    articles.empty();
    queryAPI(input.val());
  }
});