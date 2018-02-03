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
      $choose = $("#choose"),
      $choice = $("#choices div"),
      $play = $("#play"),
      $message = $play.children("h2"),
      side;

  init();

  function init(){
    $choose.show();
    $choice.click(e => {
      side = e.target.id;
      yourTurn(side);
      $(e.target).addClass("selected");
      $choose.hide();
      $play.css("display", "flex");
      startGame()
    });
  }
  function startGame(){
    let board = "";
    for (let i = 1; i <= 9; i++){
      board += "<div id='sq" + i + "'><span>Play<br>Here</span></div>\n";
    }
    $board.html(board);
    console.log(board);
  }
  function yourTurn(side){
    $message.html("<span class='" + side + "s'>" + cap(side) + "s</span> go first! Your turn!");
  }
  function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});