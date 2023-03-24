import wordChoice from "./wordChoice/wordChoice.js";
import guessWord from "./guessWord/guessWord.js";
import { nanoid } from "nanoid";
import {getListOfWords} from "./wordList/getWordList.js";

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
		["åtta", "fyra", "femtio", "fifty", "fatty"],
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

	return {
		startTime: currentGame.startTime,
		letters: currentGame.letters,
		isUnique: isUnique,
		gameId: currentGame.gameId,
		word: currentGame.word
	};
}

function checkWordGuess(gameId, guess) {
	// console.log("currentgame " + currentGame.gameId);
	// console.log("gameId sent " + gameId);
	console.log("guess sent " + guess);
	// if (currentGame.gameId !== gameId) {
	// 	return "No such game";
	// }

	const numLetters = currentGame.letters;
  console.log(numLetters)
	const arrayOfWords = getListOfWords(+numLetters);
	console.log("array : ", arrayOfWords[0]);
	const checkedWord = arrayOfWords.find((word) => word === guess.toLowerCase())

	if (checkedWord === undefined) {
		return "No such word";
	}

	const result = guessWord(guess, currentGame.word);

	return result;
}

export { createNewGame, checkWordGuess };
