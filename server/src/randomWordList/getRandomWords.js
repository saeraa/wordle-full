import words5 from "./words5.js";
import words6 from "./words6.js";
import words7 from "./words7.js";
import words8 from "./words8.js";
import words9 from "./words9.js";
import words10 from "./words10.js";

export function getRandomWords(letterAmount) {
	if (+letterAmount < 5 || +letterAmount > 10 || isNaN(letterAmount)) {
		return [];
	}

	switch (+letterAmount) {
		case 5:
			return words5.words;
		case 6:
			return words6.words;
		case 7:
			return words7.words;
		case 8:
			return words8.words;
		case 9:
			return words9.words;
		case 10:
			return words10.words;
	}
}
