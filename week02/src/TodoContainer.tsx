import {JSX, useContext} from "react";
import './TodoContainer.css';
import Task from "./Task.ts";
import TaskItem from "./TaskItem.tsx";
import {ThemeContext} from "./ThemeContext.ts";

function TodoContainer({isDone, tasks, onClick}: {
	isDone: boolean,
	tasks: Task[],
	onClick: (task: Task) => void}
): JSX.Element {
	const themeContext = useContext(ThemeContext);

	return (
		<div className="render-container__section">
			<h2 className={`render-container__title ${themeContext?.isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{isDone ? '완료' : '할 일'}</h2>
			<ul className="render-container__list">
				{tasks.map((task) => (
					<TaskItem task={task} isDone={isDone} onClick={() => onClick(task)}></TaskItem>
				))}
			</ul>
		</div>
	)
}

export default TodoContainer;
