import {JSX} from "react";
import './TaskItem.css';
import Task from "./Task.ts";

function TaskItem({task, isDone, onClick}: {
	task: Task,
	isDone: boolean,
	onClick: () => void
}): JSX.Element {
	return (
		<li className="render-container__item">
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
