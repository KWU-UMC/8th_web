import "./Todo.css";
import { useTodo } from "../context/TodoProvider";
import Button from "./components/button";

function App() {
  const {
    inputValue,
    setInputValue,
    handleAddTodo,
    handleComplete,
    handleDelete,
    todos,
    doneList,
  } = useTodo();

  return (
    <div className="rootContainer">
      <h2>YONG TODO</h2>
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="할 일 입력"
        />
        <Button onClick={handleAddTodo}>할 일 추가</Button>
      </div>
      <div className="listContainer">
        <div className="todoContainer">
          <h3>할 일</h3>
          <ul>
            {todos.map((todo) => (
              <li key={todo}>
                {todo}
                <button onClick={() => handleComplete(todo)}>완료</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="doneContainer">
          <h3>완료</h3>
          <ul>
            {doneList.map((todo) => (
              <li key={todo}>
                {todo}
                <button onClick={() => handleDelete(todo)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
