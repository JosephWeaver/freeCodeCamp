// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js

$(function () {
    var articles = $('#articles ul');
    var input = $('input');
    var button = $('button');
    var toSearch = '';
    var searchUrl = 'https://en.wikipedia.org/w/api.php';

    var ajaxArticleData = function () {
        $.ajax({
            url: searchUrl,
            dataType: 'jsonp',
            data: {
                //main parameters
                action: 'query',
                format: 'json',

                generator: 'search',
                    //parameters for generator
                    gsrsearch: toSearch,
                    gsrnamespace: 0,
                    gsrlimit: 10,

                prop: 'extracts|pageimages',
                    //parameters for extracts
                    exchars: 200,
                    exlimit: 'max',
                    explaintext: true,
                    exintro: true,

                    //parameters for pageimages
                    piprop: 'thumbnail',
                    pilimit: 'max',
                    pithumbsize: 200
            },
            success: function (data) {
                var pages = data.query.pages;
                $.map(pages, function (page) {
                    var pageElement = $('<li>');

                    //get the article title
                    pageElement.append(
                      $('<a>').attr('href', 'http://en.wikipedia.org/wiki/' + page.title).append(
                        $('<h2>').text(page.title)
                      ).append(
                        $('<p>').text(page.extract)
                      )
                      .append(
                        page.thumbnail ? $('<img>').attr('width', 184).attr('src', page.thumbnail.source) : ""
                      )
                    );
                    $("body *:contains("+input.val()+")").html(function(_, html) {
                       return html.split(input.val()).join("<span class='smallcaps'>"+input.val()+"</span>");
                    });

                    //get the article image (if exists)


                    //get the article text
                    // pageElement.append($('<p>').text(page.extract));

                    // pageElement.append($('<hr>'));

                    articles.append(pageElement);
                });
            }
        });
    };
    input.on("load input", processSearchResults);
    button.click(processSearchResults);
    function processSearchResults(){
        articles.empty();
        toSearch = input.val();
        ajaxArticleData();
    }
});