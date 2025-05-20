import {JSX, useContext} from "react";
import TodoContainer from "./TodoContainer.tsx";
import {TodoContext} from "./TodoContextType.ts";

function RenderContainer(): JSX.Element {
	const context = useContext(TodoContext);

	return (
		<div className="render-container">
			<TodoContainer isDone={false} tasks={context?.todoList ?? []} onClick={(task) => {
				context?.removeTodoTask(task);
				context?.addDoneTask(task);
			}} />

			<TodoContainer isDone={true} tasks={context?.doneList ?? []} onClick={(task) => {
				context?.removeDoneTask(task);
			}} />
		</div>
	)
}

export default RenderContainer;
