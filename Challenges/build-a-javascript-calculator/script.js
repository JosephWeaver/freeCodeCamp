// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  let history = [];

  init();

  function init(){
    $("button").on("mousedown", function(){
      $(this).addClass("pressed");
    }).on("mouseleave mouseup", function(){
      $(this).removeClass("pressed");
    }).on("click", e => handleClick(e));
  }
  function clearAll(){
    history = [];
    updateDisplay();
  }
  function clearLast(){
    switch(getType(history[history.length-1])){
      case "op":
        history.pop();
        break;
      case "num":
      case "dec":
        for (let i = history.length - 1; i >= 0; i--){
          let type = getType(history[i]);
          if (type === "num" || type === "dec"){
            history.pop();
          } else {
            break;
          }
        }
        break;
    }
    history.pop();
  }
  function getType(value){
    switch(value){
      case "ac": return "ac";
      case "ce": return "ce";
      case ".": return "dec";
      case "=": return "eq" ;
      case "+":
      case "-":
      case "*":
      case "/": return "op";
      default: return "num";
    }
  }
  function handleClick(e){
    switch(getType(e.target.value)){
      case "ac": clearAll(); break;
      case "ce": clearLast(); break;
      case "op": processOperator(e.target.value); break;
      case "eq": updateDisplay(); break;
      default: history.push(e.target.value); break;
    }
    updateHistory();
  }
  function processOperator(value){
    switch(getType(history[history.length - 1])){
      case "op":
        history.pop();
        history.push(value);
        break;
      case "num":
      case "dec":
        history.push(value);
    }
  }
  function updateDisplay(){
    updateHistory();
    updateAnswer();
  }
  function updateHistory(){
    let historyString = "";
    for (let i = 0, len = history.length, symbol; i < len; i++){
      symbol = history[i] == "*" ? "&times;" : history[i];
      symbol = history[i] == "/" ? "&div;" : history[i];
      historyString += `<span class="${getType(history[i])}">${symbol}</span>`;
    }
    $("#history").html(historyString || 0);
  }
  function updateAnswer(){
    let answerString = "";
    for (let i = 0, len = history.length; i < len; i++){
      answerString += history[i];
    }
    $("#answer").text(eval(answerString) || 0);
  }

});