// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  console.clear()

  const $answer = $("#answer"),
        $history = $("#history"),
        $button = $("button")

  let clicked,
      currentAnswer = "",
      historyString = "",
      history = [
        // {
        //   type: "num",
        //   value: "3"
        // },
        // {
        //   type: "num",
        //   value: "3"
        // },
        // {
        //   type: "op",
        //   value: "*"
        // },
        // {
        //   type: "num",
        //   value: "3"
        // }
      ]

  init()

  function init(){
    $button
      .on("mousedown", function(){$(this).addClass("pressed")})
      .on("mouseleave mouseup", function(){$(this).removeClass("pressed")})
      .on("click", e => click(e.target.value))
  } // complete
  function click(clicked){
    if (history.length > 0){
      let historyLength = history.length,
          previousValue = history[historyLength].value,
          previousType = getType(previousValue)
      } // instantiate previous type and value (if they exist)
    history.push({ type: getType(clicked), value: clicked }) // push clicked into history
    updateDisplay(history) // update display with answer & history
  } // complete
  function clear(last = null){
    if (last){
      let previousType = getType(history[history.length].value)
      if (history.length > 0 && (previousType === "num" || previousType === "dec")) {
          while (previousType === "num" || previousType === "dec"){
            history.pop()
            previousType = getType(history[history.length].value)
          }
        } else {
          history.pop()
        }
    } else {
        history = []
    }
    updateDisplay(history)
  } // complete
  function getType(item){
    switch(item){
      case "c":
        return "c"
        break
      case "ce":
        return "ce"
        break
      case ".":
        return "dec"
        break
      case "=":
        return "eq"
        break
      default:
        return "num"
      case "+":
      case "-":
      case "x":
      case "/":
        return "op"
        break
    }
  } // complete
  // function makeHistory(history){
  //   // for (var i = 0, len = history.length; i < len; i++){
  //   //   switch(history[i].type){
  //   //     case "op":
  //   //       if (history[i - 1] > -1 && history[i - 1].type === "op"){ history.splice(history[i], 1); }
  //   //       historyString += " " + history[i].value;
  //   //       break
  //   //     case "num":
  //   //       historyString += history[i].value;
  //   //     default:
  //   //       break
  //   //   }
  //   // }
  //   // historyString = $history.text() === "0" ? "" : $history.text()
  //   // historyString += clicked
  //   // $history.text(historyString)
  // }
  function updateDisplay(history){
    let previousType
    switch (getType(history[history.length].value)){
      case "eq":
        // create answer from full history string
        // display answer and history
        break
      case "c":
        clear()
        break
      case "ce":
        clear("entry")
        break
      case "op":
        if (getType(history[history.length - 1].value) === "op"){
          currentAnswer = history[history.length].value
          history.pop().pop().push({ type: getType(currentAnswer), value: currentAnswer })
    // historyString = $history.text() === "0" ? "" : $history.text()
    // historyString += clicked
    // $history.text(historyString)
        } else {
          historyString = history[history.length].value
        }
        break
      case "num":

    }
  }
})