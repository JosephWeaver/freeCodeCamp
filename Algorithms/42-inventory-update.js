// https://www.freecodecamp.org/challenges/inventory-update

function updateInventory(curInv, newInv){
  console.clear();
  for (var i = 0, x = curInv.length; i < x; i++){
    for (var j = 0; j < newInv.length; j++){
      if (curInv[i][1] === newInv[j][1]){
        curInv[i][0] = curInv[i][0] + newInv[j][0];
      }
    }
  }
  var matchFound;
  for (var k = 0; k < newInv.length; k++){
    matchFound = k;
    for (var l = 0, y = curInv.length; l < y; l++){
      if (curInv[l][1] === newInv[k][1]){
        matchFound = true;
      }
    }
    if (matchFound !== true){
      curInv.push(newInv[k]);
    }
  }
  return curInv.sort(function(a, b) { return a[1] > b[1]; });
}
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];
var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];
updateInventory(curInv, newInv);