import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import ProfileAvatar from "./ProfileAvatar";
import { clearUser } from "../../features/auth/authSlice";
import logo from "../../assets/logo.png"; 

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = !!useSelector(state => state.auth.user);
  const isHome = location.pathname === "/" || location.pathname === "/home";

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("dsa_jwt");
    localStorage.removeItem("dsa_user");
    navigate("/login");
  };

  const handleToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <header className=" w-full flex items-center px-5 py-4 bg-transparent backdrop-blur-md border-none shadow-none min-h-[68px] relative z-40 ">
      <div
        onClick={handleGoHome}
        className="flex items-center gap-2 min-w-[160px] cursor-pointer">
        
        <img src={logo} alt="Skill Store Logo"
          className="h-7 w-7 sm:h-10 sm:w-10md:h-12 md:w-12 rounded-lg object-contain drop-shadow"
        />
        <span className=" ml-1 text-xl sm:text-3xl  md:text-4xl font-extrabold tracking-tight text-gray-700 dark:text-white underline ">
         Prep Buddy
        </span>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={handleGoHome}
          className=" text-xl sm:text-2xl md:text-3xl font-bold tracking-wide px-4 py-1 hover:underline
            text-gray-700 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-300
            transition ">
          Home
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-5 ml-auto">
        <ThemeToggle size={30} className="scale-110 sm:scale-125" />
        {!isLoggedIn ? (
          <>
            <Link to="/login"
              className=" px-3 sm:px-5 py-1 sm:py-2 text-sm sm:text-base font-semibold rounded-full border-2 border-blue-500
                text-white bg-blue-500  hover:bg-blue-600">
              Login
            </Link>
            <Link to="/signup"
              className="px-3 sm:px-5 py-1 sm:py-2 text-sm sm:text-base font-semibold rounded-full bg-purple-500 border-2 border-purple-500
                text-white  hover:bg-purple-600">
              Signup
            </Link>
          </>
        ) : (
          <>
            {isHome ? (
              <button onClick={handleToDashboard}
                className="px-3 sm:px-5 py-1 sm:py-2 text-sm sm:text-base font-semibold rounded-full border-2 border-blue-500
                  bg-blue-500 text-white hover:bg-blue-600 transition" >
                Dashboard
              </button>
            ) : (
              <button  onClick={handleLogout}
                className=" px-3 sm:px-5 py-1 sm:py-2 text-sm sm:text-base  font-semibold rounded-full border-2 border-red-500
                 bg-red-500 text-white hover:bg-red-600 transition " >
                Logout
              </button>
            )}
                 
              <ProfileAvatar size={40}  />

          </>
        )}
      </div>
    </header>
  );
}
