import {JSX, useContext} from "react";
import './TaskItem.css';
import Task from "./Task.ts";
import {ThemeContext} from "./ThemeContext.ts";

function TaskItem({task, isDone, onClick}: {
	task: Task,
	isDone: boolean,
	onClick: () => void
}): JSX.Element {
	const themeContext = useContext(ThemeContext);

	return (
		<li className={`render-container__item ${themeContext?.isDark ? '!bg-neutral-600 text-neutral-100' : '!bg-neutral-200 text-neutral-900'}`}>
			{task.title}
			<button
				className="render-container__item-button"
				style={{backgroundColor: isDone ? '#dc3545' : '#28a745'}}
				onClick={onClick}
			>
				{isDone ? '삭제' : '완료'}
			</button>
		</li>
	)
}

export default TaskItem;
