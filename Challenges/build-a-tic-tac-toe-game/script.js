// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  console.clear();

  let angel = "😇", // good girlz
      devil = "😈", // bad boyz
      $board = $("#board"),
      $choice = $(".choice"),
      $choose = $("#choose"),
      $message = $("#play h2"),
      $play = $("#play"),
      $square = $("#board div"),
      side, // player to choose
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
    $("body").css("display", "flex").hide().fadeIn();
    $choice.click(e => makeChoice(e));
    $("body").dblclick(()=>resetGame());
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
    $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> go first: Your turn!");
  }
  function resetGame(){
    $square.html("<span>Play<br>Here</span>").removeClass("played angel devil");
  }
  function resetAll(){
    $square.html("<span>Play<br>Here</span>").removeClass("played angel devil");
  }
  function cap(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});