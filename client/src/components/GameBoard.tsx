import { useState, useEffect, useContext } from "react";
import GameTimer from "./GameTimer";
import GameLetter from "./GameLetter";
import { Letter } from "../interfaces/Letter";
import { GameContext } from "../context/gameContext";

const GameBoard = () => {
	const {
		isUnique,
		allowedGuesses,
		numLetters,
		prevGuesses,
		currGuess,
		gameOn
	} = useContext(GameContext);
	const emptyLetter = { letter: "", result: "" };
	const num = allowedGuesses * numLetters;
	const initialState = Array(num).fill(emptyLetter);

	const [letters, setLetters] = useState<Letter[]>(initialState);

	useEffect(() => {
		const previous = prevGuesses.flat();

		const currentGuessedLetters: Letter[] = currGuess
			.split("")
			.map((letter) => ({
				letter: letter,
				result: ""
			}));

		// set list of letters to previous guesses, followed by current guess and then pad the remainder of the array with blank letters
		setLetters(() => {
			let newArray = new Array(...previous, ...currentGuessedLetters);
			const prevlength = newArray.length;
			newArray.length = num;
			return newArray.fill(emptyLetter, prevlength);
		});
	}, [currGuess, gameOn, prevGuesses]);

	const letterElement = letters.map((letter, i) => {
		// if for some reason the array is longer than it's supposed to be, don't show extra letters
		if (i > num - 1) {
			return null;
		}
		return (
			<GameLetter
				key={letter.letter + i}
				letter={letter.letter}
				result={letter.result}
			/>
		);
	});

	// this is for displaying the correct amount of rows and cols in the grid depending on amount of letters chosen
	let numCols = `grid-c-${numLetters}`;
	let numRows = `grid-r-${allowedGuesses}`;

	useEffect(() => {
		numCols = `grid-c-${numLetters}`;
		numRows = `grid-r-${allowedGuesses}`;
	}, [numLetters, allowedGuesses]);

	const gridClasses = `grid ${numCols} ${numRows} max-w-md gap-2 xs:gap-3 text-3xl xs:text-4xl font-mono font-extrabold m-auto mb-5 p-1`;

	return (
		<div>
			<div className="px-2 mx-auto flex max-w-xs justify-between">
				<span
					className={
						isUnique
							? "text-center text-sm lowercase flex items-center text-neutral-300"
							: "text-center text-sm lowercase flex items-center text-neutral-300 line-through"
					}
				>
					Using unique letters
				</span>
				<GameTimer />
			</div>
			<div className={gridClasses}>{letterElement}</div>
		</div>
	);
};

export default GameBoard;
