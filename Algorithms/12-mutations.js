// https://www.freecodecamp.org/challenges/mutations

function mutation(arr) {
  var haystack = arr[0].toLowerCase().split(""),
      needle = arr[1].toLowerCase().split("");
  for (var i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1)
      return false;
  }
  return true;
}
mutation(["hello", "hey"]); // false