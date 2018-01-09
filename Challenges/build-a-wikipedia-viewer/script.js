// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js

$(()=>{ // jQuery document.ready

  const articles = $("#articles ul"),
        input = $("input"),
        random = $("#random a"),
        search = $("#search"),
        Wikipedia = "https://en.wikipedia.org",
        WP_API = Wikipedia + "/w/api.php";

  search.on("submit", e => {
    input.blur();
    e.preventDefault();
    getArticles(input.val());
  });
  random.click(e => {
    e.preventDefault();
    getArticles();
  });

  function getArticles(searchTerm = undefined){
    searchTerm === undefined ?
      $.getJSON(WP_API + "?action=query&format=json&list=random&rnnamespace=0&rnlimit=10&titles=&callback=?", data => {
        $.map(data.query.random, result => getDetails(result, "random"));
      }) :
      $.ajax({
        url: WP_API,
        dataType: "jsonp",
        data: {
          action: "query",
          format: "json",
          list: "search",
          srsearch: searchTerm,
          srlimit: 10,
          srwhat: "text"
        },
        success: data => {
          var Mystuff = data.query.search.reverse();
          Mystuff.forEach(result => getDetails(result, searchTerm));
        }
      });
  }
  function getDetails(result, random = undefined){
    $.ajax({
      url: WP_API,
      dataType: "jsonp",
      data: {
        action: "query",
        exchars: "884",
        format: "json",
        pilimit: 10,
        piprop: "thumbnail",
        pithumbsize: 256,
        prop: "extracts|pageimages",
        titles: result.title
      },
      success: data => {
        for (var id in data.query.pages){
          if (data.query.pages.hasOwnProperty(id)){
            var title = data.query.pages[id].title,
                stuff = data.query.pages[id].extract,
                image = data.query.pages[id].thumbnail.source || undefined;
            // console.log(title);
            // console.log(stuff);
            // console.log(image ? image : "");
            displayResults(title, stuff, random ? random : undefined, image ? image : undefined);
          }
        }
      }
    });
  }
  function displayResults(title, extract, random = undefined, image = undefined){
    var li = $('<li>');
    if (random) li.attr("class", "random");
    li.append($("<a>").attr("href", Wikipedia + "/wiki/" + title).attr("target", "_blank")
      .append($("<h1>").html(title))
      .append($("<p>").html("<br>"))
      .append(image ? $("<img>").attr("width", 128).attr("src", image) : "")
      .append($("<div>").html(extract)));
    articles.prepend(li.hide().delay().slideDown(284));
    if ( articles.children().length > 10 ) {
      $("#articles ul li:nth-child(n + 10)").delay().slideUp(284, () => $(this).remove());
    }
  }
});