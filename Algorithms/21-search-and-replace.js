// https://www.freecodecamp.org/challenges/search-and-replace

function myReplace(str, before, after){
  return str.replace(before, before[0] === before[0].toUpperCase() ? after[0].toUpperCase() + after.substring(1) : after);
}
myReplace("A quick brown fox jumped over the lazy dog", "Jumped", "leaped");