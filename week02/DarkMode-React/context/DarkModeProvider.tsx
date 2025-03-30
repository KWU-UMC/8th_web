import { createContext, useContext, useState, ReactNode } from "react";
import React from "react";

interface DarkModeContextProps {
  isDarkMode: boolean;
  handleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("DarkModeProvider 안에서 사용해야 함");
  }
  return context;
};

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
