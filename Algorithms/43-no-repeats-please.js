// https://www.freecodecamp.org/challenges/no-repeats-please

/* jshint esversion: 6 */ // <-- NEEDS JSHINT ESVERSION SPECIFIED AS 6 TO WORK ON FCC
function permAlone(str){
  function getPerms(str){
    function *permute(a, n = a.length) {
      if (n <= 1) yield a.slice();
      else for (let i = 0; i < n; i++) {
        yield *permute(a, n - 1);
        const j = n % 2 ? 0 : i;
        [a[n-1], a[j]] = [a[j], a[n-1]];
      }
    }
    return Array.from(permute(str.split(""))).map(perm => perm.join(""));
  }
  var perms = getPerms(str), regex = /(.)\1+/g;
  return perms.filter(function(string) {
    return !string.match(regex);
  }).length;
}
permAlone('aab');