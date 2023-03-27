import wordChoice from "./wordChoice/wordChoice.js";
import guessWord from "./guessWord/guessWord.js";
import { nanoid } from "nanoid";
import { getListOfWords } from "./dictionary/getDictionary.js";
import { getRandomWords } from "./randomWordList/getRandomWords.js";

const currentGame = {
	word: null,
	gameId: null,
	letters: null,
	isUnique: null,
	startTime: null,
	endTime: null,
	guesses: [],
	name: null,
	gameWon: false,
	allowedGuesses: 6
};

function createNewGame(lengthOfWord, isUnique) {
	const word = wordChoice(
		getRandomWords(lengthOfWord),
		parseInt(lengthOfWord),
		isUnique
	);
	const gameId = nanoid();

	console.log("creating new game: " + gameId);

	(currentGame.word = word),
		(currentGame.gameId = gameId),
		(currentGame.letters = lengthOfWord),
		(currentGame.isUnique = isUnique),
		(currentGame.startTime = new Date());
		currentGame.guesses.length = 0;

		console.log(word);

	return {
		startTime: currentGame.startTime,
		letters: currentGame.letters,
		isUnique: isUnique,
		gameId: currentGame.gameId,
		word: currentGame.word
	};
}

function checkWordGuess(gameId, guess) {

	if (currentGame.gameId !== gameId) {
		return "No such game";
	}

	const numLetters = currentGame.letters;
	const arrayOfWords = getListOfWords(+numLetters);

	const checkedWord = arrayOfWords.find((word) => word === guess.toLowerCase());

	if (checkedWord === undefined) {
		return "No such word";
	}

	const result = guessWord(guess, currentGame.word);

	currentGame.guesses.push(result);

	const gameOver = checkIfGameOver();
	console.log(gameOver);
	if (gameOver) {
		result.push({
			correctWord: currentGame.word
		});
	}
	return result;
}

function checkIfGameOver() {

	if (currentGame.guesses.length === currentGame.allowedGuesses) {
		return true;
	}
	
	return false;
}

export { createNewGame, checkWordGuess, currentGame };
