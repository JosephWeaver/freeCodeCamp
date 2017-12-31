// https://www.freecodecamp.org/challenges/confirm-the-ending

function confirmEnding(str, target) {
  var isMatch = str.substr(-target.length) === target;
  return isMatch;
}
confirmEnding("Bastian", "n"); // true
