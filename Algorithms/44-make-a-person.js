// https://www.freecodecamp.org/challenges/make-a-person

var Person = function(firstAndLast){
  var fullName = firstAndLast;
  this.getFirstName = function(){
    return fullName.split(" ")[0];
  };
  this.getLastName = function(){
    return fullName.split(" ")[1];
  };
  this.getFullName = function(){
    return fullName;
  };
  this.setFirstName = function(first){
    fullName = first + " " + fullName.split(" ")[1];
  };
  this.setLastName = function(last){
    fullName = fullName.split(" ")[0] + " " + last;
  };
  this.setFullName = function(firstAndLast){
    fullName = firstAndLast;
  };
};
var bob = new Person('Bob Ross');