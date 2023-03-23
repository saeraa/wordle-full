// import fs from "fs";
// import * as url from "url";
// import path from "path";
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import words5 from "./words5.js";

export function getListOfWords(letterAmount) {
	// if (letterAmount < 5 || letterAmount > 10) {
	// 	console.log(letterAmount);
	// 	return [];
	// }

  return words5.words

	// return fs.readFile(
	// 	path.resolve(__dirname, `words${letterAmount}.json`),
	// 	(err, json) => {
	// 		if (err) {
	// 			console.log("File read failed: " + err);
	// 			return;
	// 		}

	// 		try {
	// 			const wordList = JSON.parse(json);
	// 			console.log(wordList.words[0]);
	// 			return wordList.words;
	// 		} catch (err) {
	// 			console.log("Error parsing JSON string: " + err);
	// 		}
	// 	}
	// );
}

//getListOfWords(7);
