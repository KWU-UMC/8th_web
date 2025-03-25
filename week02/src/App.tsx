import './App.css'
import TodoHeader from "./TodoHeader.tsx";
import {TodoProvider} from "./TodoContext.tsx";
import RenderContainer from "./RenderContainer.tsx";

function App() {
	return (
		<TodoProvider>
			<div className="todo-container">
			<TodoHeader />

			<RenderContainer />
		</div>
		</TodoProvider>
	)
}

export default App
