import React, { FunctionComponent, useState, MutableRefObject, useContext } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
//import "react-simple-keyboard/build/css/index.css";
import { GameContext } from "../context/gameContext";


interface IProps {
	onChange: (input: string) => void;
	keyboardRef: MutableRefObject<KeyboardReactInterface>;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
	onChange,
	keyboardRef
}) => {
	const {guessedLetters, numLetters} = useContext(GameContext);

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


	  const handleKeyPress = (e: string) => {
			if (e === "{enter}") {
				console.log("Submitting guess! Clearing input!");
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
