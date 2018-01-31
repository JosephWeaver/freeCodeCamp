// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://use.fontawesome.com/releases/v5.0.6/js/all.js

$(()=>{

  console.clear();

  let $sessionInput = $("#sessionInput"),
      $incrSession = $("#incrSession"),
      $decrSession = $("#decrSession"),
      $breakInput = $("#breakInput"),
      $incrBreak = $("#incrBreak"),
      $decrBreak = $("#decrBreak"),
      $controls = $("#controls"),
      $options = $("#options"),
      $minutes = $("#minutes"),
      $seconds = $("#seconds"),
      $title = $("#title"),
      $start = $("#start"),
      $pause = $("#pause"),
      $reset = $("#reset"),
      breakLength = 5,
      breakMax = 10,
      breakMin = 1,
      breakTimeLeft = null,
      currentBreak, // interval + function
      currentSession,  // interval + function
      sessionLength = 30,
      sessionMax = 60,
      sessionMin = 5,
      speed = 1000,
      timeLeft = null,
      isBreaktime = false,
      isCountdown = false;

  init();

  function init(){
    $incrSession.click(()=>incrSession());
    $decrSession.click(()=>decrSession());
    $incrBreak.click(()=>incrBreak());
    $decrBreak.click(()=>decrBreak());
    $sessionInput.on("change", e=>updateSession(e.target.value));
    $breakInput.on("change", e=>updateBreak(e.target.value));
    $start.click(()=>{
      if (isBreaktime === false){ startSession(timeLeft); }
      if (isCountdown === false){ startBreak(breakTimeLeft); }
    });
    $pause.click(()=>pause());
    $reset.click(()=>reset());
  }

  function startSession(timeLeft = null){
    isCountdown = true;
    isBreaktime = false;
    $options.slideUp();
    $controls.removeClass().addClass("started");
    $title.fadeOut(43, function(){
      $(this).html("Session").fadeIn();
    });
    if (timeLeft === null){ timeLeft = sessionLength * 60; }
    currentSession = setInterval(() => {
      timeLeft--;
      let minLeft = Math.floor(timeLeft / 60);
      let secLeft = timeLeft - minLeft * 60;
      if (timeLeft < 1) {
        startBreak(breakLength);
        clearInterval(currentSession);
      }
      if (isCountdown === true){
        $minutes.html(minLeft);
        $seconds.html(secLeft < 10 ? "0" + secLeft : secLeft);
      }
    }, speed);
  }
  function startBreak(breakTimeLeft = null){
    isCountdown = false;
    isBreaktime = true;
    $title.fadeOut(43, function(){
      $(this).html("Break").fadeIn();
    });
    if (breakTimeLeft < 10) { breakTimeLeft = breakLength * 60; }
    currentBreak = setInterval(() => {
      breakTimeLeft--;
      let minLeft = Math.floor(breakTimeLeft / 60);
      let secLeft = breakTimeLeft - minLeft * 60;
      if (breakTimeLeft < 1) {
        startSession(sessionLength);
        clearInterval(currentBreak);
      }
      if (isBreaktime === true){
        $minutes.html(minLeft);
        $seconds.html(secLeft < 10 ? "0" + secLeft : secLeft);
      }
    }, speed);
  }
  function pause(){
    if (isCountdown === true) { clearInterval(currentSession); }
    if (isBreaktime === true) { clearInterval(currentBreak); }
    isCountdown = false;
    isBreaktime = false;
    $options.slideDown();
    $reset.slideDown();
    $controls.removeClass().addClass("paused");
    $title.fadeOut(43, function(){
      $(this).html("Paused").fadeIn();
    });
  }

  function reset(){
    isCountdown = false;
    isBreaktime = false;
    $options.slideDown();
    $reset.slideUp();
    if (currentSession){ clearInterval(currentSession); }
    if (currentBreak){ clearInterval(currentBreak); }
    $controls.removeClass().addClass("reset");
    $title.html("Ready?");
    updateMinutes(sessionLength);
    updateSeconds("00");
  }

  function incrSession(){
    reset();
    let num = Number($sessionInput.val());
    num = num + (num === sessionMax ? 0 : 1);
    sessionLength = num;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
  }
  function decrSession(){
    reset();
    let num = Number($sessionInput.val());
    num = num - (num === sessionMin ? 0 : 1);
    sessionLength = num;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
  }
  function incrBreak(){
    reset();
    let num = Number($breakInput.val());
    num = num + (num === breakMax ? 0 : 1);
    updateBreak(num);
  }
  function decrBreak(){
    reset();
    let num = Number($breakInput.val());
    num = num - (num === breakMin ? 0 : 1);
    updateBreak(num);
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