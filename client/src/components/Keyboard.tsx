import {
	FunctionComponent,
	useState,
	useRef,
	ChangeEvent,
	useContext,
	useEffect
} from "react";
import KeyboardWrapper from "./KeyboardWrapper";
import { GameContext } from "../context/gameContext";

const KeyboardComponent: FunctionComponent = () => {
	const { setCurrGuess, gameOn } = useContext(GameContext);
	const [input, setInput] = useState("");
	const keyboard = useRef(null);

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
		// if game hasn't started, don't do anything
		if (!gameOn) return;

		const input = event.target.value.toUpperCase();

		setInput(input);

		keyboard.current.setInput(input);
	};

	useEffect(() => {
		setCurrGuess(input);
	}, [input]);

	return (
		<div className="max-w-lg m-auto p-1">
			<input
				className="text-black hidden"
				value={input}
				placeholder={"Tap on the virtual keyboard to start"}
				onChange={(e) => onChangeInput(e)}
			/>
			<KeyboardWrapper keyboardRef={keyboard} onChange={setInput} />
		</div>
	);
};

export default KeyboardComponent;
