import Game from "./routes/Game";
import { useState, useEffect } from "react";
import { GameContext } from "./context/gameContext";
import axios, { AxiosRequestConfig } from "axios";

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
	}, [showStartModal])

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
				console.log(err);
			} finally {
				console.log("finally!");
			}
		};

		const options = {
			method: "get",
			url: `http://localhost:5080/api/word?length=${numLetters}&unique=${isUnique}`,
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
				console.log(result);

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

				
				console.log("line 101: ", currGuess)
				for (const guessedLetter of guessResult) {
					// check through the result, if the letters are all correct, then game won
					// if any letter is not correct, then check if there is a correctWord in the result
					if (guessedLetter.hasOwnProperty("letter") && guessedLetter.result !== "correct") {
						if (guessedLetter.correctWord) {
							if (result.data[result.data.length - 1].hasOwnProperty("correctWord")) {
								console.log("gameLost ", gameLost)
								const correctWord = result.data[result.data.length - 1]
								setCorrectWord(correctWord.correctWord);
								setGameLost(true);
								console.log("gameLost ", gameLost)
							}
							break;
						}
						setCurrGuess("");
						return;
					} 
					// else if (guessedLetter.result === "incorrect" || "misplaced") 
					// {
					// 	setCurrGuess("");
					// }
				}
				console.log("line 110: ", currGuess)

				if (prevGuesses.length === allowedGuesses) {


					//TODO :: DO SOMETHING
					// add guess check on backend, and if guesses === allowed, return correctWord
					//setGameLost(true);


				}

				setCorrectWord(currGuess);
				console.log("current GUESS ", currGuess)
				setGameWon(true);
				console.log("GameWONNNN!");
				setGameOn(false);

			} catch (err: any) {
				console.log(err);
			} finally {
				console.log("current GUESS ", currGuess)
				console.log("finally");
			}
		};

		const options = {
			method: "post",
			url: `http://localhost:5080/api/guess`,
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
		<div className="App">
			<GameContext.Provider
				value={{
					gameLost,
					startGame,
					correctWord,
					showStartModal,
					setShowStartModal,
					checkGuess,
					resetGame,
					error,
					setError,
					errorText,
					setErrorText,
					startTime,
					gameWon,
					setGameWon,
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
					guessedLetters,
				}}
			>
				<Game />
			</GameContext.Provider>
		</div>
	);
}

export default App;
