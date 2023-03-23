import wordChoice from "./wordChoice/wordChoice.js";
import guessWord from './guessWord/guessWord.js';
import { nanoid } from 'nanoid'

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
}

function createNewGame(lengthOfWord, isUnique) {
  //console.log("should be 50", wordChoice(["åtta", "fyra", "femtio"], parseInt(lengthOfWord), !!isUnique))
 // console.log("should be 50", wordChoice(["åtta", "fyra", "femtio"], 6, false))
  const word = wordChoice(["åtta", "fyra", "femtio"], 
  parseInt(lengthOfWord), !!isUnique)
  const gameId = nanoid();

  console.log("creating new game: " + gameId)

  currentGame.word = word,
  currentGame.gameId = gameId,
  currentGame.letters = lengthOfWord,
  currentGame.isUnique = isUnique,
  currentGame.startTime = new Date()

  return {
    startTime: currentGame.startTime,
    letters: currentGame.letters,
    isUnique: currentGame.isUnique,
    gameId: currentGame.gameId,
    word: currentGame.word
  };
}

function checkWordGuess(gameId, guess) {
  console.log("currentgame " + currentGame.gameId);
  console.log("gameId sent " + gameId);
  if (currentGame.gameId !== gameId) {
    return "No such game"
  }

  const result = guessWord(guess, currentGame.word)

  return result;
}


export {
  createNewGame,
  checkWordGuess
}