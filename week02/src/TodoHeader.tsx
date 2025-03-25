import {JSX, useRef} from "react";
import './TodoHeader.css';

function TodoHeader({onSubmit}: {
	onSubmit: (value: string) => void
}): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<h1 className="todo-container__header">YONG TODO</h1>
			<form
				id="todo-form"
				className="todo-container__form"
				onSubmit={(event) => {
					event.preventDefault();

					if (inputRef.current && inputRef.current.value.trim()) {
						onSubmit(inputRef.current.value)
						inputRef.current.value = '';
					}
				}}
			>
				<input
					type="text"
					id="todo-input"
					className="todo-container__input"
					placeholder="할 일 입력"
					ref={inputRef}
					required
				/>
				<button type="submit" className="todo-container__button">할 일 추가</button>
			</form>
		</>
	)
}

export default TodoHeader;
