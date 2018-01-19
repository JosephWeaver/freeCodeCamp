// https://www.freecodecamp.org/challenges/finders-keepers

function findElement(arr, func){
  return arr.filter(func)[0];
}
findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });