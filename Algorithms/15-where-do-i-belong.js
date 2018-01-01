// https://www.freecodecamp.org/challenges/where-do-i-belong

function getIndexToIns(arr, num) {
  arr.sort(function(a, b){
    return a - b;
  });
  for (var i = 0; i < arr.length; i++){
    if (num <= arr[i]){
      return i;
    }
  }
  return i;
}
getIndexToIns([10, 20, 30, 40, 50], 30); // 2