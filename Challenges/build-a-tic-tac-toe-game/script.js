// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  console.clear();

  let angel = "😇", // angel (X)
      devil = "😈", // devil (O)
      $board = $("#board"),
      $choice = $(".choice"),
      $choose = $("#choose"),
      $message = $("#play h2"),
      $play = $("#play"),
      $square = $("#board div"),
      side, // player's choice
      winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ];

  init();

  function init(){
    $("body").css("display", "flex").hide().fadeIn(); // show bodyy
    $("body").dblclick(() => resetGame()); // hidden reset function
    $choice.click(e => makeChoice(e)); // player chooses their side
  }
  function makeChoice(e){
    side = e.target.id;
    yourTurn(side);
    $(e.target).addClass("selected");
    $choose.fadeOut(function(){
      $play.css("display", "flex").hide().fadeIn();
    });
    startGame();
  }
  function startGame(){
    let board = "";
    $board.fadeIn();
    playMove();
  }
  function playMove(){
    $square.on("click", function(e){
      if (!$(this).hasClass("played")){
        $(this).html(side == "angel" ? angel : devil)
          .addClass(side == "angel" ? "angel" : "devil")
          .addClass("played");
        turnChange();
      }
    });
  }
  function turnChange(){
    side = side == "angel" ? "devil" : "angel";
  }
  function yourTurn(side){
    if (side == angel){
      $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> go first: Your turn!");
    } else {
      $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> go first: Your turn!");
      computerPlayMove
    }
  }
  function resetGame(){
    $square.html("<span>Play<br>Here</span>").removeClass("played angel devil");
    side = undefined;
  }
  function resetAll(){
    $square.html("<span>Play<br>Here</span>").removeClass("played angel devil");
    side = undefined;
  }
  function cap(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});