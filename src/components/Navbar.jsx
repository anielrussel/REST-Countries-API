import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const [theme, setTheme] = useState(null);
  const [dark, setDark] = useState(false);

  const setLocalStorageTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };
  

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []);
  

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleDark = () => {
    setDark(!dark);
    setTheme(theme === "dark" ? "light" : "dark");
    setLocalStorageTheme(theme === "dark" ? "light" : "dark");
  };
  

  return (
    <div
      className={`fixed top-0 w-full z-[81] bg-white ${
        theme === "dark" ? "dark:bg-[#2B3945] dark:text-white" : ""
      }`}
    >
      <nav className="flex justify-between items-center font-Nunito py-8 px-5 md:px-16 shadow-md">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">Where in the world?</h1>
        </div>
        <div className="cursor-pointer" onClick={handleDark}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={dark ? faSun : faMoon} size="xl" />
            <h1 className="font-semibold">
              {dark ? "Light Mode" : "Dark Mode"}
            </h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
