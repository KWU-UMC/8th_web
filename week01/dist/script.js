"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  todos.forEach((todo) => {
    const li = createTodoItem(todo, false);
    todoList.appendChild(li);
  });
  doneTasks.forEach((todo) => {
    const li = createTodoItem(todo, true);
    doneList.appendChild(li);
  });
};
const getTodoText = () => todoInput.value.trim();
const addTodo = (text) => {
  if (text === "") return;
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};
const completeTodo = (todo) => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};
const deleteTodo = (todo) => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};
const createTodoItem = (todo, isDone) => {
  const li = document.createElement("li");
  li.className = "render-container__item";
  li.innerHTML = `
    <span class="render-container__item-text ${
      isDone ? "render-container__item--done" : ""
    }">${todo.text}</span>
    <div class="render-container__item-buttons">
      <button class="render-container__item-button complete-btn">
        ${isDone ? "↩ 되돌리기" : "✅ 완료"}
      </button>
      <button class="render-container__item-button delete-btn">❌ 삭제</button>
    </div>
  `;
  const completeBtn = li.querySelector(".complete-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  completeBtn.onclick = () =>
    isDone ? undoComplete(todo) : completeTodo(todo);
  deleteBtn.onclick = () => deleteTodo(todo);
  return li;
};
const undoComplete = (todo) => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  todos.push(todo);
  renderTasks();
};
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});
renderTasks();
