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
      $square = $(".square"),
      side1,
      side2,
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
    $choice.click(e => chooseSide(e)); // player chooses their side
  }
  function checkSquare(num){
    return boardState["square" + num];
  }

  playSquare(1, "angel");
  console.log(checkSquare(1));


  function chooseSide(e){
    side1 = e.target.id;
    whoseTurn();
    $(e.target).addClass("selected");
    $choose.fadeOut(function(){
      $play.css("display", "flex").hide().fadeIn();
    });
    startGame();
  }
  function computerPlay(){
    // computer plays move
  }
  function someoneWon(){
    // check win condition
    return false;
  }
  function chooseSquare(){
    // computer chooses which square to play
  }

  $square.on("click", function(e){
    playMove(player1, "angel", );
  });

  function playMove(player, side, square){
    if (!$(this).hasClass("played")){
      $(this).html(side1 == "angel" ? angel : devil)
        .addClass(side1 == "angel" ? "angel" : "devil")
        .addClass("played");
      if(someoneWon()){
        winMessage();
      } else {
        turnChange();
      }
    }
  }
  function playSquare(num, side){
    boardState["square" + num] = side.toString();
  }
  function resetGame(){
    $square.html("").removeClass("played angel devil");
    side1 = undefined;
    side2 = undefined;
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
    };
  }
  function startGame(){
    $board.fadeIn();
    playMove();
  }
  function turnChange(){
    side1 = side1 == "angel" ? "devil" : "angel";
  }
  function whoseTurn(){
    $message.html(side1 == "angel" ? "<span class='angels'>Angels</span> first &ndash; your turn!" : "Sorry, <span class='angels'>Angels</span> always go first!");
    computerPlay();
  }
  function winMessage(){
    // show win message
  }

});