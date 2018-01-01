// https://www.freecodecamp.org/challenges/caesars-cipher

// FIRST SOLUTION ----------------------------------------------------------
function rot13(str) { // LBH QVQ VG!
  var rotate = 0;
  var rot13 = "";
  for(var i = 0; i < str.length; i++){
    var char = str.charCodeAt(i);
    if (char > 64 && char < 78 || char > 90 && char < 104) {
      rotate = 13;
    } else if (char > 77 && char < 91 || char > 103 && char < 117) {
      rotate = -13;
    } else {
      rotate = 0;
    }
    rot13 += String.fromCharCode(str.charCodeAt(i) + rotate);
  }
  return rot13;
}
rot13("SERR PBQR PNZC"); // FREE CODE CAMP

// SECOND SOLUTION ---------------------------------------------------------
function rot13(str) {
  var rot13 = "";
  for(var i = 0; i < str.length; i++){
    var char = str.charCodeAt(i);
    if (char > 64 && char < 78 || char > 90 && char < 104) {
      rot13 += String.fromCharCode(str.charCodeAt(i) + 13);
    } else if (char > 77 && char < 91 || char > 103 && char < 117) {
      rot13 += String.fromCharCode(str.charCodeAt(i) - 13);
    } else {
      rot13 += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return rot13;
}
rot13("LBH QVQ VG!"); // YOU DID IT!

// THIRD SOLUTION ----------------------------------------------------------
function rot13(str) {
  var rot13 = "";
  for(var i = 0; i < str.length; i++){
    var c = str.charCodeAt(i);
    rot13+=String.fromCharCode(c+(c>64&&c<78||c>90&&c<104?13:c>77&&c<91||c>103&&c<117?-13:0));
  }
  return rot13;
}
rot13("SERR PBQR PNZC"); // FREE CODE CAMP
