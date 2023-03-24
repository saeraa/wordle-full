import { useState, useEffect, useContext } from "react";
import GameTimer from "./GameTimer";
import GameLetter from "./GameLetter";
import { Letter } from "../interfaces/Letter";
import { GameContext } from "../context/gameContext";

const GameBoard = () => {
	const { isUnique, allowedGuesses, numLetters, prevGuesses, currGuess } =
		useContext(GameContext);
	const emptyLetter = { letter: "", result: "" };
	const num = allowedGuesses * numLetters;
	const initialState = Array(num).fill(emptyLetter);

	const [letters, setLetters] = useState<Letter[]>(initialState);

	useEffect(() => {
		const previous = prevGuesses.flat();
		//console.log("prev ", previous);

		// prevGuesses.forEach((array) => {
		// 	console.log(array);
		// });

		const thing: Letter[] = currGuess.split("").map((letter) => ({
			letter: letter,
			result: ""
		}));

		// set list of letters to previous guesses, followed by current guess and then pad the remainder of the array with blank letters
		setLetters(() => {
			let newArray = new Array(...previous, ...thing);
			const prevlength = newArray.length;
			newArray.length = num;
			return newArray.fill(emptyLetter, prevlength);
		});
	}, [currGuess]);

	//console.log("letters: ", letters);

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

	const gridClasses = `grid ${numCols} ${numRows} max-w-md gap-2 xs:gap-3 text-md xs:text-xl sm:text-2xl sm:text-4xl font-mono font-extrabold m-auto mb-5 p-1 sm:p-2`;

	return (
		<div>
			<h1 className="text-center text-2xl font-semibold tracking-wider p-3">
				Current game
			</h1>
			<div className="px-2 mx-auto flex max-w-xs justify-between">
				<span
					className={
						isUnique
							? "text-center text-sm lowercase flex items-center text-neutral-300 line-through"
							: "text-center text-sm lowercase flex items-center text-neutral-300"
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
