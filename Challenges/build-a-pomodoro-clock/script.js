// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://use.fontawesome.com/releases/v5.0.6/js/all.js

$(()=>{

  console.clear();

  let $sessionInput = $("#sessionInput"),
      // $incrSession = $("#incrSession"),
      // $decrSession = $("#decrSession"),
      // $breakInput = $("#breakInput"),
      // $incrBreak = $("#incrBreak"),
      // $decrBreak = $("#decrBreak"),
      // $options = $(".options"),
      $minutes = $("#minutes"),
      $seconds = $("#seconds"),
      // $clock = $("#clock"),
      $start = $("#start"),
      $pause = $("#pause"),
      $reset = $("#reset"),
      currentSession,
      // sessionMax = 60,
      sessionLength = 30,
      // sessionMin = 5,
      // breakMax = 10,
      breakLength = 5,
      // breakMin = 1,
      currMinutes,
      currSeconds,
      // fullMinutes,
      // fullSeconds,
      // isBreakTime,
      sessionCountingDown = false,
      breakCountingDown = false;

  init();

  function init(){
    // $incrSession.click(()=>incrSession());
    // $decrSession.click(()=>decrSession());
    // $incrBreak.click(()=>incrBreak());
    // $decrBreak.click(()=>decrBreak());
    // $sessionInput.on("change", e=>updateSession(e.target.value));
    // $breakInput.on("change", e=>updateBreak(e.target.value));
    $start.click(()=>{
      sessionCountingDown = true;
      startSession(sessionLength);
      $start.hide(); $pause.show(); $reset.hide();
      // $clock.removeClass("inactive");
      // $options.addClass("inactive");
    });
    $pause.click(()=>{
      sessionCountingDown = false;
      $start.show(); $pause.hide(); $reset.show();
      // pauseSession(sessionLength);
      // $clock.addClass("inactive");
      // $options.removeClass("inactive");
    });
    $reset.click(()=>{
      clearInterval(currentSession);
      $start.show(); $pause.hide(); $reset.hide();
      // $clock.removeClass("inactive");
      // $options.addClass("inactive");
    });
  }
  function incrSession(){
    let num = Number($sessionInput.val());
    num = num + (num === sessionMax ? 0 : 1);
    sessionLength = num;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
  }
  function decrSession(){
    let num = Number($sessionInput.val());
    num = num - (num === sessionMin ? 0 : 1);
    sessionLength = num;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
  }
  function incrBreak(){
    let num = Number($breakInput.val());
    num = num + (num === breakMax ? 0 : 1);
    updateBreak(num);
  }
  function decrBreak(){
    let num = Number($breakInput.val());
    num = num - (num === breakMin ? 0 : 1);
    updateBreak(num);
  }

  // startSession(sessionLength);
  function startSession(sessionLength){
    let deadline = new Date().getTime() + sessionLength * 60000,
        currentSession = setInterval(()=>{
          let now = new Date().getTime(),
              timeLeft = deadline - now,
              minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
              secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
          // console.log(minutesLeft, secondsLeft);
          if (sessionCountingDown === true){
            console.log(sessionCountingDown);
            document.getElementById("minutes").innerHTML = minutesLeft < 10 ? + "0" + minutesLeft : minutesLeft;
            document.getElementById("seconds").innerHTML = secondsLeft < 10 ? + "0" + secondsLeft : secondsLeft;
          }
          if (timeLeft < 0) {
            clearInterval(currentSession);
            document.getElementById("minutes").innerHTML = "EXPIRED";
          }
        }, 1000);
  }
  function resetSession(){
    clearInterval(currentSession);
    startSession(sessionLength);
  }
  function updateMinutes(num){
    $minutes.text(num);
  }
  function updateSeconds(num){
    $seconds.text(num);
  }
  function updateSession(num){
    $sessionInput.val(num < sessionMin ? sessionMin : num > sessionMax ? sessionMax : num).blur();
  }
  function updateBreak(num){
    $breakInput.val(num < breakMin ? breakMin : num > breakMax ? breakMax : num).blur();
  }

});