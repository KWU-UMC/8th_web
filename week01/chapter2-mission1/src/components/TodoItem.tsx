import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem = ({ todo, toggleTodo, deleteTodo }: TodoItemProps) => {
  return (
    <li className={`todo-item ${todo.isDone ? "completed" : ""}`}>
      <span onClick={() => toggleTodo(todo.id)}>
        {todo.isDone ? "✅" : "⬜"} {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>❌ 삭제</button>
    </li>
  );
};

export default TodoItem;
