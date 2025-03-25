import Task from "./Task.ts";
import {TodoContext} from "./TodoContextType.ts";
import {ReactNode, useState} from "react";

export const TodoProvider = ({children}: {children: ReactNode}) => {
	const [todoList, setTodoList] = useState<Task[]>([])
	const [doneList, setDoneList] = useState<Task[]>([])

	const addTodoTask = (task: Task) => {
		setTodoList(todoList.concat(task))
	}

	const removeTodoTask = (task: Task) => {
		setTodoList(todoList.filter((t) => t !== task))
	}

	const addDoneTask = (task: Task) => {
		setDoneList(doneList.concat(task))
	}

	const removeDoneTask = (task: Task) => {
		setDoneList(doneList.filter((t) => t !== task))
	}

	return (
		<TodoContext.Provider value={{todoList, doneList, addTodoTask, removeTodoTask, addDoneTask, removeDoneTask}}>
			{children}
		</TodoContext.Provider>
	)
};
