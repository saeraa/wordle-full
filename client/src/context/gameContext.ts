import { createContext, useContext } from "react";
import {Letter, LetterGroup} from "../interfaces/Letter";

interface GameContextType {
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
  setGameOn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUnique: React.Dispatch<React.SetStateAction<boolean>>;
  setPrevGuesses: React.Dispatch<React.SetStateAction<any[]>>
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  setNumLetters: React.Dispatch<React.SetStateAction<number>>;
  setCurrGuess: React.Dispatch<React.SetStateAction<string>>;
  setGuessedLetters: React.Dispatch<React.SetStateAction<any[]>>;
  setStartTime: React.Dispatch<React.SetStateAction<Date>>;

}

// const GameContext = createContext<GameContextType | null>(null);
const GameContext = createContext<GameContextType>({} as GameContextType);

const useGame = () => {
  const gameContext = useContext(GameContext);

  if (!GameContext) {
    throw new Error(
      "useGame has to be used within <GameContext.Provider>"
    );
  }

  return GameContext;
};

export { GameContext, useGame }