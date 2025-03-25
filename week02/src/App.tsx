import './App.css'
import TodoHeader from "./TodoHeader.tsx";
import {TodoProvider} from "./TodoContext.tsx";
import RenderContainer from "./RenderContainer.tsx";
import {useState} from "react";
import {ThemeContext} from "./ThemeContext.ts";

function App() {
	const [isDark, setIsDark] = useState<boolean>(false);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	return (
		<ThemeContext.Provider value={{ isDark }}>
			<TodoProvider>
				<div>
					<div className="todo-container" style={{marginBottom: 10}}>
						<button onClick={toggleTheme}>
							{isDark ? '라이트 모드로 변경' : '다크 모드로 변경'}
						</button>
					</div>

					<div className={`todo-container ${isDark ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
						<TodoHeader />
						<RenderContainer />
					</div>
				</div>
			</TodoProvider>
		</ThemeContext.Provider>
	)
}

export default App
