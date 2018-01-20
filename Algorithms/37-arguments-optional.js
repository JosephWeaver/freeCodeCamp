// https://www.freecodecamp.org/challenges/arguments-optional

function addTogether(){
  var a = arguments[0];
  var b = arguments[1];
  return Number.isInteger(a) ? Number.isInteger(b) ? a + b : !b ? function(b){ return Number.isInteger(b) ? a + b : undefined; } : undefined : undefined;
}
addTogether(2,3);