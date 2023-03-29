import Highscore from "../highscore.model.js";

async function getData(letters, unique) {
  const isUnique = unique === "on" ? true : false;
  const numLetters = parseInt(letters);
  
  const result = await Highscore.find({}).lean();

  const filteredArray = result.filter((DBentry) => {
    if (isUnique && !isNaN(numLetters)) {
      return DBentry.isUnique && DBentry.letters === numLetters;
    } else if (isUnique) {
      return DBentry.isUnique;
    } else if (!isNaN(numLetters)) {
      return DBentry.letters === numLetters;
    } else {
      return true; 
    }
  });

  return filteredArray;
}

export default getData;