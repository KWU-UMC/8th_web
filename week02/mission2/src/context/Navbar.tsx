import { THEME, useTheme } from "./ThemeProvider";
import ThemeToggleBtn from "./ThemeToggleButton";
import clsx from "clsx";

export default function Navbar() {
  const { theme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        'p-4 w-full flex justify-end',
        isLight ? 'bg-white' : 'bg-gray-800'
      )}
    >
      <ThemeToggleBtn />
    </nav>
  );
}