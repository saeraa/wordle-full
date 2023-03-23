import IconClose from "../assets/icon-close.svg";
import IconStar from "../assets/icon-star.svg";

type GameModalProps = {
  onClose: () => void
}

const GameModal = ({ onClose }: GameModalProps) => {
  const startGame = () => {
    onClose();
    console.log("Game started!");
  }
	return (
		<div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40">
			<div className="modal fixed top m-auto w-full max-w-xs bg-neutral-800 p-4 sm:p-10 rounded-md">
				<div className="relative text-neutral-200 flex flex-col gap-4">
					<h2 className="text-purple-200 my-2 text-xl font-semibold">You won!</h2>

          <div className="flex gap-2 text-md items-center">
          
          <img src={IconStar} alt="" className="w-4 mr-1 cursor-pointer" /> 

          </div>
          <button className="primary mt-5" onClick={startGame}>Let's go!</button>
					
				</div>
				<button onClick={onClose} className="absolute top-2 right-2">
					<img src={IconClose} alt="" />
				</button>
			</div>
		</div>
	);
};

export default GameModal;
