import clsx from "clsx";
import { THEME, useTheme } from "./themeprovider";

export default function Themecontent({ counter }: { counter: number }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <div className={clsx("p-4 h-dvh", isLight ? "bg-white" : "bg-gray-800")}>
      ThemeContent
    </div>
  );
}
