import { useState, useEffect } from "react";
import { GameContext } from "./context/gameContext";
import axios, { AxiosRequestConfig } from "axios";
import { createPortal } from "react-dom";
import GameBoard from "./components/GameBoard";
import KeyboardComponent from "./components/Keyboard";
import StartModal from "./components/GameStartModal";
import WonModal from "./components/GameWonModal";
import LostModal from "./components/GameLostModal";
import Error from "./components/Error";

function App() {
	const [showStartModal, setShowStartModal] = useState(true);
	const [gameWon, setGameWon] = useState(false);
	const [gameLost, setGameLost] = useState(false);
	const [isUnique, setIsUnique] = useState(false);
	const [gameOn, setGameOn] = useState(false);
	const [error, setError] = useState(false);
	const [numLetters, setNumLetters] = useState(5);
	const [gameId, setGameId] = useState<string>("");
	const [currGuess, setCurrGuess] = useState("");
	const [correctWord, setCorrectWord] = useState("");
	const [errorText, setErrorText] = useState("");
	const [prevGuesses, setPrevGuesses] = useState([]);
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [startTime, setStartTime] = useState(new Date());

	useEffect(() => {
		if (showStartModal) resetGame();
	}, [showStartModal]);

	const allowedGuesses = 6;

	const startGame = async () => {
		const fetchData = async (params: AxiosRequestConfig) => {
			try {
				const response = await axios.request(params);

				if (response.status === 200) {
					setShowStartModal(false);
				}

				//TODO if response.status == something else, do something

				setGameId(response.data.gameId);
				setStartTime(new Date(response.data.startTime));
				setGameOn(true);
			} catch (err: unknown) {
				// console.log(err);
			} finally {
				// console.log("finally!");
			}
		};

		const options = {
			method: "get",
			url: `api/word?length=${numLetters}&unique=${isUnique}`,
			headers: {
				accept: "Application/json"
			}
		};

		fetchData(options);
	};

	function resetGame() {
		setGameLost(false);
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
		setShowStartModal(true);
		setCorrectWord("");
	}

	async function checkGuess() {
		const fetchData = async (params: AxiosRequestConfig) => {
			try {
				const result = await axios.request(params);

				if (result.data == "No such word") {
					setError(true);
					setErrorText("No such word: " + currGuess);
					return;
				}

				const guessResult = result.data;

				setGuessedLetters((prev) => {
					return [...prev, ...guessResult];
				});
				setPrevGuesses((prev) => {
					return [...prev, guessResult];
				});

				for (const guessedLetter of guessResult) {
					// check through the result, if the letters are all correct, then game won
					// if any letter is not correct, then check if there is a correctWord in the result
					if (
						guessedLetter.hasOwnProperty("letter") &&
						guessedLetter.result !== "correct"
					) {
						if (
							result.data[result.data.length - 1].hasOwnProperty("correctWord")
						) {
							const correctWord = result.data[result.data.length - 1];
							setCorrectWord(correctWord.correctWord);
							setGameLost(true);
							return;
						}
						setCurrGuess("");
						return;
					}
				}

				setCorrectWord(currGuess);
				setGameWon(true);
				setGameOn(false);
			} catch (err: any) {
				//console.log(err);
			} finally {
				//console.log("finally");
			}
		};

		const options = {
			method: "post",
			url: `api/guess`,
			headers: {
				accept: "*/*",
				"Content-Type": "application/json"
			},
			data: {
				gameId: gameId,
				guess: currGuess
			}
		};

		await fetchData(options);
	}

	const updateGuessedLetters = () => {
		const prevGuessesFlattened = prevGuesses.flat();
		let guessesNow = currGuess.split("").map((letter) => {
			return {
				letter: letter,
				result: ""
			};
		});
		prevGuessesFlattened.concat(guessesNow);
		setGuessedLetters([...prevGuessesFlattened, ...guessesNow]);
	};

	useEffect(() => {
		updateGuessedLetters();
	}, [currGuess]);

	return (
		// <div className="App">
		<GameContext.Provider
			value={{
				startGame,
				correctWord,
				setShowStartModal,
				checkGuess,
				resetGame,
				setError,
				errorText,
				setErrorText,
				startTime,
				gameWon,
				prevGuesses,
				gameId,
				gameOn,
				allowedGuesses,
				currGuess,
				setCurrGuess,
				isUnique,
				setIsUnique,
				numLetters,
				setNumLetters,
				guessedLetters
			}}
		>
			<div className="max-w-2xl my-4 bg-neutral-500 mx-auto pt-2 pb-8">
				{showStartModal && createPortal(<StartModal />, document.body)}
				{gameWon &&
					createPortal(
						<WonModal onClose={() => setGameWon(false)} />,
						document.body
					)}
				{gameLost && createPortal(<LostModal />, document.body)}

				<GameBoard />

				<KeyboardComponent />

				{error && <Error>{errorText}</Error>}

				<div className="flex">
					<button
						onClick={() => setShowStartModal(true)}
						className="m-auto text-purple-300"
					>
						Start a new game
					</button>
				</div>
			</div>
		</GameContext.Provider>
		// </div>
	);
}

export default App;
