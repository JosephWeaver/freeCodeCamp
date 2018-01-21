// https://www.freecodecamp.org/challenges/symmetric-difference

function sym(args) {
  var r = [];
  for (var i = 0; i < arguments.length; i++){
    r.push(arguments[i]);
  }
  function diff(e, f) {
    var vals = [];
    e.forEach(function(val){ if (vals.indexOf(val) === -1 && f.indexOf(val) === -1){ vals.push(val); } });
    f.forEach(function(val){ if (vals.indexOf(val) === -1 && e.indexOf(val) === -1){ vals.push(val); } });
    return vals;
  }
  return r.reduce(diff);
}
sym([1, 2, 3], [5, 2, 1, 4]);