// https://www.freecodecamp.org/challenges/pig-latin

function translatePigLatin(str){
  var start = str.length,
      vowels = ["a", "e", "i", "o", "u"];
  vowels.forEach(function(vowel){
    start = str.indexOf(vowel) < start && str.indexOf(vowel) >= 0 ? str.indexOf(vowel) : start;
  });
  return start === 0 ? str + "way" : str.substr(start) + str.substr(0, start) + "ay";
}
translatePigLatin("consonant");