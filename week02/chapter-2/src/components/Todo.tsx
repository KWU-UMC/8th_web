import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  const { todos, doneTodos, completeTodo, deleteTodo } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">SIMONE TODO</h1>
      <TodoForm />
      {/* 더 이상 TodoForm에서 props 데이터를 보내줄 필요가 없어짐  */}
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
