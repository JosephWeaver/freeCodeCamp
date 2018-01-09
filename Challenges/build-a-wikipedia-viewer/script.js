// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js

$(()=>{ // jQuery document.ready

  const articles = $("#articles ul"),
        input = $("input"),
        random = $("#random a"),
        search = $("#search"),
        Wikipedia = "https://en.wikipedia.org",
        WP_API = Wikipedia + "/w/api.php";

  let isRandom = true;

  function queryAPI(terms){
    $.ajax({
      url: WP_API,
      // url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + input.val() + "&format=json&srprop=snippet&prop=info&inprop=url&srlimit=1",
      dataType: "jsonp",
      data: {
        action: "query",
        format: "json",
        list: "search",
        // utf8: 1,
        srsearch: input.val(),
        // origin: "*",
        // exchars: 455,
        // exintro: true,
        // exlimit: "max",
        // explaintext: true,
        format: "json",
        // generator: "search",
        // gsrlimit: 15,
        // gsrnamespace: 0,
        // gsrsearch: terms,
        list: "search",
        pilimit: 10,
        piprop: "thumbnail",
        pithumbsize: 256,
        prop: "extracts|pageimages",
        srsearch: terms,
        // sroffset: 0,
        srlimit: 10,
        prop: "revisions|pageimages",
        rvprop: "content"
      },
      success: data => {
        data.query.search.reverse();
        // var results = data.query.pages;
        var results = data.query.search;
        // $(results.get()).each(result => {
        console.clear();
        $.map(results, result => {
          console.log(result.title);

          // if highlight didn't maintain proper case, split() and join() on input.val() would work
          var titleMatch = result.title.toLowerCase().indexOf(input.val().toLowerCase()),
              titleHighlight = titleMatch !== -1 ?                                                   // if a string match exists, highlight it
                result.title.substr(0, titleMatch) + "<span class='searchmatch'>" +                  // before match start + start searchmatch
                result.title.substr(titleMatch, input.val().length()) + "</span>" +                  // part which matches + ends searchmatch
                result.title.substr(titleMatch + input.val().length(), result.title.length()) : "",  // after match ends + closes out ternary
              descrMatch = result.extract.toLowerCase().indexOf(input.val().toLowerCase()),
              descrHighlight = descrMatch !== -1 ?                                                       // if a string match exists, highlight it
                result.extract.substr(0, descrMatch) + "<span class='searchmatch'>" +                    // before match start + start searchmatch
                result.extract.substr(descrMatch, input.val().length()) + "</span>" +                    // part which matches + ends searchmatch
                result.extract.substr(descrMatch + input.val().length(), result.extract.length()) : "";  // after match ends + closes out ternary

          // var title = result.title.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>"),
              // descr = result.snippet.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>");

          var li = $('<li>');
          li.append($("<a>").attr("href", Wikipedia + "/wiki/" + result.title).attr("target", "_blank")
                    .append($("<h2>").html(titleHighlight))
                    .append(result.thumbnail ? $("<img>").attr("width", 128).attr("src", result.thumbnail.source) : "")
                    .append($("<p>").html(descrHighlight)));
          articles.empty().append(li).hide().fadeIn(284);

        });
      }
    });
  };
  function queryAPIRandom(){
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&titles=&callback=?", data => {
      $.map(data.query.random, result => extractFrom(result, "random"));
      // {
      // var li = $('<li>').attr("class", "random");
      // li.append($("<a>").attr("href", Wikipedia + "/wiki/" + result.title).attr("target", "_blank")
      //   .append($("<h2>").html(result.title))
      //   // .append(result.thumbnail ? $("<img>").attr("width", 128).attr("src", result.thumbnail.source) : "")
      //   .append($("<p>").html(result.descr)));
      // articles.empty().append(li).hide().fadeIn(284);
      // extractFrom(result);
      // });
    });
  };

  // input.on("input", doSearch(input.val()));
  // search.on("submit", e => { articles.empty(); e.preventDefault(); doSearch(); });

  // input.on("input", searchFor(input.val()));
  search.on("submit", e => {
    e.preventDefault();
    searchFor(input.val());
  });
  random.click(e => {
    e.preventDefault();
    queryAPIRandom();
  });
  function doSearch(term){ queryAPI(term); }
  function searchFor(searchTerm){
    $.ajax({
      url: WP_API,
      dataType: "jsonp",
      data: {
        action: "query",
        format: "json",
        pilimit: 10,
        piprop: "thumbnail",
        pithumbsize: 256,
        prop: "extracts|pageimages",
        list: "search",
        srsearch: searchTerm,
        srlimit: 10
      },
      success: data => data.query.search.forEach(result => extractFrom(result, searchTerm))
    });
  }
  function extractFrom(result, random = undefined){
    $.ajax({
      url: WP_API,
      dataType: "jsonp",
      data: {
        action: "query",
        exchars: "430",
        format: "json",
        prop: "extracts",
        titles: result.title
      },
      success: data => {
        for (var id in data.query.pages){
          if (data.query.pages.hasOwnProperty(id)){
            // console.log(data.query.pages[id].title);
            // console.log(data.query.pages[id].extract);
            if (random){
              displayResults(data.query.pages[id].title, data.query.pages[id].extract, random ? random : undefined);
            } else {
              displayResults(data.query.pages[id].title, data.query.pages[id].extract);
            }
          }
        }
      }
    });
  }
  function displayResults(title, extract, random = undefined){
    var li = $('<li>')
    if (random) li.attr("class", "random");
    li.append($("<a>").attr("href", Wikipedia + "/wiki/" + title).attr("target", "_blank")
      .append($("<h1>").html(title))
      .append($("<p>").html("<br>"))
      // .append(thumbnail ? $("<img>").attr("width", 128).attr("src", thumbnail.source) : "")
      .append($("<div>").html(extract)));
    articles.prepend(li.hide().delay(300).slideDown(284));
    if ( articles.children().length > 10 ) {
      $("#articles ul li:nth-child(n + 10)").delay(300).slideUp(284, () => $(this).remove());
    }
  }
});