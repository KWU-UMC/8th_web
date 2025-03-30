import React, { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";

const Todo = (): React.ReactNode => { 
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInput("");
        }
    };

    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== todo.id));
    };

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">YONG TODO</h1>
            <form className="todo-container__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="todo-container__input"
                    placeholder="할 일 입력"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />
                <button type="submit" className="todo-container__button">
                    할 일 추가
                </button>
            </form>
            <div className="render-container">
                <div className="render-container_section">
                    <h2 className="render-container_title">할 일</h2>
                    <ul id="todo-list" className="render-container_list">
                        {todos.map((todo) => (
                            <li key={todo.id} className="render-container_item">
                                <span className="render-container_item-text">{todo.text}</span>
                                <button
                                    onClick={() => completeTodo(todo)}
                                    style={{ backgroundColor: "#28a745" }}
                                    className="render-container_item_button"
                                >
                                    완료
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="render-container_section">
                    <h2 className="render-container_title">완료</h2>
                    <ul id="done-list" className="render-container_list">
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className="render-container_item">
                                <span className="render-container_item-text">{todo.text}</span>
                                <button
                                    onClick={() => deleteTodo(todo)}
                                    style={{ backgroundColor: "#dc3545" }}
                                    className="render-container_item_button"
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Todo;
