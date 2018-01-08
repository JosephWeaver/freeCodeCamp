// OPEN CONSOLE

console.clear();
$(() => {
   $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      // url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Kylo%20Ren&format=json&srprop=snippet&prop=info&srlimit=10&prop=extracts&exintro=&explaintext=&titles=",
     // url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=Kylo%20Ren&callback=?",
      dataType: "jsonp",
      // data: {
      //   action: "query",
      //   format: "json",
      //   list: "search",
      //   utf8: 1,
      //   srsearch: input.val(),
      //   origin: "*",
      //   srlimit: 5
      // },
      data: {
        action: "query",
        exchars: 455,
        exintro: true,
        exlimit: "max",
        explaintext: true,
        format: "json",
        generator: "search",
        gsrlimit: 15,
        gsrnamespace: 0,
        gsrsearch: "\"Kylo Ren\"",
        pilimit: 10,
        piprop: "thumbnail",
        pithumbsize: 256,
        prop: "extracts|pageimages|revisions",
      // },
      // data: {
        list: "search",
        srsearch: "Kylo Ren",
        srlimit: 10,
        rvprop: "content"


      },
      success: data => {
        // data.query.search.reverse();
        // var results = data.query.pages;
        // var results = data.query.search.reverse();
        // $(results.get()).each(result => {
        var results = data.query.search;
        // console.log(results);

        results.forEach(element => {
                    $.ajax({
            url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exchars=455&exintro=&titles=" + element.title,
            dataType: "jsonp",
            success: data => {
              var keys = [];
              for (var l in data.query.pages) {
                if (data.query.pages.hasOwnProperty(l)){
                  keys.push(l);
                }
              }
              console.log(data.query.pages[keys[0]].title);
              console.log(data.query.pages[keys[0]].extract);
            }
          });

//           // console.log(result)
//           $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&titles=" + element.title, function(asdf){
//             alert(asdf.extract);

          });





        $.map(results, result => {
          // console.log(result.title);
          // console.log(result.extract);


          //---------------------------------

//           $.ajax({
//       // url: "https://en.wikipedia.org/w/api.php",
//       // url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srprop=snippet&prop=extracts|pageimages&exintro=&explaintext=&titles=&srlimit=10&srwhat=Kylo%20Ren",
//      url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + result.title,
//       dataType: "jsonp",
//       // data: {
//       //   action: "query",
//       //   format: "json",
//       //   list: "search",
//       //   utf8: 1,
//       //   srsearch: input.val(),
//       //   origin: "*",
//       //   srlimit: 5
//       // },
//       data: {
// //         action: "query",
// //         // exchars: 455,
// //         // exintro: true,
// //         // exlimit: "max",
// //         // explaintext: true,
// //         format: "json",
// //         // generator: "search",
// //         // gsrlimit: 15,
// //         // gsrnamespace: 0,
// //         // gsrsearch: terms,
// //         pilimit: 10,
// //         piprop: "thumbnail",
// //         pithumbsize: 256,
// //         // prop: "extracts|pageimages"
// //       // },
// //       // data: {
// //         list: "search",
// //         srsearch: "Kylo Ren",
// //         srlimit: 10,
// //         prop: "revisions|pageimages",
// //         rvprop: "content"


//       },
//       success: data => {
//         // var results = data.query.pages;
//         // $(results.get()).each(result => {
//         $.map(data.query.pages, result => {
//           console.log(result.extract);

//           // if highlight didn't maintain proper case, split() and join() on input.val() would work
// //           var titleMatch = result.title.toLowerCase().indexOf(input.val().toLowerCase()),
// //               titleHighlight = titleMatch !== -1 ?                                                   // if a string match exists, highlight it
// //                 result.title.substr(0, titleMatch) + "<span class='searchmatch'>" +                  // before match start + start searchmatch
// //                 result.title.substr(titleMatch, input.val().length()) + "</span>" +                  // part which matches + ends searchmatch
// //                 result.title.substr(titleMatch + input.val().length(), result.title.length()) : "",  // after match ends + closes out ternary
// //               descrMatch = result.extract.toLowerCase().indexOf(input.val().toLowerCase()),
// //               descrHighlight = descrMatch !== -1 ?                                                       // if a string match exists, highlight it
// //                 result.extract.substr(0, descrMatch) + "<span class='searchmatch'>" +                    // before match start + start searchmatch
// //                 result.extract.substr(descrMatch, input.val().length()) + "</span>" +                    // part which matches + ends searchmatch
// //                 result.extract.substr(descrMatch + input.val().length(), result.extract.length()) : "";  // after match ends + closes out ternary

// //           console.log("inputVal: " + input.val());
// //           console.log("title: " + result.title);
// //           console.log("extract: " + result.extract);
// //           console.log("highlight: " + titleHighlight);
// //           console.log("descr: " + descrHighlight);

// //           var title = result.title.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>"),
// //               descr = result.snippet.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>");
// //           var li = $('<li>');
// //           li.append($("<a>").attr("href", Wikipedia + "/wiki/" + result.title).attr("target", "_blank")
// //             .append($("<h2>").html(title))
// //             .append(result.thumbnail ? $("<img>").attr("width", 128).attr("src", result.thumbnail.source) : "")
// //             .append($("<p>").html(descr)));

// //           // $(li + ":contains(" + input.val() + ")").html((_, html) => {
// //           //   return html.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>");
// //           // });
// //           articles.empty().append(li).hide().fadeIn(284);

//           //           console.log("original title: "+result.title);
//           //           console.extract("original title: "+result.extract);
//           //           var newTitle = result.title.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");

//           //           var newExtract = result.extract.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");
//           //           console.log("new title: "+newTitle);
//           //           console.extract("new title: "+newExtract);

//           // $("body *:contains("+input.val()+")").html(function(_, html) {
//           //   return html.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");
//           // });
//           // var el = $('<li>');
//           // el.append($("<a>").attr("href",Wikipedia+"/wiki/"+result.title).attr("target", "_blank").append($("<h2>").text(result.title)).append(result.thumbnail ? $("<img>").attr("width", 128).attr("src", result.thumbnail.source) : "").append($("<p>").text(result.extract)));
//           // articles.empty().append(el).hide().fadeIn(284);
//         });
//       }
//     });

          //-------------------------------------

          // if highlight didn't maintain proper case, split() and join() on input.val() would work
//           var titleMatch = result.title.toLowerCase().indexOf(input.val().toLowerCase()),
//               titleHighlight = titleMatch !== -1 ?                                                   // if a string match exists, highlight it
//                 result.title.substr(0, titleMatch) + "<span class='searchmatch'>" +                  // before match start + start searchmatch
//                 result.title.substr(titleMatch, input.val().length()) + "</span>" +                  // part which matches + ends searchmatch
//                 result.title.substr(titleMatch + input.val().length(), result.title.length()) : "",  // after match ends + closes out ternary
//               descrMatch = result.extract.toLowerCase().indexOf(input.val().toLowerCase()),
//               descrHighlight = descrMatch !== -1 ?                                                       // if a string match exists, highlight it
//                 result.extract.substr(0, descrMatch) + "<span class='searchmatch'>" +                    // before match start + start searchmatch
//                 result.extract.substr(descrMatch, input.val().length()) + "</span>" +                    // part which matches + ends searchmatch
//                 result.extract.substr(descrMatch + input.val().length(), result.extract.length()) : "";  // after match ends + closes out ternary

//           console.log("inputVal: " + input.val());
//           console.log("title: " + result.title);
//           console.log("extract: " + result.extract);
//           console.log("highlight: " + titleHighlight);
//           console.log("descr: " + descrHighlight);

//           var title = result.title.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>"),
//               descr = result.snippet.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>");
//           var li = $('<li>');
//           li.append($("<a>").attr("href", Wikipedia + "/wiki/" + result.title).attr("target", "_blank")
//             .append($("<h2>").html(title))
//             .append(result.thumbnail ? $("<img>").attr("width", 128).attr("src", result.thumbnail.source) : "")
//             .append($("<p>").html(descr)));

//           // $(li + ":contains(" + input.val() + ")").html((_, html) => {
//           //   return html.split(input.val()).join("<span class='searchmatch'>" + input.val() + "</span>");
//           // });
//           articles.empty().append(li).hide().fadeIn(284);

          //           console.log("original title: "+result.title);
          //           console.extract("original title: "+result.extract);
          //           var newTitle = result.title.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");

          //           var newExtract = result.extract.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");
          //           console.log("new title: "+newTitle);
          //           console.extract("new title: "+newExtract);

          // $("body *:contains("+input.val()+")").html(function(_, html) {
          //   return html.split(input.val()).join("<span class='searchmatch'>"+input.val()+"</span>");
          // });
          // var el = $('<li>');
          // el.append($("<a>").attr("href",Wikipedia+"/wiki/"+result.title).attr("target", "_blank").append($("<h2>").text(result.title)).append(result.thumbnail ? $("<img>").attr("width", 128).attr("src", result.thumbnail.source) : "").append($("<p>").text(result.extract)));
          // articles.empty().append(el).hide().fadeIn(284);
        });
      }
    });
});