import { useState } from 'react'
import './App.css'
import TodoHeader from "./TodoHeader.tsx";
import Task from "./Task.ts";
import TodoContainer from "./TodoContainer.tsx";

function App() {
	const [todoTasks, setTodoTasks] = useState<Task[]>([])
	const [doneTasks, setDoneTasks] = useState<Task[]>([])

	return (
		<div className="todo-container">
			<TodoHeader onSubmit={(title) => setTodoTasks(todoTasks.concat(new Task(title)))}></TodoHeader>

			<div className="render-container">
				<TodoContainer isDone={false} tasks={todoTasks} onClick={(task) => {
					setTodoTasks(todoTasks.filter((t) => t !== task))
					setDoneTasks(doneTasks.concat(task))
				}} />

				<TodoContainer isDone={true} tasks={doneTasks} onClick={(task) => {
					setDoneTasks(doneTasks.filter((t) => t !== task))
				}} />
			</div>
		</div>
	)
}

export default App
