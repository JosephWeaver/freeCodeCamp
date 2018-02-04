// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  console.clear();

  let angel = "😇", // angel (X)
      devil = "😈", // devil (O)
      $board = $("#board"),
      boardState = {
        square1: "empty",
        square2: "empty",
        square3: "empty",
        square4: "empty",
        square5: "empty",
        square6: "empty",
        square7: "empty",
        square8: "empty",
        square9: "empty"
      },
      $choice = $(".choice"),
      $choose = $("#choose"),
      $message = $("#play h2"),
      $play = $("#play"),
      $square = $("#board div"),
      player1side, // angel / devil
      player2side, // devil / angel
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
    whoseTurn(side);
    $(e.target).addClass("selected");
    $choose.fadeOut(function(){
      $play.css("display", "flex").hide().fadeIn();
    });
    startGame();
  }
  function startGame(){
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
  function whoseTurn(side){
    if (side == angel){
      $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> first &ndash; Your turn!");
    } else {
      $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> always go first! Hehe");
      // computerPlayMove();
    }
  }
  function resetGame(){
    $square.html("<span>Play<br>Here</span>").removeClass("played angel devil");
    player1side = undefined;
  }
  function resetAll(){
    $square.html("<span>Play<br>Here</span>").removeClass("played angel devil");
    player1side = undefined;
  }
  function cap(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});