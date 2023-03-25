import KeyboardComponent from "../components/Keyboard";
import GameBoard from "../components/GameBoard";
import { useContext } from "react";
import { createPortal } from "react-dom";
import StartModal from "../components/GameStartModal";
import WonModal from "../components/GameWonModal";
import LostModal from "../components/GameLostModal";
import Error from "../components/Error";
import { GameContext } from "../context/gameContext";

const Game = () => {
	const { error, errorText, gameWon, setGameWon, showStartModal, gameLost, setShowStartModal } = useContext(GameContext);

	return (
		<div className="max-w-2xl my-4 bg-neutral-500 mx-auto pt-2 pb-8">
			{showStartModal &&
				createPortal(
					<StartModal />,
					document.body
				)}
			{gameWon &&
				createPortal(
					<WonModal onClose={() => setGameWon(false)} />,
					document.body
				)}
			{gameLost &&
				createPortal(
					<LostModal />,
					document.body
				)}


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
	);
};

export default Game;
