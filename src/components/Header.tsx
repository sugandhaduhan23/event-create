import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import styles from './Header.module.css';
import { CONSTANTS } from "../constants";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${styles.header} ${theme === CONSTANTS.THEME.DARK ? styles.darkMode : ""}`}>
        <div onClick={toggleTheme} className={styles.themeToggle} aria-label={theme === CONSTANTS.THEME.DARK ? CONSTANTS.THEME.SWITCH_TO_LIGHT : CONSTANTS.THEME.SWITCH_TO_DARK }>
          {theme === CONSTANTS.THEME.DARK  ? <IoSunnyOutline /> : <IoMoonOutline />}
      </div>
    </header>
  );
}

