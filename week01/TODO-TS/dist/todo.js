"use strict";
const inputElement = document.getElementById("todoInput");
const todoListElement = document.getElementById("todoList");
const doneListElement = document.getElementById("doneList");
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", handleAddButton);
function handleAddButton() {
    const value = inputElement.value.trim();
    if (!value)
        return;
    const list = document.createElement("li");
    list.textContent = value;
    const completeButton = document.createElement("button");
    completeButton.textContent = "완료";
    completeButton.onclick = () => moveToDone(list, value);
    list.appendChild(completeButton);
    todoListElement.appendChild(list);
    inputElement.value = "";
}
function moveToDone(li, value) {
    const doneList = document.createElement("li");
    doneList.textContent = value;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.onclick = () => doneList.remove();
    doneList.appendChild(deleteButton);
    doneListElement.appendChild(doneList);
    li.remove();
}
