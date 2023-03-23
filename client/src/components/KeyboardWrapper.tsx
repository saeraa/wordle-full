import {AxiosRequestConfig} from "axios";
import React, { FunctionComponent, useState, MutableRefObject, useContext } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
//import "react-simple-keyboard/build/css/index.css";
import { GameContext } from "../context/gameContext";
import useAxios from "../utils/useAxios";
import axios from "axios";

interface IProps {
	onChange: (input: string) => void;
	keyboardRef: MutableRefObject<KeyboardReactInterface>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
	onChange,
	keyboardRef
}) => {
	const {guessedLetters, numLetters, gameId, currGuess} = useContext(GameContext);
	const options = {
    method: "post",
    url: `http://localhost:5080/api/guess`,
    headers: {
      accept: '*/*',
			'Content-Type': 'application/json'
    },
		data: {
			gameId: gameId,
			guess: currGuess
		}
  }
  //const { response, loading, error, sendData } = useAxios(options);

	const correctLetters = guessedLetters
	.filter(a => a.result === "correct")
	.reduce((prev,curr) => prev + " " + curr.letter, "")
	.toLowerCase();

	const incorrectLetters = guessedLetters
	.filter(a => a.result === "incorrect")
	.reduce((prev,curr) => prev + " " + curr.letter, "")
	.toLowerCase();

	const misplacedLetters = guessedLetters
	.filter(a => a.result === "misplaced")
	.reduce((prev,curr) => prev + " " + curr.letter, "")
	.toLowerCase();


	  const handleKeyPress = async (e: string) => {
			if (e === "{enter}") {
				console.log("Submitting guess: " + currGuess + "! Clearing input!");
				//console.log(sendData());

				const fetchData = async (params: AxiosRequestConfig) => {
					try {
						const result = await axios.request(params);
						console.log(result);
					} catch( err: any ) {
						console.log(err);
					} finally {
						console.log("finally");
					}
			 };

			 await fetchData(options);

				// while (loading) {
				// 	// do nothing
				// }
				// if (response.status === 200) {
				// 	console.log(response)
				// }
				keyboardRef.current.clearInput();
			}
	  }

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
