import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

interface ThemeContextI {
  theme: THEME.LIGHT | THEME.DARK;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextI | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<THEME.LIGHT | THEME.DARK>(THEME.LIGHT);
  const toggleTheme = (): void => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme");
  }

  return context;
};
