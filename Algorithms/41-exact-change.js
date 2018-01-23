// https://www.freecodecamp.org/challenges/exact-change

function checkCashRegister(price, cash, cid){

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

  for (var i = 0; i < cid.length; i++){ amountInDrawer += cid[i][1]; }
  amountInDrawer = round(amountInDrawer);

  if (cash < price){ return "*patiently waits for more cash...*"; }
  if (amountInDrawer < makeChangeFor){ return "Insufficient Funds"; }
  if (amountInDrawer == makeChangeFor){ return "Closed"; }
  return subtract(drawer, changeObj, change, makeChangeFor, amountInDrawer);

  function round(value){ return (Math.round(value * 100) / 100); }
  function subtract(drawer, changeObj, change, makeChangeFor, amountInDrawer){
    function makeChangeForDenomination(name, amount){
      while (makeChangeFor >= amount && amount <= drawer[name]){
        if (changeObj[name])
          changeObj[name] += amount;
        else
          changeObj[name] = amount;
        makeChangeFor -= amount;
        drawer[name] -= amount;
      }
    }
    makeChangeForDenomination("hundreds", 100);
    makeChangeForDenomination("twenties",  20);
    makeChangeForDenomination("tens",      10);
    makeChangeForDenomination("fives",      5);
    makeChangeForDenomination("singles",    1);
    makeChangeForDenomination("quarters",   0.25);
    makeChangeForDenomination("dimes",      0.1);
    makeChangeForDenomination("nickels",    0.05);
    makeChangeForDenomination("pennies",    0.01);

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
