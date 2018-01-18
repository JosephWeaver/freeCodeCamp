// https://www.freecodecamp.org/challenges/spinal-tap-case

function spinalCase(str){
  var chars = str.replace(/_/g, " ").split("");
  for (var i = 0; i < chars.length; i++){
    if (chars[i].charCodeAt(0) >= 65 && chars[i].charCodeAt(0) <= 90){
      chars[i] = " " + chars[i];
    }
  }
  return chars.join("").trim().toLowerCase().split("  ").join("-").split(" ").join("-");
}
spinalCase('This Is Spinal Tap');