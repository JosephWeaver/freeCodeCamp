// https://www.freecodecamp.org/challenges/sum-all-primes

function sumPrimes(num){
  var primes = [];
  for (var i = 1; i <= num; i++){
    primes.push(i);
  }
  return primes.filter(function(x){
    for (var n = 2; n < x; n++){
      if (x % n === 0){
        return false;
      }
    }
    return x > 1;
  }).reduce(function(a, b){
    return a + b;
  });
}
sumPrimes(10);