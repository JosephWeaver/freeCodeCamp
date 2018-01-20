// https://www.freecodecamp.org/challenges/everything-be-true

function truthCheck(collection, pre){
  for(var i = 0, length = collection.length; i < length; i++){
    if(!collection[i][pre]){
      return false;
    }
  }
  return true;
}
truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");