// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  let clicked,
      currAnswer = "",
      currType,
      currValue,
      history = [],
      histString = "",
      prevType,
      prevValue;

  init();

  function init(){
    console.clear();
    $("button").on("mousedown", function(){
      $(this).addClass("pressed");
    }).on("mouseleave mouseup", function(){
      $(this).removeClass("pressed");
    }).on("click", e => click(e.target.value));
  } // complete

//   when button is pressed
//       switch type of clicked item
//           case ac
//               empty history array
//               update display [
//                   display histString in #history
//                   display answer string in #answer
//               ]
//           case ce
//               switch type of last item in history array
//                   should never be ac
//                   should never be ce
//                   case op
//                       pop history array
//                   should never be eq
//                   case num || dec
//                       while type of last item in history array is num || dec
//                           pop last item
//               update display [
//                   display histString in #history
//                   display answer string in #answer
//               ]
//           case op
//               switch type of last item in history array
//                   should never be ac
//                   should never be ce
//                   case op
//                       pop history array
//                       push clicked into history array
//                   should never be eq
//                   case num || dec
//                       push clicked into history array
//               update display [
//                   display histString in #history
//                   display answer string in #answer
//               ]
//           case eq
//               get histString by formatting history array
//               evaluate currAnswer from histString
//               update display [
//                   display histString in #history
//                   display currAnswer string in #answer
//               ]
//               empty history array
//           case num || dec
//               push clicked into history array
//               update display [
//                   display histString in #history
//                   display answer string in #answer
//               ]

  function click(clicked){
    if (history.length > 0){
      prevValue = history[history.length - 1].value;
      prevType = getType(prevValue);
    }
    currValue = clicked;
    currType = getType(currValue);
    history.push({ type: currType, value: currValue });
    updateDisplay();
  } // complete
  function clear(last = null){
    if (last === null){
      history = [];
    } else {
      if (history.length > 0 && (prevType === "num" || prevType === "dec")){
        while (prevType === "num" || prevType === "dec"){
          history.pop();
          prevType = getType(history[history.length - 1].value);
        }
      } else {
        history.pop();
      }
    }
  } // complete
  function evaluateAnswer(histString){
    currAnswer = eval(histString);
    return currAnswer;
  } // complete
  function formatHistory(history){
    history.pop(); // remove "=" from end
    histString = ""; // reset to blank
    for (let i = 0, length = history.length; i < length; i++){
      histString += formatValue(history[i].value, history[i].type, history[i - 1].type);
    }
    return histString;
  }
  function formatValue(value, type, prevType){
    switch (type){
      case "op": return " " + value;
      case "num":
      case "dec":
        return prevType === "num" || prevType === "dec" ? value : " " + value;
    }
  }
  function getType(value){
    switch(value){
      case "ac":
        return "ac";
      case "ce":
        return "ce";
      case ".":
        return "dec";
      case "=":
        return "eq" ;
      default:
        return "num";
      case "+":
      case "-":
      case "x":
      case "/":
        return "op";
    }
  } // complete
  function updateDisplay(){
    switch (currType){
      case "eq":
        console.log("eq (" + currValue + ") pressed");
        break;
      case "ac":
        console.log("ac pressed");
        break;
      case "ce":
        console.log("ce pressed");
        break;
      case "op":
        console.log("op (" + currValue + ") pressed");
        if (prevType === "op"){
          history.pop().pop().push({ type: currType, value: currValue });
          console.log(history);
          histString = $("#history").text() === "0" ? "" : $("#history").text();
          histString += clicked;
          $("#history").text(histString);
        } else {
          histString = history[history.length].value;
        }
        break;
      case "dec":
        console.log("dec (" + currValue + ") pressed");
        break;
      case "num":
        console.log("num " + currValue + " pressed");
        break;
    }
    histString = formatHistory(history);
    currAnswer = evaluateAnswer(histString);
    $("#history").text(histString);
    $("#answer").text(eval(currAnswer));
  }
});