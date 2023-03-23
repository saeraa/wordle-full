import { Link, useNavigate } from "react-router-dom"
import IconGame from "../assets/icon-game.svg";
import Button from "../components/Button";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full max-w-full p-4 m-4 bg-neutral-800">
    <h1 className="p-2 sm:p-3 bg-neutral-600 font-mono font-semibold uppercase">hello!</h1>
    <p className="p-4">Welcome to our Wordle-clone app!</p>
    <p className="p-4">If you love the classic game of Wordle, then you'll love our version that's been created using the latest web technologies. Our app is a fun and addictive game that challenges your word skills and vocabulary. </p>
    <p className="p-4">
    The objective of the game is simple: guess the hidden word by entering your own words and seeing how many letters match with the target word. With each guess, you'll receive feedback on how many letters are correct and how many are in the right position. Use this information to help you solve the puzzle and guess the target word in as few tries as possible! </p>
    <p className="p-4">Our app is easy to use and provides hours of entertainment for players of all ages. So what are you waiting for? Start playing now and see how many words you can guess correctly!</p>

    <Button buttonType={"primary my-10 mx-auto w-1/2"} onClick={() => navigate("/game")}>
    <img src={IconGame} className="mr-1" />
      Play here
    </Button> 

  </div>
  );
}

export default Welcome;