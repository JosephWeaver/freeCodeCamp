// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  console.clear();

  let winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ],
      $board = $("#board"),
      $square = $("#board div"),
      $choose = $("#choose"),
      $choice = $("#choices div"),
      $play = $("#play"),
      $message = $play.children("h2"),
      angel = "😇",
      devil = "😈",
      side;

  init();

  function init(){
    $choose.fadeIn();
    $choice.click(e => {
      side = e.target.id;
      yourTurn(side);
      $(e.target).addClass("selected");
      $choose.fadeOut(function(){
        $play.css("display", "flex").hide().fadeIn();
      });
      startGame()
    });
  }
  function startGame(){
    let board = "";
    $board.fadeIn();
    $square.on("click", function(e){
      $(this).html(side == "angel" ? angel : devil).addClass("played");
    });
  }
  function playMove(){
    $square.click
  }
  function yourTurn(side){
    $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> go first: Your turn!");
  }
  function resetGame(){
    $square.html("<span>Play<br>Here</span>").removeClass("played");
  }
  function cap(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});