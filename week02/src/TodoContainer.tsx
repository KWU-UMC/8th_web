import {JSX} from "react";
import './TodoContainer.css';
import Task from "./Task.ts";
import TaskItem from "./TaskItem.tsx";

function TodoContainer({isDone, tasks, onClick}: {
	isDone: boolean,
	tasks: Task[],
	onClick: (task: Task) => void}
): JSX.Element {
	return (
		<div className="render-container__section">
			<h2 className="render-container__title">{isDone ? '완료' : '할 일'}</h2>
			<ul className="render-container__list">
				{tasks.map((task) => (
					<TaskItem task={task} isDone={isDone} onClick={() => onClick(task)}></TaskItem>
				))}
			</ul>
		</div>
	)
}

export default TodoContainer;
