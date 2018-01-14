// https://www.freecodecamp.org/challenges/roman-numeral-converter

function convertToRoman(num){
  var roman = "";
  for (var i = 1; i < 10; i++){
    if (num >= 1000){ roman += "M"; num -= 1000; }
  }
  if (num >= 900){ roman += "CM"; num -= 900; }
  if (num >= 500){ roman += "D"; num -= 500; }
  if (num >= 400){ roman += "CD"; num -= 400; }
  for (var j = 1; j <= 3; j++){
    if (num >= 100){ roman += "C"; num -= 100; }
  }
  if (num >= 90){ roman += "XC"; num -= 90; }
  if (num >= 50){ roman += "L"; num -= 50; }
  if (num >= 40){ roman += "XL"; num -= 40; }
  for (var k = 1; k <= 3; k++){
    if (num >= 10){ roman += "X"; num -= 10; }
  }
  if (num >= 9){ roman += "IX"; num -= 9; }
  if (num >= 5){ roman += "V"; num -= 5; }
  if (num >= 4){ roman += "IV"; num -= 4; }
  for (var l = 1; l <= 3; l++){
    if (num >= 1){ roman += "I"; num -= 1; }
  }
  return roman;
}
convertToRoman(798);