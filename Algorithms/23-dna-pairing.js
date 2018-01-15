//https://www.freecodecamp.org/challenges/dna-pairing

function pairElement(str){
  var singles = str.split(""), pairs = [];
  for(var i = 0; i < singles.length; i++){
    pairs.push([singles[i]]);
    switch(pairs[i][0]){
      case "G": pairs[i].push("C"); break;
      case "C": pairs[i].push("G"); break;
      case "A": pairs[i].push("T"); break;
      case "T": pairs[i].push("A"); break;
    }
  }
  return pairs;
}
pairElement("GCG");