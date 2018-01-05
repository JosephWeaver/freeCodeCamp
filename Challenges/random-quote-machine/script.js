// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js

// twitter
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

// quotes
var quotes = [];
$(function(){
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=28&callback=", function(data) {
    data.forEach(function(quote){
      quotes.push(quote);
    });
  });
  $("#new").on("click",function() {
    var curr = Math.floor(Math.random() * quotes.length);
    var quote = quotes[curr].content.slice(3, quotes[curr].content.length - 5).trim();
    var author = quotes[curr].title;
    $("#quote span").html(quote);
    $("#author span").html(author);
    $("#tweet").attr("href", "http://www.twitter.com/intent/tweet?text=%22" + encodeURIComponent(quote) + "%22%20%2D%20" + author + " %23freeCodeCamp");
  });
});