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
      currentBreak,
      currentSession,
      sessionLength = 30,
      sessionMax = 60,
      sessionMin = 5,
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
    $start.click(()=>startSession(sessionLength));
    $pause.click(()=>pauseSession());
    $reset.click(()=>resetSession());
  }
  function incrSession(){
    resetSession();
    let num = Number($sessionInput.val());
    num = num + (num === sessionMax ? 0 : 1);
    sessionLength = num;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
  }
  function decrSession(){
    resetSession();
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
  function startSession(sessionLength){
    isCountdown = true;
    isBreaktime = false;
    $options.slideUp();
    $controls.removeClass().addClass("started");
    $title.fadeOut(43, function(){
      $(this).html("Session").fadeIn();
    });
    let timeLeft = sessionLength * 60;
    currentSession = setInterval(()=>{
      let minLeft = Math.floor(timeLeft / 60);
      let secLeft = timeLeft - minLeft * 60;
      if (isCountdown === true){
        $minutes.html(minLeft);
        $seconds.html(secLeft < 10 ? "0" + secLeft : secLeft);
        timeLeft--;
      }
      if (timeLeft < 1) {
        clearInterval(currentSession);
        startBreak(breakLength);
      }
    }, 1000);
  }
  function pauseSession(){
    isCountdown = false;
    isBreaktime = false;
    $options.slideDown();
    $reset.slideDown();
    $controls.removeClass().addClass("paused");
    $title.fadeOut(43, function(){
      $(this).html("Paused").fadeIn();
    });
  }
  function resetSession(){
    isCountdown = false;
    isBreaktime = false;
    $options.slideDown();
    $reset.slideUp();
    if (currentSession){ clearInterval(currentSession); }
    if (currentBreak){ clearInterval(currentBreak); }
    $controls.removeClass().addClass("reset");
    $title.fadeOut(43, function(){
      $(this).html("Ready?").fadeIn();
    });
    updateMinutes(sessionLength);
    updateSeconds("00");
  }
  function startBreak(breakLength){
    isCountdown = false;
    isBreaktime = true;
    $title.fadeOut(43, function(){
      $(this).html("Break Time").fadeIn();
    });
    let timeLeft = breakLength * 60;
    currentBreak = setInterval(()=>{
      let minLeft = Math.floor(timeLeft / 60);
      let secLeft = timeLeft - minLeft * 60;
      if (timeLeft < 1) {
        clearInterval(currentBreak);
        startSession(sessionLength);
      }
      if (isCountdown === true){
        $minutes.html(minLeft);
        $seconds.html(secLeft < 10 ? "0" + secLeft : secLeft);
        timeLeft--;
      }
    }, 1000);
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