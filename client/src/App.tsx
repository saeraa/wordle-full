import Game from "./routes/Game";
import { useState, useEffect } from "react";
import { GameContext } from "./context/gameContext";

function App() {
	const [gameWon, setGameWon] = useState(false);
	const [isUnique, setIsUnique] = useState(false);
	const [gameOn, setGameOn] = useState(false);
	const [error, setError] = useState(false);
	const [numLetters, setNumLetters] = useState(5);
	const [gameId, setGameId] = useState<string>("");
	const [currGuess, setCurrGuess] = useState("");
	const [errorText, setErrorText] = useState("");
	const [prevGuesses, setPrevGuesses] = useState([]);
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [startTime, setStartTime] = useState(new Date());

	function resetGame() {
		setGameWon(false);
		setGameOn(false);
		setIsUnique(false);
		setError(false);
		setNumLetters(5);
		setGameId("");
		setErrorText("");
		setCurrGuess("");
		setPrevGuesses([]);
		setGuessedLetters([]);
	}

	const updateGuessedLetters = () => {
		const test = new Set();
		test.add(2);
		const thing = prevGuesses.flat();
		let guessesNow = currGuess.split("").map((letter) => {
			return {
				letter: letter,
				result: ""
			};
		});
		// console.log("currGuess ", currGuess)
		// console.log("guessesNow ", guessesNow)
		thing.concat(guessesNow);
		// console.log("thing ", thing)
		setGuessedLetters([...thing, ...guessesNow]);
	};

	useEffect(() => {
		updateGuessedLetters();
	}, [currGuess]);

	console.log("guessed", guessedLetters);

	return (
		<div className="App">
			<GameContext.Provider
				value={{
					resetGame,
					error,
					setError,
					errorText, setErrorText,
					startTime,
					setStartTime,
					gameWon,
					setGameWon,
					prevGuesses,
					setPrevGuesses,
					gameId,
					setGameId,
					gameOn,
					setGameOn,
					allowedGuesses: 6,
					currGuess,
					setCurrGuess,
					isUnique,
					setIsUnique,
					numLetters,
					setNumLetters,
					guessedLetters,
					setGuessedLetters
				}}
			>
				<Game />
			</GameContext.Provider>
		</div>
	);
}

export default App;

// [[
// {
// 	letter: "A",
// 	result: "correct"
// },
// {
// 	letter: "B",
// 	result: "misplaced"
// },
// {
// 	letter: "C",
// 	result: "incorrect"
// },
// {
// 	letter: "D",
// 	result: "incorrect"
// },
// {
// 	letter: "E",
// 	result: "incorrect"
// },
// {
// 	letter: "E",
// 	result: "correct"
// },
// {
// 	letter: "F",
// 	result: "incorrect"
// }
// ],
// [
// {
// 	letter: "A",
// 	result: "correct"
// },
// {
// 	letter: "C",
// 	result: "incorrect"
// },
// {
// 	letter: "C",
// 	result: "incorrect"
// },
// {
// 	letter: "D",
// 	result: "incorrect"
// },
// {
// 	letter: "E",
// 	result: "incorrect"
// },
// {
// 	letter: "E",
// 	result: "correct"
// },
// {
// 	letter: "F",
// 	result: "incorrect"
// }
// ],
// [
// {
// 	letter: "A",
// 	result: "incorrect"
// },
// {
// 	letter: "B",
// 	result: "incorrect"
// },
// {
// 	letter: "C",
// 	result: "incorrect"
// },
// {
// 	letter: "D",
// 	result: "correct"
// },
// {
// 	letter: "E",
// 	result: "incorrect"
// },
// {
// 	letter: "E",
// 	result: "correct"
// },
// {
// 	letter: "F",
// 	result: "incorrect"
// }
// ]
// ]
// [
// {
// letter: "A",
// result: "correct"
// },
// {
// letter: "B",
// result: "misplaced"
// },
// {
// letter: "C",
// result: "incorrect"
// },
// {
// letter: "D",
// result: "incorrect"
// },
// {
// letter: "E",
// result: "incorrect"
// },
// {
// letter: "E",
// result: "correct"
// }
// ]
