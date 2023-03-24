import { ReactNode, useContext } from "react";
import IconClose from "../assets/icon-close.svg";
import { GameContext } from "../context/gameContext";

type ErrorProps = {
	children: ReactNode;
};

const Error = ({ children }: ErrorProps) => {
	const { setError, setErrorText } = useContext(GameContext);

	function resetError() {
		setError(false);
		setErrorText("");
	}

	return (
		<div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center">
			<div className="bg-neutral-800 absolute py-2 pt-7 px-5 text-neutral-200 border-2 rounded-md shadow-lg border-purple-400">
				<img
					src={IconClose}
					alt="Close"
					className="absolute cursor-pointer top-1 right-1"
					onClick={() => resetError()}
				/>
				{children}
			</div>
		</div>
	);
};

export default Error;
