// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

// $(()=>{

console.clear();

init();

function init(){
  const body = document.getElementsByTagName("body")[0];
  let Game = function(){
    this.addTitle = body => {
      let title = "<h1 id='title'>Tic-Tac-Toe</h1>";
      body.innerHTML += title;
    };
    this.addChoices = body => {
      let choices;
      choices =  "<div id='choose'>";
      choices += "  <h2>Choose opponent:</h2>";
      choices += "  <div id='opponent'>";
      choices += "    <div class='choice' id='human'>🙂</div>";
      choices += "    <div class='choice' id='computer'>💻</div>";
      choices += "  </div>";
      choices += "  <div id='side'>";
      choices += "    <div class='choice' id='angel'>😇</div>";
      choices += "    <div class='choice' id='devil'>😈</div>";
      choices += "  </div>";
      choices += "</div>";
      body.innerHTML += choices;
    };
    this.addBoard = body => {
      let gameBoard;
      // gameBoard =  "<div id='play'>";
      // gameBoard += "  <h2>Who goes first?</h2>";
      gameBoard += "  <div id='board'>";
      for (let i = 1; i <= 9; i++){
        gameBoard += "    <div class='square' id='square" + i + "'></div>";
      }
      gameBoard += "  </div>";
      // gameBoard += "</div>";
      body.innerHTML += gameBoard;
    };
  },
      game = new Game();

  game.addTitle(body);
  game.addChoices(body);
  game.addBoard(body);





  // $("body").css("display", "flex").hide().fadeIn(); // show bodyy
  // $("body").dblclick(() => resetGame()); // hidden reset function
  // $choice.click(e => chooseSide(e)); // player chooses their side
}

// let angel = "😇", // angel (X)
//     devil = "😈", // devil (O)
//     $angel = $("#angel"),
//     $board = $("#board"),
//     $devil = $("#devil"),
//     boardState = {
//       square1: "empty",
//       square2: "empty",
//       square3: "empty",
//       square4: "empty",
//       square5: "empty",
//       square6: "empty",
//       square7: "empty",
//       square8: "empty",
//       square9: "empty"
//     },
//     $choice = $(".choice"),
//     $choose = $("#choose"),
//     $message = $("#play h2"),
//     $play = $("#play"),
//     $square = $(".square"),
//     player,
//     side1,
//     side2,
//     winningCombos = [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 6, 9],
//       [1, 5, 9],
//       [3, 5, 7]
//     ];

// });

//   function chooseSide(e){
//     side1 = e.target.id;
//     whoGoesFirst();
//     $(e.target).addClass("selected");
//     $choose.fadeOut(function(){
//       $play.css("display", "flex").hide().fadeIn();
//     });
//     startGame();
//   }
//   function checkSquare(num){
//     return boardState["square" + num];
//   }
//   function chooseSquare(){
//     // computer chooses which square to play
//   }
//   function computerPlay(){
//     // computer plays move
//   }
//   function playMove(player, side, square){
//     if (!$("#" + square).hasClass("played")){
//       $("#" + square).html(side1 == "angel" ? angel : devil)
//         .addClass(side1 == "angel" ? "angel" : "devil")
//         .addClass("played");
//       if(someoneWon()){
//         winMessage();
//       } else {
//         turnChange();
//       }
//     }
//   }
//   function playSquare(num, side){
//     boardState["square" + num] = side.toString();
//   }
//   function resetGame(){
//     $square.html("").removeClass("played angel devil");
//     side1 = undefined;
//     side2 = undefined;
//     boardState = {
//       square1: "empty",
//       square2: "empty",
//       square3: "empty",
//       square4: "empty",
//       square5: "empty",
//       square6: "empty",
//       square7: "empty",
//       square8: "empty",
//       square9: "empty"
//     };
//   }
//   function someoneWon(){
//     let combos = [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 6, 9],
//       [1, 5, 9],
//       [3, 5, 7]
//     ];
//     if ($("#square1").text() === $("#square2").text() && $("#square2").text() === $("#square3").text() && $("#square3").text() !== "empty"){
//       return true;
//     }

//     // check win condition
//     return false;
//   }
//   function startGame(){
//     $board.fadeIn();
//     $square.on("click", function(e){
//       playMove(player, devil, e.target.id);
//     });
//   }
//   function turnChange(){
//     side1 = side1 == "angel" ? "devil" : "angel";
//   }
//   function whoGoesFirst(){
//     player = side1 == "angel" ? angel : devil;
//     $message.html(side1 == "angel" ? "<span class='angels'>Angels</span> first &ndash; your turn!" : "Sorry, <span class='angels'>Angels</span> always go first!");
//     computerPlay();
//   }
//   function winMessage(){
//     console.log("win!");
//     // show win message
//   }

// playSquare(1, "angel");
// console.log(checkSquare(1));