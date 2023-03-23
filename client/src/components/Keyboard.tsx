import { FunctionComponent, useState, useRef, ChangeEvent, useContext, useEffect } from "react";
import KeyboardWrapper from "./KeyboardWrapper";
import { GameContext } from "../context/gameContext";

const KeyboardComponent: FunctionComponent = () => {
	const {currGuess,setCurrGuess, numLetters} = useContext(GameContext);
  const [input, setInput] = useState("");
  const keyboard = useRef(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value.toUpperCase();
    if (input.length >= numLetters) {
      return
    }
    setInput(input);
    //console.log(input);
    // setCurrGuess("" + input);
    //console.log("current guess is ", currGuess)
    
    keyboard.current.setInput(input);
  };

  useEffect(() => {
    console.log("input : " + input)
    setCurrGuess(input)
  }, [input]);


  return (
    <div className="max-w-lg m-auto p-1">
      <input className="text-black"
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={e => onChangeInput(e)}
      />
      <KeyboardWrapper keyboardRef={keyboard} onChange={setInput} />
    </div>
  );
};

export default KeyboardComponent;
