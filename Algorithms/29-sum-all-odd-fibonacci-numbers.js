// https://www.freecodecamp.org/challenges/sum-all-odd-fibonacci-numbers

function sumFibs(num){
  var seq = [1, 1];
  for (var i = 1; seq[seq.length - 1] <= num; i++) {
    seq.push(seq[i] + seq[i - 1]);
  }
  return seq.slice(0, seq.length - 1).filter(function(num){ return num % 2 != 0; }).reduce(function(a, b){ return a + b; });
}
sumFibs(10);