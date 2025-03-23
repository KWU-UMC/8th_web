"use strict";
const input = document.querySelector('#input');
const form = document.querySelector('#form');
const todoList = document.querySelector('#todo_list');
const doneList = document.querySelector('#done_list');
if (!input || !form || !todoList || !doneList) {
    throw new Error("Required elements not found in the document.");
}
const createItem = (text) => {
    const item = document.createElement('li');
    item.textContent = text;
    const doneButton = document.createElement('button');
    doneButton.textContent = '완료';
    doneButton.classList.add('complete-button');
    doneButton.addEventListener('click', () => moveItem(item));
    item.appendChild(doneButton);
    return item;
};
const addItem = (text) => {
    const item = createItem(text);
    todoList.appendChild(item);
};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim() === "")
        return;
    addItem(input.value.trim());
    input.value = "";
});
const moveItem = (item) => {
    const doneItem = createDoneItem(item);
    item.remove();
    doneList.appendChild(doneItem);
};
const createDoneItem = (item) => {
    const doneItem = item.cloneNode(true);
    const doneButton = doneItem.querySelector('button');
    if (doneButton) {
        doneButton.textContent = '삭제';
        doneButton.classList.add('delete-button');
        doneButton.replaceWith(doneButton.cloneNode(true));
        const newButton = doneItem.querySelector('button');
        if (newButton) {
            newButton.addEventListener('click', () => {
                doneItem.remove();
            });
        }
    }
    return doneItem;
};
