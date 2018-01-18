// https://www.freecodecamp.org/challenges/sorted-union

function uniteUnique() {
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      if (arguments[0].indexOf(arguments[i][j]) === -1) arguments[0].push(arguments[i][j]);
    }
  }
  return arguments[0];
}
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);