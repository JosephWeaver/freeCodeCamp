// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  console.clear()

  const $answer = $("#answer"),
        $history = $("#history"),
        $button = $("button")

  let clicked,
      currNumber = "",
      historyString = "",
      history = [
        {
          type: "number",
          value: "3"
        },
        {
          type: "number",
          value: "3"
        },
        {
          type: "operator",
          value: "*"
        },
        {
          type: "number",
          value: "3"
        }
      ]

  init()
  console.log(history)

  function init(){
    $button
      .on("mousedown", function(){$(this).addClass("pressed")})
      .on("mouseleave mouseup", function(){$(this).removeClass("pressed")})
      .on("click", e => click(e.target.value))
  } // complete
  function click(clicked){
    // getType(clicked)

    for(var i = 0, len = history.length; i < len; i++){
      makeHistory(history[i])
    }

    //     console.log(history)

    //     if (getType(clicked) === "number"){
    //       args[args.length] = args[args.length] + clicked
    //       types.push(getType(clicked))
    //     } else {
    //       args.push(clicked)
    //     }
    //     // // types.push(getType(clicked))
    //     // // args.push(clicked)
    //     // // updateDisplay(clicked)
    //     console.log(args, types)
  }
  function clear(which){
    switch(which){
      case "all":
        history = []
        currNumber = "0"
        historyString = "0"
        displayAnswer(history)
        makeHistory(history)
        break
      case "last":
        history[history.length].type === "operator" ? history.pop() :
        // currNumber = "0"
        displayAnswer(history)
        makeHistory(history)
        break
    }
  }
  function getType(item){
    switch(item.type){
      case "+":
      case "-":
      case "x":
      case "/":
        return "operator"
        break
      case "ce":
      case "c":
        return "clear"
        break
      case ".":
        return "decimal"
        break
      case "=":
        return "equals"
        break
      default:
        return "number"
    }
  } // complete
  function makeHistory(history){
    for (var i = 0, len = history.length; i < len; i++){
      switch(history[i].type){
        case "operator":
          if (history[i - 1] > -1 && history[i - 1].type === "operator"){ history.splice(history[i], 1); }
          historyString += " " + history[i].value;
          break
        case "number":
          historyString += history[i].value;
        default:
          break
      }
    }

    // historyString = $history.text() === "0" ? "" : $history.text()
    // historyString += clicked
    $history.text(historyString)
  }
  function showAnswer(clicked){
    $answer.text(type === "number" ? $answer.text() + clicked : clicked)
  }
  function updateDisplay(clicked){
    showAnswer(clicked)
    makeHistory(clicked)
  }

})