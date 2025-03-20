import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 할 일 추가
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  // 할 일 완료 처리
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // 할 일 삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>React + Vite To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
