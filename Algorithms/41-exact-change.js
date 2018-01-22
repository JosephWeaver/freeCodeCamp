// https://www.freecodecamp.org/challenges/exact-change

///// IN PROGRESS /////

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

    // console.log("need to make change for: " + makeChangeFor.toFixed(2));

    // hundreds
    // console.log("hundreds before: " + drawer.hundreds);
    while (makeChangeFor >= 100 && makeChangeFor <= drawer.hundreds){
      if (changeObj.hundreds){
        changeObj.hundreds += 100;
      } else {
        changeObj.hundreds = 100;
      }
      makeChangeFor -= 100;
    }
    // console.log("hundreds after: " + (changeObj.hundreds ? changeObj.hundreds : 0));

    // twenties
    // console.log("twenties before: " + drawer.twenties);
    while (makeChangeFor >= 20 && makeChangeFor <= drawer.twenties){
      if (changeObj.twenties){
        changeObj.twenties += 20;
      } else {
        changeObj.twenties = 20;
      }
      makeChangeFor -= 20;
    }
    // console.log("twenties after: " + (changeObj.twenties ? changeObj.twenties : 0));

    // tens
    // console.log("tens before: " + drawer.tens);
    while (makeChangeFor >= 10 && makeChangeFor <= drawer.tens){
      if (changeObj.tens){
        changeObj.tens += 10;
      } else {
        changeObj.tens = 10;
      }
      makeChangeFor -= 10;
    }
    // console.log("tens after: " + (changeObj.tens ? changeObj.tens : 0));

    // fives
    // console.log("fives before: " + drawer.fives);
    while (makeChangeFor >= 5 && makeChangeFor <= drawer.fives){
      if (changeObj.fives){
        changeObj.fives += 5;
      } else {
        changeObj.fives = 5;
      }
      makeChangeFor -= 5;
    }
    // console.log("fives after: " + (changeObj.fives ? changeObj.fives : 0));

    // singles
    // console.log("singles before: " + drawer.singles);
    while (makeChangeFor >= 1 && makeChangeFor <= drawer.singles){
      if (changeObj.singles){
        changeObj.singles += 1;
      } else {
        changeObj.singles = 1;
      }
      makeChangeFor -= 1;
    }
    // console.log("singles after: " + (changeObj.singles ? changeObj.singles : 0));

    // quarters
    // console.log("quarters before: " + drawer.quarters);
    while (makeChangeFor >= 0.25 && makeChangeFor <= drawer.quarters){
      if (changeObj.quarters){
        changeObj.quarters += 0.25;
      } else {
        changeObj.quarters = 0.25;
      }
      makeChangeFor -= 0.25;
    }
    // console.log("quarters after: " + (changeObj.quarters ? changeObj.quarters : 0));

    // dimes
    // console.log("dimes before: " + drawer.dimes);
    while (makeChangeFor >= 0.1 && makeChangeFor <= drawer.dimes){
      if (changeObj.dimes){
        changeObj.dimes += 0.1;
      } else {
        changeObj.dimes = 0.1;
      }
      makeChangeFor -= 0.1;
    }
    // console.log("dimes after: " + (changeObj.dimes ? changeObj.dimes : 0));

    // nickels
    // console.log("nickels before: " + drawer.nickels);
    while (makeChangeFor >= 0.05 && makeChangeFor <= drawer.nickels){
      if (changeObj.nickels){
        changeObj.nickels += 0.05;
      } else {
        changeObj.nickels = 0.05;
      }
      makeChangeFor -= 0.05;
    }
    // console.log("nickels after: " + (changeObj.nickels ? changeObj.nickels : 0));

    // pennies
    // console.log("pennies before: " + drawer.pennies);
    while (makeChangeFor >= 0.01 && makeChangeFor <= drawer.pennies){
      if (changeObj.pennies){
        changeObj.pennies += 0.01;
      } else {
        changeObj.pennies = 0.01;
      }
      makeChangeFor -= 0.01;
    }
    // console.log("pennies after: " + (changeObj.pennies ? changeObj.pennies : 0));

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

// console.log(
//   checkCashRegister(
//     3.26, // price of item
//     100.00, // cash they handed me
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
//   ["TWENTY", 60.00],
//   ["TEN", 20.00],
//   ["FIVE", 15.00],
//   ["ONE", 1.00],
//   ["QUARTER", 0.50],
//   ["DIME", 0.20],
//   ["PENNY", 0.04]
// ]


console.log(
  checkCashRegister(
    19.50, // price of item
    20.00, // cash they handed me
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
//   ["QUARTER", 0.50]
// ]