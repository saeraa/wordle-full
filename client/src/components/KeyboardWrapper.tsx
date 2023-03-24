import { AxiosRequestConfig } from "axios";
import {
	FunctionComponent,
	MutableRefObject,
	useContext
} from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import { GameContext } from "../context/gameContext";
import axios from "axios";

interface IProps {
	onChange: (input: string) => void;
	keyboardRef: MutableRefObject<KeyboardReactInterface>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
	onChange,
	keyboardRef
}) => {
	const { guessedLetters, numLetters, gameId, currGuess, gameOn, setError, setErrorText, setGuessedLetters, setPrevGuesses, setCurrGuess, setGameWon, setGameOn } =
		useContext(GameContext);

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

	// for coloring the letters on the keyboard
	const correctLetters = guessedLetters
		.filter((a) => a.result === "correct")
		.reduce((prev, curr) => prev + " " + curr.letter, "")
		.toLowerCase();

	const incorrectLetters = guessedLetters
		.filter((a) => a.result === "incorrect")
		.reduce((prev, curr) => prev + " " + curr.letter, "")
		.toLowerCase();

	const misplacedLetters = guessedLetters
		.filter((a) => a.result === "misplaced")
		.reduce((prev, curr) => prev + " " + curr.letter, "")
		.toLowerCase();


	const handleKeyPress = async (e: string) => {
		// if game hasn't started, don't do anything
		if (!gameOn) return;

		if (e === "{enter}") {
			// don't send to the server if it's not a word of the proper length
			if (currGuess.length !== numLetters) return;

			console.log("Submitting guess: " + currGuess + "! Clearing input!");

			const fetchData = async (params: AxiosRequestConfig) => {
				try {
					const result = await axios.request(params);
					console.log(result);


					//TODO if result.data == "no such word" show error message
					if (result.data == "No such word") {
						setError(true);
						setErrorText("No such word: " + currGuess)
						return;
					}

					const guessResult = result.data;

					setGuessedLetters(prev => {
						return [...prev, ...guessResult]
					})
					setPrevGuesses(prev => {
						return [...prev, guessResult]
					})
					setCurrGuess("");
					


					//TODO else save result to previous guesses
					// add guessed letters
					// clear currGuess
					// 

					// check result for all correct

						for (const guessedLetter of guessResult) {
							if (guessedLetter.result !== "correct") {
								return;
							}
						}
						setGameWon(true);
						console.log("GameWONNNN!")
						setGameOn(false);



				} catch (err: any) {
					console.log(err);
				} finally {
					console.log("finally");
				}
			};

			await fetchData(options);

			// clear the keyboard cache
			keyboardRef.current.clearInput();
		}
	};

	return (
		<Keyboard
			onKeyPress={handleKeyPress}
			theme={"text-red-200 hg-theme-default"}
			display={{ "{backspace}": " ", "{enter}": " " }}
			physicalKeyboardHighlight={true}
			physicalKeyboardHighlightPress={true}
			physicalKeyboardHighlightTextColor={"rgb(240 240 240)"}
			physicalKeyboardHighlightBgColor={"rgb(115 115 115)"}
			debug={false}
			keyboardRef={(r) => (keyboardRef.current = r)}
			layoutName={"default"}
			onChange={(e) => {
				if (!gameOn) return;
				if (e.length > numLetters) {
					return;
				}
				onChange(e.toUpperCase());
			}}
			onRender={() => console.log("Rendered")}
			layout={{
				default: [
					"q w e r t y u i o p",
					"a s d f g h j k l {enter}",
					"z x c v b n m {backspace}"
				]
			}}
			buttonTheme={[
				{
					class: "correct",
					buttons: `${correctLetters}`
				},
				{
					class: "misplaced",
					buttons: `${misplacedLetters}`
				},
				{
					class: "incorrect",
					buttons: `${incorrectLetters}`
				}
			]}
		/>
	);
};

export default KeyboardWrapper;
