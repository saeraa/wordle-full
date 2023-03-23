import IconAlert from "../assets/icon-alert.svg"
import { useNavigate } from "react-router-dom";
import Button from "./Button";


/* className="flex items-center justify-center w-1/2 px-5 py-2 text-sm transition-colors duration-200 rounded-lg gap-x-2 sm:w-auto hover:bg-neutral-900/80 bg-neutral-900 text-neutral-200"*/
const Error404 = () => {
  const navigate = useNavigate();
  return ( 
    <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:justify-center lg:items-center">
        <div className="w-full h-full lg:max-w-xl lg:max-h-lg p-4 bg-neutral-800 mx-auto">
             <img src={IconAlert} alt="" className="w-12" />
            <p className="text-sm font-medium text-purple-300">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Page not found</h1>
            <p className="mt-4 text-neutral-400">Sorry, the page you are looking for doesn't exist. Here are some helpful links:</p>

            <div className="flex mt-6 gap-x-3 flex-col sm:flex-row gap-2">
                <Button buttonType={"secondary"}
                 onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>Go back</span>
                </Button>

                <Button buttonType={"primary"} onClick={() => navigate("/")}>
                    Take me home
                </Button>
            </div>
        </div>
                {/* <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-purple-700 rounded-lg shrink-0 sm:w-auto hover:bg-purple-800"
                onClick={() => navigate("/")}> */}

    </div>
  )
}

export default Error404;