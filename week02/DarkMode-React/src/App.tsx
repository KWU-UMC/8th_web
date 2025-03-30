import { useDarkMode } from "../context/DarkModeProvider";

const App = () => {
  const { isDarkMode, handleDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex flex-col items-center justify-center h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
        <h1 className="text-2xl mb-4">
          {isDarkMode ? "다크모드" : "라이트모드"}
        </h1>
        <button
          onClick={handleDarkMode}
          className="px-4 py-2 text-white rounded dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 transition"
        >
          {isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
        </button>
      </div>
    </div>
  );
};

export default App;
