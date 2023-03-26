import axios from "axios";

async function getData(letters, unique) {
  const isUnique = unique === "on" ? true : false;
  const numLetters = parseInt(letters);

  const result = await axios.get("http://localhost:5080/fakeDB.json")

  const filteredArray = result.data.filter((DBentry) => {
    if (isUnique && !isNaN(numLetters)) {
      return DBentry.isUnique && DBentry.letters === numLetters;
    } else if (isUnique) {
      return DBentry.isUnique;
    } else if (!isNaN(numLetters)) {
      return DBentry.letters === numLetters;
    } else {
      return true; // no filters applied
    }
  });

  return filteredArray;
}

export default getData;