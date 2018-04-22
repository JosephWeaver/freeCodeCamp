// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js

$(()=>{

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
    if (searchTerm){
      $.ajax({
        data: {
          action: "query",
          format: "json",
          list: "search",
          srlimit: 43,
          srsearch: searchTerm,
          srwhat: "text"
        },
        dataType: "jsonp",
        success: data => data.query.search.reverse().forEach(result => getDetails(result, searchTerm)),
        url: WP_API
      });
    } else {
      $.getJSON(WP_API + "?action=query&format=json&list=random&rnnamespace=0&rnlimit=28&titles=&callback=?", data => {
        $.map(data.query.random, result => getDetails(result));
      });
    }
  }
  function getDetails(result){
    $.ajax({
      data: {
        action: "query",
        exchars: "884",
        format: "json",
        pilimit: 43,
        piprop: "thumbnail",
        pithumbsize: 680,
        prop: "extracts|pageimages",
        titles: result.title
      },
      dataType: "jsonp",
      success: data => {
        for (var id in data.query.pages){
          if (data.query.pages.hasOwnProperty(id)){
            var title = data.query.pages[id].title,
                stuff = data.query.pages[id].extract,
                image = data.query.pages[id].thumbnail.source || undefined;
            displayResults(title, stuff, image ? image : undefined);
          }
        }
      },
      url: WP_API
    });
  }
  function displayResults(title, extract, image = undefined){
    var li = $('<li>');
    li.append($("<a>").attr("href", Wikipedia + "/wiki/" + title).attr("target", "_blank")
      .append($("<h1>").html(title))
      .append($("<p>").html("<br>"))
      .append(image ? $("<img>").attr("src", image) : "")
      .append($("<div>").html(extract)));
    articles.prepend(li.hide().delay().slideDown(284));
    if ( articles.children().length > 10 ) {
      $("#articles ul li:nth-child(n + 10)").delay().slideUp(284, () => $(this).remove());
    }
  }

});