import React, {useContext} from "react";
import { ThemeContext } from "../App";
import darkMoon from "../images/dark-moon.svg"
import lightMoon from "../images/light-moon.svg";


function Navbar() {
    const {toogleTheme, theme} = useContext(ThemeContext)

  return (
    <nav className="nav">
      <p>Where in the world?</p>
      <div className="view-button" onClick={() => {toogleTheme()}}>
        <img src={theme === "light" ? lightMoon:darkMoon}/>
        <span>Dark Mode </span>
    </div>
    </nav>
  );
}

export default Navbar;
