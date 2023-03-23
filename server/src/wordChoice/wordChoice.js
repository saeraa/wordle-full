import {
	hasSpecialCharsOrSpaces,
	hasOnlyUniqueLetters
} from "../utils/utils.js";

export default function wordChoice(array, length, onlyUniqueLetters) {
	const resultingArray = array
		.filter((word) =>
			!!onlyUniqueLetters
				? !hasSpecialCharsOrSpaces(word) && hasOnlyUniqueLetters(word)
				: !hasSpecialCharsOrSpaces(word)
		)
		.filter((word) => word.length === length);

	if (resultingArray.length === 0) {
		return "error, no matching word";
	} else if (resultingArray.length === 1) {
		return resultingArray[0];
	}

	const numOfWords = resultingArray.length;
	const randomIndex = Math.floor(Math.random() * numOfWords);

	return resultingArray[randomIndex];
};
