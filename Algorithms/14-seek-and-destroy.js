// https://www.freecodecamp.org/challenges/seek-and-destroy

function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments);
  var array = args.shift();
  var filtered = array.filter(function(val){
    return args.indexOf(val) == -1;
  });
  return filtered;
}
destroyer([1, 2, 3, 1, 2, 3], 2, 3); // [1,1]