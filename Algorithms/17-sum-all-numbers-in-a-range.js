// https://www.freecodecamp.org/challenges/caesars-cipher

function sumAll(arr) {
  var sum = arr[0] < arr[1] ? arr[1] : arr[0];
  if (arr[0] < arr[1]) {
    for (var i = arr[0]; i < arr[1]; i++){
      sum += i;
    }
  } else {
    for (var j = arr[1]; j < arr[0]; j++){
      sum += j;
    }
  }
  return sum;
}
sumAll([1, 4]);