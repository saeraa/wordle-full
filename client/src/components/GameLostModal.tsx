import IconClose from "../assets/icon-close.svg";
import IconRestart from "../assets/icon-restart.svg";
import { useContext } from "react";
import { GameContext } from "../context/gameContext";

type GameModalProps = {
	onClose: () => void;
};

const GameModal = ({ onClose }: GameModalProps) => {
	const { correctWord, resetGame } = useContext(GameContext);

	return (
		<div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-20">

			<div className="modal fixed top m-auto w-full max-w-md bg-neutral-800 p-4 sm:p-10 rounded-md">
				<div className="text-neutral-200 flex flex-col gap-4">
					<h2 className="text-purple-200 my-2 text-xl font-semibold flex items-center">
						<span>You lost</span>
						<span className="w-8 inline-block ml-2"> &#9785 </span>
					</h2>

					<div className="flex gap-2 text-md items-center">
						The word was: <span className="text-purple-200 font-bold">{correctWord}</span>.
					</div>

					<button className="primary mt-5 mx-auto px-8" onClick={resetGame}>
						<img src={IconRestart} alt="" />
						Try again
					</button>
				</div>
				<button onClick={onClose} className="absolute top-2 right-2">
					<img src={IconClose} alt="" />
				</button>
			</div>
		</div>
	);
};

export default GameModal;
