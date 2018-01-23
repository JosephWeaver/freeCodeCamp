// https://www.freecodecamp.org/challenges/exact-change

//////////////////////////////////////////////////////////////////////
// a function to return the correct amount & denomination of change //
// to view results click the "Console" button in the preview window //
//////////////////////////////////////////////////////////////////////

console.clear();

function checkCashRegister(price, cash, cid){

  // get values for each denomination, set variables
  var drawer = {
        hundreds: round(cid[8][1]),
        twenties: round(cid[7][1]),
        tens:     round(cid[6][1]),
        fives:    round(cid[5][1]),
        singles:  round(cid[4][1]),
        quarters: round(cid[3][1]),
        dimes:    round(cid[2][1]),
        nickels:  round(cid[1][1]),
        pennies:  round(cid[0][1])
      },
      changeObj = {},
      change = [],
      makeChangeFor = round(cash - price),
      amountInDrawer = 0;

  // find total amount in drawer
  for (var i = 0; i < cid.length; i++) {
    amountInDrawer += cid[i][1];
  }
  amountInDrawer = round(amountInDrawer);

  // if price is more than total amount return "Insufficient Funds"
  if (amountInDrawer < makeChangeFor) {
    return "Insufficient Funds";
  }

  // else if price is equal to total amount return "Closed"
  else if (amountInDrawer == makeChangeFor) {
    return "Closed";
  }

  // else if cash tendered is less than total price
  else if (cash < price) {
    return "*patiently waits for more cash...*";
  }

  // else return value of price subtracted from total amount in drawer, displayed as array
  else {
    return subtract(drawer, changeObj, change, makeChangeFor, amountInDrawer);
  }

  // function to round values to 2 decimal places
  function round(value) {
    return (Math.round(value * 100) / 100);
  }

  // function to subtract price from total amount in drawer in descending order of denomination, returning an array
  function subtract(drawer, changeObj, change, makeChangeFor, amountInDrawer) {

    // console.log(amountInDrawer);
    // console.log(drawer);

    console.log("need to make change for: " + makeChangeFor.toFixed(2));

    // hundreds
    console.log("hundreds before: " + drawer.hundreds);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 100 && 100 <= drawer.hundreds){
      if (changeObj.hundreds){
        changeObj.hundreds += 100;
      } else {
        changeObj.hundreds = 100;
      }
      makeChangeFor -= 100;
      drawer.hundreds -= 100;
    }
    console.log("hundreds after: " + drawer.hundreds);
    if (changeObj.hundreds){ console.log("change made: " + changeObj.hundreds); }

    // twenties
    console.log("twenties before: " + drawer.twenties);
    console.log("still need change for: " + round(makeChangeFor));

    while (makeChangeFor >= 20 && 20 <= drawer.twenties){
      if (changeObj.twenties){
        changeObj.twenties += 20;
      } else {
        changeObj.twenties = 20;
      }
      makeChangeFor -= 20;
      drawer.twenties -= 20;
    }
    console.log("twenties after: " + drawer.twenties);
    if (changeObj.twenties){ console.log("change made: " + changeObj.twenties); }

    // tens
    console.log("tens before: " + drawer.tens);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 10 && 10 <= drawer.tens){
      if (changeObj.tens){
        changeObj.tens += 10;
      } else {
        changeObj.tens = 10;
      }
      makeChangeFor -= 10;
      drawer.tens -= 10;
    }
    console.log("tens after: " + drawer.tens);
    if (changeObj.tens){ console.log("change made: " + changeObj.tens); }

    // fives
    console.log("fives before: " + drawer.fives);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 5 && 5 <= drawer.fives){
      if (changeObj.fives){
        changeObj.fives += 5;
      } else {
        changeObj.fives = 5;
      }
      makeChangeFor -= 5;
      drawer.fives -= 5;
    }
    console.log("fives after: " + drawer.fives);
    if (changeObj.fives){ console.log("change made: " + changeObj.fives); }

    // singles
    console.log("singles before: " + drawer.singles);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 1 && 1 <= drawer.singles){
      if (changeObj.singles){
        changeObj.singles += 1;
      } else {
        changeObj.singles = 1;
      }
      makeChangeFor -= 1;
      drawer.singles -= 1;
    }
    console.log("singles after: " + drawer.singles);
    if (changeObj.singles){ console.log("change made: " + changeObj.singles); }

    // quarters
    console.log("quarters before: " + drawer.quarters);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 0.25 && 0.25 <= drawer.quarters){
      if (changeObj.quarters){
        changeObj.quarters += 0.25;
      } else {
        changeObj.quarters = 0.25;
      }
      makeChangeFor -= 0.25;
      drawer.quarters -= 0.25;
    }
    console.log("quarters after: " + drawer.quarters);
    if (changeObj.quarters){ console.log("change made: " + changeObj.quarters); }

    // dimes
    console.log("dimes before: " + drawer.dimes);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 0.1 && 0.1 <= drawer.dimes){
      if (changeObj.dimes){
        changeObj.dimes += 0.1;
      } else {
        changeObj.dimes = 0.1;
      }
      makeChangeFor -= 0.1;
      drawer.dimes -= 0.1;
    }
    console.log("dimes after: " + drawer.dimes);
    if (changeObj.dimes){ console.log("change made: " + changeObj.dimes); }

    // nickels
    console.log("nickels before: " + drawer.nickels);
    console.log("still need change for: " + round(makeChangeFor));
    while (makeChangeFor >= 0.05 && 0.05 <= drawer.nickels){
      if (changeObj.nickels){
        changeObj.nickels += 0.05;
      } else {
        changeObj.nickels = 0.05;
      }
      makeChangeFor -= 0.05;
      drawer.nickels -= 0.05;
    }
    console.log("nickels after: " + drawer.nickels);
    if (changeObj.nickels){ console.log("change made: " + changeObj.nickels); }

    // pennies
    console.log("pennies before: " + drawer.pennies);
    console.log("still need change for: " + round(makeChangeFor));
    while (round(makeChangeFor) >= 0.01 && 0.01 <= drawer.pennies){
      if (changeObj.pennies){
        changeObj.pennies += 0.01;
      } else {
        changeObj.pennies = 0.01;
      }
      makeChangeFor -= 0.01;
      drawer.pennies -= 0.01;
    }
    console.log("pennies after: " + drawer.pennies);
    if (changeObj.pennies){ console.log("change made: " + changeObj.pennies); }

    // push all applicable change in bills and coins to array, sorted in highest to lowest order
    if (changeObj.hundreds){  change.push(["ONE HUNDRED", Number(changeObj.hundreds)]); }
    if (changeObj.twenties){  change.push(["TWENTY",      Number(changeObj.twenties)]); }
    if (changeObj.tens){      change.push(["TEN",         Number(changeObj.tens)]); }
    if (changeObj.fives){     change.push(["FIVE",        Number(changeObj.fives)]); }
    if (changeObj.singles){   change.push(["ONE",         Number(changeObj.singles)]); }
    if (changeObj.quarters){  change.push(["QUARTER",     Number(changeObj.quarters)]); }
    if (changeObj.dimes){     change.push(["DIME",        Number(changeObj.dimes)]); }
    if (changeObj.nickels){   change.push(["NICKEL",      Number(changeObj.nickels)]); }
    if (changeObj.pennies){   change.push(["PENNY",       Number(changeObj.pennies)]); }

    // return changeObj;
    return change;

  }
}

console.log(
  checkCashRegister(
    3.26, // price of item
    100.00, // cash they handed me
    [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.10],
      ["QUARTER", 4.25],
      ["ONE", 90.00],
      ["FIVE", 55.00],
      ["TEN", 20.00],
      ["TWENTY", 60.00],
      ["ONE HUNDRED", 100.00]
    ]
  )
);
// should return
// [
//   ["TWENTY", 60.00],
//   ["TEN", 20.00],
//   ["FIVE", 15.00],
//   ["ONE", 1.00],
//   ["QUARTER", 0.50],
//   ["DIME", 0.20],
//   ["PENNY", 0.04]
// ]


// console.log(
//   checkCashRegister(
//     19.50, // price of item
//     20.00, // cash they handed me
//     [
//       ["PENNY", 1.01],
//       ["NICKEL", 2.05],
//       ["DIME", 3.10],
//       ["QUARTER", 4.25],
//       ["ONE", 90.00],
//       ["FIVE", 55.00],
//       ["TEN", 20.00],
//       ["TWENTY", 60.00],
//       ["ONE HUNDRED", 100.00]
//     ]
//   )
// );
// should return
// [
//   ["QUARTER", 0.50]
// ]