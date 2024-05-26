// Imports
import { useState } from "react";
import { SunDim, Moon } from "@phosphor-icons/react";


const DarkModeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`darkModeBtn ${isDarkMode ? "" : "dark"}`}>
      <div id="shape" className={`changer ${isDarkMode ? "" : "change"}`}></div>
      <div
        id="toggle"
        className={`changer ${isDarkMode ? "" : "change"}`}
        onClick={toggleDarkMode}
      >
        <div className={`cloud ${isDarkMode ? "" : "change"}`}></div>
        <div className={`star ${isDarkMode ? "" : "change"}`}></div>
        <div className={`sea ${isDarkMode ? "" : "change"}`}></div>
        <div className={`moon ${isDarkMode ? "" : "change"}`}></div>
        <div className={`sun ${isDarkMode ? "" : "change"}`}></div>
        <div className={`mountains ${isDarkMode ? "" : "change"}`}></div>
        <span className={`changer ${isDarkMode ? "" : "change"}`}>
          <div className={`moonIcon ${isDarkMode ? "" : "change"}`}>
            <Moon size={16} />
          </div>
          <div className={`sunIcon ${isDarkMode ? "" : "change"}`}>
            <SunDim size={16} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default DarkModeBtn;