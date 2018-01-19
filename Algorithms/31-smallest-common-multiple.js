// https://www.freecodecamp.org/challenges/smallest-common-multiple

function smallestCommons(arr) {
  var h = arr[0] > arr[1] ? arr[0] : arr[1],
      l = arr[0] > arr[1] ? arr[1] : arr[0],
      lcm = h;
  for(var i = h; i >= l; i--){
    if(lcm % i !== 0){
      lcm += h;
      i = h;
    }
  }
  return lcm;
}