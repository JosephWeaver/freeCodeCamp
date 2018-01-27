// https://www.freecodecamp.org/challenges/map-the-debris

function orbitalPeriod(){
  var args = Array.prototype.slice.call(arguments)[0],
      earthRadius = 6367.4447,
      GM = 398600.4418,
      results = [];
  for (var i = 0; i < args.length; i++){
    results.push({
      name: args[i].name,
      orbitalPeriod: Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + args[i].avgAlt, 3) / GM))
    });
  }
  return results;
}
orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);