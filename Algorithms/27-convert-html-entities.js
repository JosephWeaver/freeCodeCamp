// https://www.freecodecamp.org/challenges/convert-html-entities

function convertHTML(str) {
  return str.split("&").join("&amp;")
            .split("<").join("&lt;")
            .split(">").join("&gt;")
            .split("\"").join("&quot;")
            .split("'").join("&apos;");
}
convertHTML("Dolce & Gabbana");