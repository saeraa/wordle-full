import { Letter } from "../interfaces/Letter";

const GameLetter = ({ letter, result }: Letter) => {
  const currentLetter: string = letter;
  const styling = "bg-neutral-600/80 flex place-content-center content-center justify-center flex-wrap rounded border-neutral-800 border-solid border-2 aspect-square"

  return (<div className={styling + " " + result}>{currentLetter}</div>)
}

export default GameLetter;