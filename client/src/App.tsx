import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { GameContext } from "./context/gameContext";
import {Letter} from "./interfaces/Letter";

function App() {
	const [gameWon, setGameWon] = useState(false);
	const [isUnique, setIsUnique] = useState(false);
	const [gameOn, setGameOn] = useState(false);
	const [prevGuesses, setPrevGuesses] = useState([[
		{
			letter: "A",
			result: "correct"
		},
		{
			letter: "B",
			result: "misplaced"
		},
		{
			letter: "C",
			result: "incorrect"
		},
		{
			letter: "D",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "correct"
		},
		{
			letter: "F",
			result: "incorrect"
		}
	],
	[
		{
			letter: "A",
			result: "correct"
		},
		{
			letter: "C",
			result: "incorrect"
		},
		{
			letter: "C",
			result: "incorrect"
		},
		{
			letter: "D",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "correct"
		},
		{
			letter: "F",
			result: "incorrect"
		}
	],
	[
		{
			letter: "A",
			result: "incorrect"
		},
		{
			letter: "B",
			result: "incorrect"
		},
		{
			letter: "C",
			result: "incorrect"
		},
		{
			letter: "D",
			result: "correct"
		},
		{
			letter: "E",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "correct"
		},
		{
			letter: "F",
			result: "incorrect"
		}
	]
]);
	const [gameId, setGameId] = useState("");
	const [numLetters, setNumLetters] = useState(7);
	const [currGuess, setCurrGuess] = useState("");
	const [guessedLetters, setGuessedLetters] = useState([
		{
			letter: "A",
			result: "correct"
		},
		{
			letter: "B",
			result: "misplaced"
		},
		{
			letter: "C",
			result: "incorrect"
		},
		{
			letter: "D",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "incorrect"
		},
		{
			letter: "E",
			result: "correct"
		}
	]);
	const [startTime, setStartTime] = useState(new Date());

	const updateGuessedLetters = () => {
		const test = new Set();
		test.add(2)
		const thing = prevGuesses.flat()
		let guessesNow = currGuess.split("").map(letter => {
			return {
				letter: letter,
				result: ""
			}
		})
		// console.log("currGuess ", currGuess)
		// console.log("guessesNow ", guessesNow)
		thing.concat(guessesNow)
		// console.log("thing ", thing)
		setGuessedLetters([...thing, ...guessesNow]);
	}

	useEffect(() => {
		updateGuessedLetters(); 
	}, [currGuess])

	console.log("guessed", guessedLetters)

	return (
		<div className="App">
			<GameContext.Provider
				value={{
					startTime, setStartTime,
					gameWon, setGameWon,
					prevGuesses, setPrevGuesses,
					gameId, setGameId,
					gameOn, setGameOn,
					allowedGuesses: 6,
					currGuess, setCurrGuess,
					isUnique, setIsUnique,
					numLetters, setNumLetters,
					guessedLetters, setGuessedLetters
				}}
			>
				<NavBar />
				<Outlet />
			</GameContext.Provider>
		</div>
	);
}

export default App;
