import { createContext } from 'react';

export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});
