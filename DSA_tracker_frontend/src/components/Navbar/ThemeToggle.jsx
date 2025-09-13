import React from "react";
import { FaMoon} from "react-icons/fa";
import { HiOutlineSun } from "react-icons/hi";
import { setTheme } from "../../utils/theme";

export default function ThemeToggle({ size = 32, className = "" }) {
  const [theme, setThemeState] = React.useState(
    localStorage.getItem("dsa_theme") || "light"
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
    localStorage.setItem("dsa_theme", next);
  };
  return (
    <button
      className={` flex items-center justify-center py-1 px-1 rounded-full  bg-gray-100/60 dark:bg-gray-800/60 hover:bg-blue-100 hover:scale-110
        dark:hover:bg-blue-900/20 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200
        ${className} `} onClick={toggle} tabIndex={0} >
      
       {theme === "dark" ? (
        <HiOutlineSun className={`w-6 h-6 text-white transition`} />
      ) : (
        <FaMoon className={`w-5 h-5 text-blue-700  transition`} />
      )}
    </button>
  );
}
