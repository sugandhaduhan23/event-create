import { createContext, useState, useEffect, ReactNode } from "react";
import { CONSTANTS } from "../constants";

const ThemeContext = createContext({
  theme: CONSTANTS.THEME.LIGHT,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(CONSTANTS.THEME.THEME) || CONSTANTS.THEME.LIGHT;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === CONSTANTS.THEME.LIGHT ? CONSTANTS.THEME.DARK : CONSTANTS.THEME.LIGHT));  
  };

  useEffect(() => {
    localStorage.setItem(CONSTANTS.THEME.THEME, theme);
    document.body.classList.toggle(CONSTANTS.THEME.DARK_MODE, theme === CONSTANTS.THEME.DARK);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
