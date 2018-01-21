// https://www.freecodecamp.org/challenges/record-collection

function updateRecords(id, prop, value){
  if (value == ""){
    delete collection[id][prop];
  } else if (prop == "artist"){
      collection[id].artist = value;
  } else if (prop == "tracks"){
    if (!collection[id].tracks){
      collection[id].tracks = [value];
    } else {
      collection[id].tracks[collection[id].tracks.length] = value;
    }
  }
  return collection;
}
updateRecords(5439, "artist", "ABBA");