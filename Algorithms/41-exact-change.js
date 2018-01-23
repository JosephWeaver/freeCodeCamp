// https://www.freecodecamp.org/challenges/exact-change

//////////////////////////////////////////////////////////////////////
// a function to return the correct amount & denomination of change //
// to view results click the "Console" button in the preview window //
//////////////////////////////////////////////////////////////////////

console.clear();

// check cash register for amount of change I need to return to the customer
function checkCashRegister(price, cash, cid){

  // declare vars
  var change = [],
      changeAmount = cash - price,
      changeMade,
      changeObject = {},
      drawer = {
        hundreds: cid[8][1],
        twenties: cid[7][1],
        tens:     cid[6][1],
        fives:    cid[5][1],
        singles:  cid[4][1],
        quarters: cid[3][1],
        dimes:    cid[2][1],
        nickels:  cid[1][1],
        pennies:  cid[0][1]
      },
      inDrawer = 0,
      initialChangeAmount = changeAmount,
      totalChange = 0;

  // find total amount in drawer
  for (var i = 0; i < cid.length; i++){
    inDrawer += cid[i][1];
  }

  // handle routes and specify return values
  if (cash < price){
    return "*patiently waits for more cash...*";
  }
  if (inDrawer === changeAmount){
    return "Closed";
  }
  if (inDrawer < changeAmount){
    return "Insufficient Funds";
  }
  if (inDrawer >= changeAmount){
    changeMade = makeChange(change, changeAmount, changeObject, drawer, inDrawer);
    for (var j = 0; j < changeMade.length; j++){
      totalChange += changeMade[j][1];
    }
    return initialChangeAmount > totalChange ? "Insufficient Funds" : changeMade;
  }

  // declare functions
  function makeChange(change, changeAmount, changeObject, drawer, inDrawer){

    makeChangeForDenom("hundreds", 100);
    makeChangeForDenom("twenties",  20);
    makeChangeForDenom("tens",      10);
    makeChangeForDenom("fives",      5);
    makeChangeForDenom("singles",    1);
    makeChangeForDenom("quarters",   0.25);
    makeChangeForDenom("dimes",      0.1);
    makeChangeForDenom("nickels",    0.05);
    makeChangeForDenom("pennies",    0.01);

    if (changeObject.hundreds){  change.push(["ONE HUNDRED", Number(changeObject.hundreds)]); }
    if (changeObject.twenties){  change.push(["TWENTY",      Number(changeObject.twenties)]); }
    if (changeObject.tens){      change.push(["TEN",         Number(changeObject.tens)]); }
    if (changeObject.fives){     change.push(["FIVE",        Number(changeObject.fives)]); }
    if (changeObject.singles){   change.push(["ONE",         Number(changeObject.singles)]); }
    if (changeObject.quarters){  change.push(["QUARTER",     Number(changeObject.quarters)]); }
    if (changeObject.dimes){     change.push(["DIME",        Number(changeObject.dimes)]); }
    if (changeObject.nickels){   change.push(["NICKEL",      Number(changeObject.nickels)]); }
    if (changeObject.pennies){   change.push(["PENNY",       Number(changeObject.pennies)]); }

    return change;

  }
  function makeChangeForDenom(denomName, denomAmount){
    while (changeAmount >= denomAmount && denomAmount <= drawer[denomName]){
      if (!changeObject[denomName]) changeObject[denomName] = denomAmount;
      else changeObject[denomName] += denomAmount;
      drawer[denomName] -= denomAmount;
      drawer[denomName] = round(drawer[denomName]);
      changeAmount -= denomAmount;
      changeAmount = round(changeAmount);
    }
  }
  function round(value){
    return Math.round(value * 100) / 100;
  }
}

console.log(checkCashRegister(
  3.26, // price of item
  100.00, // cash they handed me
  [["PENNY", 1.01],
   ["NICKEL", 2.05],
   ["DIME", 3.10],
   ["QUARTER", 4.25],
   ["ONE", 90.00],
   ["FIVE", 55.00],
   ["TEN", 20.00],
   ["TWENTY", 60.00],
   ["ONE HUNDRED", 100.00]]
));
// should return [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]