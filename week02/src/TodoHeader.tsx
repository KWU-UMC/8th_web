import {JSX, useContext, useRef} from "react";
import './TodoHeader.css';
import {TodoContext} from "./TodoContextType.ts";
import Task from "./Task.ts";
import {ThemeContext} from "./ThemeContext.ts";

function TodoHeader(): JSX.Element {
	const context = useContext(TodoContext);
	const themeContext = useContext(ThemeContext);
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<h1
				className={`todo-container__header ${themeContext?.isDark ? 'text-neutral-100' : 'text-neutral-900'}`}
			>YONG TODO</h1>
			<form
				id="todo-form"
				className="todo-container__form"
				onSubmit={(event) => {
					event.preventDefault();

					if (inputRef.current && inputRef.current.value.trim()) {
						context?.addTodoTask(new Task(inputRef.current.value));
						inputRef.current.value = '';
					}
				}}
			>
				<input
					type="text"
					id="todo-input"
					className={`todo-container__input placeholder-neutral-400 ${themeContext?.isDark ? 'text-neutral-100' : 'text-neutral-900'}`}
					placeholder="할 일 입력"
					ref={inputRef}
					required
				/>
				<button
					type="submit"
					className={`todo-container__button`}>
					할 일 추가
				</button>
			</form>
		</>
	)
}

export default TodoHeader;
