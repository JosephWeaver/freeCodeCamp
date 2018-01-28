// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// https://use.fontawesome.com/releases/v5.0.6/js/all.js

$(()=>{

  console.clear();

  let $minutes = $("#minutes"),
      $seconds = $("#seconds"),
      $sessionInput = $("#sessionInput"),
      $incrSession = $("#incrSession"),
      $decrSession = $("#decrSession"),
      $breakInput = $("#breakInput"),
      $incrBreak = $("#incrBreak"),
      $decrBreak = $("#decrBreak"),
      sessionMax = 60,
      sessionMin = 5,
      breakMax = 10,
      breakMin = 1,
      currMinutes,
      currSeconds,
      fullMinutes,
      fullSeconds,
      isBreakTime,
      isCountdown;

  // gray out controls when counting down
  // gray out countdown when not active

  init();

  function init(){
    $incrSession.click(()=>incrSession());
    $decrSession.click(()=>decrSession());
    $incrBreak.click(()=>incrBreak());
    $decrBreak.click(()=>decrBreak());
    $sessionInput.change(e=>updateSession(e.target.value));
    $breakInput.change(e=>updateBreak(e.target.value));
  }
  function incrSession(){
    let num = Number($sessionInput.val());
    num = num + (num === sessionMax ? 0 : 1);
    updateSession(num);
    updateMinutes(num);
  }
  function decrSession(){
    let num = Number($sessionInput.val());
    num = num - (num === sessionMin ? 0 : 1);
    updateSession(num);
    updateMinutes(num);
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