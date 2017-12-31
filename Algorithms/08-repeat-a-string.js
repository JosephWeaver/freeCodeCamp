// https://www.freecodecamp.org/challenges/repeat-a-string-repeat-a-string

function repeatStringNumTimes(str, num) {
  var ret = '';
  for(var i = 0; i < num; i++){
    ret += str;
  }
  return ret;
}
repeatStringNumTimes("abc", 3); // abcabcabc
