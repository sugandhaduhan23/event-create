import React, { useContext } from "react";
import styles from "./Select.module.css";
import ThemeContext from "../context/ThemeContext";
import { CONSTANTS } from "../constants";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  error?: string; 
}

function Select({ label, options, onChange, value, error }: SelectProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === CONSTANTS.THEME.DARK ? styles.darkMode : ""}`}>
      {label && <label className={styles.label} htmlFor="select">{label}</label>}
      <select className={styles.select} onChange={onChange} value={value} id="select" aria-labelledby={label ? "select" : undefined} aria-required="true" aria-describedby={error ? "error-message" : undefined} >
        <option value="" disabled>Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div id="error-message" className="message error">{error}</div>}
    </div>
  );
}

export default Select;
