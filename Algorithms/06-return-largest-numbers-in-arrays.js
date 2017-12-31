// https://www.freecodecamp.org/challenges/return-largest-numbers-in-arrays

function largestOfFour(arr) {
  var nums = [];
  arr.forEach(function(val) {
    val.sort(function(a,b){
      return b - a;
    });
    nums.push(val[0]);
  });
  return nums;
}
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]); // [5,27,39,1001]
