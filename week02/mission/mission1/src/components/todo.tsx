import { useContext, useState } from "react";
import { TaskContext } from "../context/task";
import { TodoI } from "../type";

export default function Todo() {
  const [value, setValue] = useState<string>("");
  const todos = useContext(TaskContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      todos?.setTodos((prev) => [
        ...prev,
        { id: Date.now(), task: value, isDone: false },
      ]);
      setValue("");
    }
  };
  const handleClick = (id: number) => {
    const newTodos = todos?.todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    todos?.setTodos(newTodos as TodoI[]);
  };
  const handleDelete = (id: number) => {
    const newTodos = todos?.todos.filter((todo) => todo.id !== id);
    todos?.setTodos(newTodos as TodoI[]);
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
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
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
            {todos?.todos
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
            {todos?.todos
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
