// https://www.freecodecamp.org/challenges/wherefore-art-thou

function whatIsInAName(collection, source) {
  var props = Object.keys(source);
  return collection.filter(function(obj){
    return props.every(function(prop){
      return obj.hasOwnProperty(prop) && obj[prop] === source[prop];
    });
  });
}
whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });