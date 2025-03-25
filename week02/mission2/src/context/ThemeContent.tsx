import clsx from "clsx";
import { THEME, useTheme } from "./ThemeProvider";

export default function ThemeContent({ counter }: { counter: number }) {
  const { theme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <div className={clsx('p-4 h-dvh w-full', isLight ? 'bg-white' : 'bg-gray-800')}>
      <h1 className={clsx('text-wxl font-bold', isLight ? 'text-black' : 'text-white')}>Theme Content</h1>
    </div>
  );
}