import { hasSpecialCharsOrSpaces } from "../utils/utils.js";

function guessWord(guessInput, correctWordInput) {
	const result = [];

	const guess = guessInput.toLowerCase();
	const correctWord = correctWordInput.toLowerCase();

	console.log(guessInput, correctWord);

	if (guess.length !== correctWord.length) {
		return [{ error: "The word length does not match." }];
	}

	if (hasSpecialCharsOrSpaces(guess) || hasSpecialCharsOrSpaces(correctWord)) {
		return [{ error: "Incorrect input." }];
	}

	const incorrectLetterGuesses = [];
	const correctLetters = {};

	for (let i = 0; i < guess.length; ++i) {
		result[i] = { letter: guess[i], result: "incorrect" };
		let targetLetter = correctWord[i];

		if (targetLetter in correctLetters) {
			correctLetters[targetLetter]++;
		} else {
			correctLetters[targetLetter] = 1;
		}

		if (guess[i] === targetLetter) {
			result[i].result = "correct";
			correctLetters[targetLetter]--;
		} else {
			incorrectLetterGuesses.push(i);
		}
	}

	for (const i of incorrectLetterGuesses) {
		let guessLetter = guess[i];

		if (guessLetter in correctLetters && correctLetters[guessLetter] > 0) {
			result[i].result = "misplaced";
			correctLetters[guessLetter]--;
		}
	}

	return result;
}

export default guessWord;
