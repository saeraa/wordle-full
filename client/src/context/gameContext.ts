import { createContext, useContext } from "react";
import { LetterGroup } from "../interfaces/Letter";

interface GameContextType {
	startGame: () => void;
	showStartModal: boolean;
	correctWord: string;
	setShowStartModal: React.Dispatch<React.SetStateAction<boolean>>;
	checkGuess: () => void;
  resetGame: () => void;
  error: boolean;
  errorText: string;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
	startTime: Date;
	gameId: string;
	gameWon: boolean;
	gameOn: boolean;
	allowedGuesses: number;
	prevGuesses: Array<LetterGroup>;
	currGuess: string;
	guessedLetters: LetterGroup;
	isUnique: boolean;
	numLetters: number;
	setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
	setIsUnique: React.Dispatch<React.SetStateAction<boolean>>;
	setNumLetters: React.Dispatch<React.SetStateAction<number>>;
	setCurrGuess: React.Dispatch<React.SetStateAction<string>>;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

const useGame = () => {
	const gameContext = useContext(GameContext);

	if (!GameContext) {
		throw new Error("useGame has to be used within <GameContext.Provider>");
	}

	return gameContext;
};

export { GameContext, useGame };
