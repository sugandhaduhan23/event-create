import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import styles from './Input.module.css'
import { CONSTANTS } from '../constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string
}

export default function Input({ label, error, ...props } : InputProps) {
  const { theme } = useContext(ThemeContext);
    return (
      <div className={`w-100 ${theme === CONSTANTS.THEME.DARK ? styles.darkMode : ""}`}>
        {label && <label className={styles.label} htmlFor={props.id}>{label}</label>}
        <input className={styles.input} {...props} aria-describedby={error ? `${props.id}-error` : undefined}/>
        {error && <div id={`${props.id}-error`} className="message error">{error}</div>}
      </div>
    );
}
  
