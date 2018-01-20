// https://www.freecodecamp.org/challenges/steamroller

function steamrollArray(arr){
  var flat = [];
  for (var i = 0; i < arr.length; i++){
    if (Array.isArray(arr[i])){
      flat = flat.concat(steamrollArray(arr[i]));
    } else {
      flat.push(arr[i]);
    }
  }
  return flat;
}
steamrollArray([1, [2], [3, [[4]]]]);