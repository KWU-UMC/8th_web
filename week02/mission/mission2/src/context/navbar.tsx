import { useContext } from "react";
import { THEME, useTheme } from "./themeprovider";
import ThemeToggleBtn from "./themetogglebtn";
import clsx from "clsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLight ? "bg-white" : "bg-gray-800"
      )}
    >
      <ThemeToggleBtn />
    </nav>
  );
}
