import { ButtonHTMLAttributes, ReactNode, useContext } from "react";
import styles from "./Button.module.css";
import ThemeContext from "../context/ThemeContext";
import { CONSTANTS } from "../constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonType?: string;
  children: ReactNode;
}

export default function Button({className = "", buttonType = CONSTANTS.BUTTON_TYPE.PRIMARY, children, ...props}: ButtonProps) {
  const { theme } = useContext(ThemeContext);

  const buttonStyle =
    buttonType === CONSTANTS.BUTTON_TYPE.TEXT ? styles.textButton : styles.primaryButton;

  return (
    <button className={`${styles.buttonBase} ${buttonStyle} ${className} ${theme === CONSTANTS.THEME.DARK ? styles.darkMode : ""}`}{...props}>
      {children}
    </button>
  );
}
