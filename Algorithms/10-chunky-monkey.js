// https://www.freecodecamp.org/challenges/chunky-monkey

function chunkArrayInGroups(arr, size) {
  var newArr = [];
  for(var i = 0; i < arr.length; i+=size){
    newArr.push(arr.slice(i, size + i));
  }
  return newArr;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2); // [["a","b"],["c","d"]]
chunkArrayInGroups(["a", "b", "c", "d", "e", "f"], 3); // [["a","b","c"],["d","e","f"]]
