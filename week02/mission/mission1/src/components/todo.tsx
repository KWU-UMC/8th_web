import { useState } from "react";
import { TodoI } from "../type";

export default function Todo() {
  const [todos, setTodos] = useState<TodoI[]>([]);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), task: value, isDone: false },
      ]);
      setValue("");
    }
  };
  const handleClick = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div
      id="container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="todo-container">
        <h2>To Do</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Write To Dos"
            value={value}
          />
          <button type="submit">Add</button>
        </form>
        <div id="task-container" style={{ display: "flex", gap: "20px" }}>
          <div id="todo">
            <span>to do</span>
            {todos
              .filter((todo) => !todo.isDone)
              .map((todo, index) => (
                <div key={index}>
                  <span onClick={() => handleClick(todo.id)}>{todo.task}</span>
                  <span onClick={() => handleDelete(todo.id)}>❌</span>
                </div>
              ))}
          </div>
          <div id="done">
            <span>done</span>
            {todos
              .filter((todo) => todo.isDone)
              .map((todo, index) => (
                <div key={index}>
                  <span onClick={() => handleClick(todo.id)}>{todo.task}</span>
                  <span onClick={() => handleDelete(todo.id)}>❌</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
