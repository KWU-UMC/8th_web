import Task from "./Task.ts";
import {createContext} from "react";

interface TodoContextType {
	todoList: Task[]
	doneList: Task[]
	addTodoTask: (task: Task) => void
	removeTodoTask: (task: Task) => void
	addDoneTask: (task: Task) => void
	removeDoneTask: (task: Task) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)
