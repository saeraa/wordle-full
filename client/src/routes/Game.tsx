import KeyboardComponent from "../components/Keyboard";
import GameBoard from "../components/GameBoard";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../components/GameStartModal";

const Game = () => {
	const [showModal, setShowModal] = useState(true);

	return (
		<div className="max-w-2xl my-4 bg-neutral-500 mx-auto pt-2 pb-8">
			{showModal &&
				createPortal(
					<Modal onClose={() => setShowModal(false)} />,
					document.body
				)}
			<GameBoard />
			<KeyboardComponent />

			<div className="flex">
				<button onClick={() => setShowModal(true)} className="m-auto text-purple-300">
					Start a new game
				</button>
			</div>
		</div>
	);
};

export default Game;
