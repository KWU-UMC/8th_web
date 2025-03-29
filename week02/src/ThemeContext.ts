import {createContext} from "react";

export interface ThemeContextType {
	isDark: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
