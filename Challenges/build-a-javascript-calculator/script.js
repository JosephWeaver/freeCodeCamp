// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  // constants
  const answer =  $("#answer"),
        history = $("#history"),
        button = $("button")

  // variables
  let clicked,
      last,
      type

  // button click function
  button.on("click", e => {

    // cache event target value
    clicked = e.target.value

    // discern clicked button type
    switch(clicked){
      case "+":
      case "-":
      case "x":
      case "/": type = "operator"; break;
      case "e":
      case "c": type = "clear";    break;
      case ".": type = "decimal";  break;
      case "=": type = "equals";   break;
      default:  type = "number";   break;
    }

    // change answer display
    answer.text(clicked)

    // change history display
    history.text(
      (history.text() === "0" ? "" : history.text()) +
      (type !== "number" ? " " : "") + clicked
    )

  })

})