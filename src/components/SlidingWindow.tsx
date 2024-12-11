import { ReactNode, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SlidingWindow.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ThemeContext from "../context/ThemeContext";
import { CONSTANTS } from "../constants";

interface SlidingWindowProps{
  isOpen: boolean;
  title?: string
  className?: string;
  onClose ?:()=> void;
  children: ReactNode;
}

const SlidingWindow = ({isOpen, title= "",onClose, children, className}: SlidingWindowProps) => {
  const { theme } = useContext(ThemeContext);
  const [open, setIsOpened] = useState(isOpen);

  useEffect(() => {
    setIsOpened(isOpen);
  }, [isOpen]);

  const closeHandler = () => {
    setIsOpened(false);
    if(onClose)
        onClose();
  };

  return createPortal(
    <div className={`${theme === CONSTANTS.THEME.DARK ? styles.darkMode : ""}`}>
      {open && <div className={styles.backdrop} onClick={closeHandler}></div>}
      <div className={`${className} ${styles.slidingWindow} ${open ? styles.active : ""}`} role="dialog" aria-hidden={!open}  aria-modal="true" aria-labelledby={title ? "Sliding Window Modal" : undefined}>
        <header>
          <IoIosCloseCircleOutline size={30} onClick={closeHandler}  aria-label="Close sliding window" />
        </header>
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </div>, 
    document.getElementById("sliding-window")!
  );
};

export default SlidingWindow;
