import { NavLink } from "react-router-dom";

const NavBar = () => {
  return ( 
	<div className="bg-stone-900/70 m-0 text-purple-300 font-sans shadow w-full">
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-4">
        <div>
          <NavLink to="/" className="tracking-wide text-2xl sm:text-3xl font-bold font-mono uppercase hover:text-stone-300 "
          >Wordle</NavLink>
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:flex sm:items-center gap-4 sm:border-0 border-t-2 mt-4 pt-4 sm:m-0 sm:p-0 text-md sm:text-lg">
          <NavLink to="/game"
           className={({ isActive }) => isActive ? 
           "text-md text-purple-400 font-semibold hover:text-stone-300 mr-4" : 
           "text-md font-semibold hover:text-stone-300 mr-4"}>game</NavLink>
          <NavLink to="/information"
           className={({ isActive }) => isActive ? 
           "text-md text-purple-400 font-semibold hover:text-stone-300 mr-4" : "text-md font-semibold hover:text-stone-300 mr-4"}>information</NavLink>
          <a href="#"
           className="text-md font-semibold hover:text-stone-300 mr-4">highscore</a>
        </div>

      </div>
      
       {/* <div className="flex sm:hidden border-t-2 border-neutral-400 py-2">
        <div className="flex flex-col gap-2">
          <a href="#" className="text-purple-300 text-sm font-semibold hover:text-stone-300 mb-1">game</a>
          <a href="#" className="text-purple-300 text-sm font-semibold hover:text-stone-300 mb-1">information</a>
          <a href="#" className="text-purple-300 text-sm font-semibold hover:text-stone-300 mb-1">highscore</a>
          
        </div>
      </div>  */}
    </div>
  </div>
  )
}

export default NavBar;