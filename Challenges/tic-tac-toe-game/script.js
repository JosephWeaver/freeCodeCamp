// https://codepen.io/JoeWeaver/pen/rJOJpz
// http://www.joeweaver.me/codepenassets/freecodecamp/tictactoegame/confetti.min.js

console.clear();

(()=>{
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 9], // u BOARD yet?
      confetti, // requisite celebration for game's winner
      gameOn = false, // resets to false/off on game reset
      opponent = "human", // a human or computer opponent?   // when computer works, remove "human"
      opponentChosen = true,  // reset to false upon reset   // when computer works, change to false
      score = { angels: 0, devils: 0 }, // reset on reload
      side1, // whichever side player 1 chooses to play as
      side2, // side left for player 2 or computer to play
      sideChosen = false, // resets to false on game reset
      sideToPlay = "angel", // angels are first by default
      winAchieved = false, // reset to false on game reset
      winCons = [
        [1, 2, 3], // top row
        [4, 5, 6], // middle row
        [7, 8, 9], // bottom row
        [1, 4, 7], // left column
        [2, 5, 8], // center column
        [3, 6, 9], // right column
        [1, 5, 9], // diag TL-BR
        [3, 5, 7]  // diag TR-BL
      ], // lists winning square combinations
      winner = false; // winning side that gets the glory!
  function changeSide(){
    let board = document.querySelector("#board"),
        message = document.querySelector("#messages");
    if (sideToPlay === "angel"){
      sideToPlay = "devil";
      message.innerHTML = "<span class='devils'>Devils</span> to play!";
      board.classList.remove("angelToPlay");
      board.classList.add("devilToPlay");
    } else {
      sideToPlay = "angel";
      message.innerHTML = "<span class='angels'>Angels</span> to play!";
      board.classList.remove("devilToPlay");
      board.classList.add("angelToPlay");
    }
  }
  function checkSquares(s){
    function getValue(id){
      return document.querySelector(id).textContent;
    }
    let val1 = getValue("#square" + s[0]),
        val2 = getValue("#square" + s[1]),
        val3 = getValue("#square" + s[2]);
    if (val1 === val2 && val2 === val3 && val3 !== ""){
      winAchieved = true;
      winner = val1;
      s.forEach(s => document.querySelector("#square" + s).classList.add("winning"));
      return true;
    } else {
      return false;
    }
  }
  function computerMove(){
    function empties(board){
      return board.filter(sq => sq != "😇" && sq != "😈");
    }
    // console.log("computer should move!");
  }
  function createGame(){
    let app = document.querySelector("#app"),
        board = "<div id='board' class='angelToPlay hidden'>",
        choices = "<div id='choices'>" +
        "  <h2 class='opponent'><del>Choose an Opponent:</del></h2>" +
        "  <div id='opponent' class='opponent'>" +
        "    <div class='choice chosen' id='human'>🙂</div>" +
        "    <div class='choice' id='computer'>💻</div>" +
        "  </div>" +
        "  <h2 class='side'>Choose Side to Play:</h2>" +
        "  <div id= 'side' class='side'>" +
        "    <div class='choice' id='angel'>😇</div>" +
        "    <div class='choice' id='devil'>😈</div>" +
        "  </div>" +
        "  <button id='start-game' class='disabled'>Start Game</button>" +
        "</div>",
        messages = "<h2 id='messages' class='hidden'><span class='angels'>Angels</span> always play first!</h2>",
        title = "<h1 id='title'>" +
        "          <span>Tic</span>" +
        "          <span class='icon'>😇</span>" +
        "          <span>Tac</span>" +
        "          <span class='icon'>😈</span>" +
        "          <span>Toe</span>" +
        "        </h1>";
    for (let i = 1; i <= 9; i++){
      board += "<div class='square' id='square" + i + "'></div>";
      if (i === 9){ board += "</div>"; }
    }
    app.innerHTML += title;
    app.innerHTML += choices;
    app.innerHTML += messages;
    app.innerHTML += board;
    initConfetti();
  }
  function detectMoves(){
    let squares = document.querySelectorAll(".square"),
        listener = function(){
          if (gameOn){
            board[this.id.slice(-1) - 1] = sideToPlay === "angel" ? "😇" : "😈";
            let square = document.querySelector("#" + this.id),
                tie = detectTie();
            if (!(square.classList.contains("played"))){
              square.classList.add("played");
              square.classList.add(sideToPlay === "angel" ? "angel" : "devil");
              square.innerHTML = sideToPlay === "angel" ? "😇" : "😈";
              changeSide();
              detectWin();
              if (winAchieved){
                gameOver();
              } else if (tie) {
                gameOver(tie);
              } else if (opponent === "computer"){
                computerMove();
              }
            }
          }
        };
    for (let i = 0; i < squares.length; i++){
      squares[i].addEventListener("click", listener);
    }
  }
  function detectTie(){
    return board.filter(sq => sq != "😇" && sq != "😈").length === 0;
  }
  function detectWin(){
    winCons.forEach(wc => checkSquares(wc));
  }
  function gameOver(isTie){
    let message = document.querySelector("#messages");
    if (winner){
      if (winner === "😇"){
        message.classList.add("angelsWin");
        message.innerHTML = "<span class='angels'>Angels</span> win!";
        score.angels++;
      } else if (winner === "😈") {
        message.classList.add("devilsWin");
        message.innerHTML = "<span class='devils'>Devils</span> win!";
        score.devils++;
      }
      partyTime("start");
    } else if (isTie){
      message.innerHTML = "Tie Game!";
    }
    message.innerHTML += " <a href='#' id='new-game'>New Game</a>";
    document.querySelector("#board").className = "";
    console.log("Angels: " + score.angels + " --- Devils: " + score.devils);
    gameOn = false;
    document.querySelector("#new-game").addEventListener("click", function(){
      newGame();
    });
  }
  function getChoices(){
    document.addEventListener("click", e => {
      let target = e.target.id,
          humanButton = document.querySelector("#human"),
          cmptrButton = document.querySelector("#computer"),
          angelButton = document.querySelector("#angel"),
          devilButton = document.querySelector("#devil"),
          startButton = document.querySelector("#start-game");
      switch (e.target.id){
        case "human":
          humanButton.classList.add("chosen");
          cmptrButton.classList.remove("chosen");
          opponentChosen = true;
          opponent = target;
          if(sideChosen && opponentChosen){
            startButton.classList.remove("disabled");
          }
          break;
        case "computer":
          humanButton.classList.remove("chosen");
          cmptrButton.classList.add("chosen");
          opponentChosen = true;
          opponent = target;
          if(sideChosen && opponentChosen){
            startButton.classList.remove("disabled");
          }
          break;
        case "angel":
          devilButton.classList.remove("chosen");
          angelButton.classList.add("chosen");
          sideChosen = true;
          side1 = "angel";
          side2 = "devil";
          if(sideChosen && opponentChosen){
            startButton.classList.remove("disabled");
          }
          break;
        case "devil":
          angelButton.classList.remove("chosen");
          devilButton.classList.add("chosen");
          sideChosen = true;
          side1 = "devil";
          side2 = "angel";
          if(sideChosen && opponentChosen){
            startButton.classList.remove("disabled");
          }
          break;
        case "start-game":
          if(sideChosen && opponentChosen){
            document.querySelector("#choices").classList.add("hidden");
            document.querySelector("#messages").classList.remove("hidden");
            document.querySelector("#board").classList.remove("hidden");
            gameOn = true;
          }
          break;
        case "new-game":
          newGame();
          break;
      }
    });
  }
  function initConfetti(){
    document.querySelector("body").innerHTML += "<canvas id='confetti'></canvas>";
    let settings = { max: 484, target: "confetti" };
    confetti = new ConfettiGenerator(settings);
  }
  function newGame(){
    board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    opponent = "human";    // when computer works, change to undefined
    opponentChosen = true; // when computer works, change to false
    side1 = undefined;
    side2 = undefined;
    sideChosen = false;
    sideToPlay = "angel";
    winAchieved = false;
    winner = false;
    document.querySelector("#app").innerHTML = "";
    createGame();
    getChoices();
    detectMoves();
    partyTime("stop");
  }
  function partyTime(a){
    if (a === "start")
      confetti.render();
    else if (a === "stop")
      confetti.clear();
  }
  function styleEmoji(){
    if (navigator.userAgent.indexOf('Mac OS X') != -1){
      document.body.classList.add("mac");
    }
  }
  styleEmoji();
  createGame();
  getChoices();
  detectMoves();
})();