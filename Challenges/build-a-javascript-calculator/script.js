// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  const $answer = $("#answer"),
        $history = $("#history"),
        $button = $("button");

  let clicked,
      currAnswer = "",
      currType,
      currValue,
      histString = "",
      history = [],
      prevType,
      prevValue;

  init();

  function init(){
    console.clear();
    $button.on("mousedown", function(){
      $(this).addClass("pressed");
    }).on("mouseleave mouseup", function(){
      $(this).removeClass("pressed");
    }).on("click", e => click(e.target.value));
  } // complete
  function click(clicked){
    if (history.length > 0){
      prevValue = history[history.length - 1].value;
      prevType = getType(prevValue);
    } // set vars for previous type and value (if they exist)
    let currType = getType(clicked), currValue = clicked; // set current type and value
    history.push({ type: currType, value: currValue }); // push current val into history
    updateDisplay(history, currType, currValue, prevType, prevValue); // update display
  } // complete
  function clear(last = null){
    if (last === null){
      history = [];
    } else {
      // prevType = getType(history[history.length - 1].value);
      if (history.length > 0 && (prevType === "num" || prevType === "dec")) {
        while (prevType === "num" || prevType === "dec"){
          history.pop();
          prevType = getType(history[history.length - 1].value);
        }
      } else {
        history.pop();
      }
    }
    updateDisplay(history);
  } // complete
  function createAnswer(){
    let answerString = "";
    for (let i = 0, length = history.length; i < length; i++){
      answerString += history[i].value;
    }
    return answerString;
  } // complete
  function getType(item){
    switch(item){
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
  function updateDisplay(history, currType, currValue, prevType, prevValue){
    switch (currType){
      case "eq":
        console.log("eq (" + currValue + ") pressed");

        // for (let i = 0, length = history.length; i < length; i++){
        //   histString += history[i].value
        // }
        currAnswer = createAnswer(); // create answer from full history string
        console.log(currAnswer);

        // $history.text(histString)
        // $answer.text(currAnswer)

        // display answer and history
        break;
      case "ac":
        console.log("ac pressed");
        clear();
        break;
      case "ce":
        console.log("ce pressed");
        clear("entry");
        break;
      case "op":
        console.log("op (" + currValue + ") pressed");
        // console.log(history);
        if (prevType === "op"){
          history.pop().pop().push({ type: currType, value: currValue });
          console.log(history);
          historyString = $history.text() === "0" ? "" : $history.text();
          historyString += clicked;
          $history.text(historyString);
        } else {
          historyString = history[history.length].value;
        }
        break;
      case "dec":
        console.log("dec (" + currValue + ") pressed");
        break;
      case "num":
        console.log("num " + currValue + " pressed");
        for (let i = history.length; i > 0; i++){
          if (history[i].type === "num"){
            currAnswer = history[i].value + currAnswer;
          }
          break;
        }
        break;
    }
    console.log(histString, currAnswer);
  }
});