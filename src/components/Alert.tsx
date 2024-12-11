import { useContext, useEffect } from "react";
import classes from "./Alert.module.css";
import ThemeContext from "../context/ThemeContext";
import { CONSTANTS } from "../constants";

export interface AlertProps {
  message: string;
  type: string;
  onClose?: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`${classes.alert} ${classes[type]} ${theme === CONSTANTS.THEME.DARK ? classes.darkMode : ""}`} 
        role="alert"  
        aria-live="assertive"  
        aria-atomic="true">
        <p>{message}</p>
    </div>
  );
};

export default Alert;
