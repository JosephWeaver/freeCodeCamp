// https://www.freecodecamp.org/challenges/pairwise

function pairwise(arr, arg){
  var pair = 0;
  for (var i = 0; i < arr.length; i++){
    for (var j = i + 1; j < arr.length; j++){
      if (arr[i] + arr[j] == arg){
        pair += i + j;
        arr[i] = NaN;
        arr[j] = NaN;
        break;
      }
    }
  }
  return pair;
}
pairwise([1,4,2,3,0,5], 7);