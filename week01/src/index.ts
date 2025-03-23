const inputElement = document.getElementById('todo-input') as HTMLInputElement
const todoListElement = document.getElementById('todo') as HTMLDivElement
const completeListElement = document.getElementById('complete') as HTMLDivElement

inputElement.addEventListener('keypress', ({key}: {key: string}) => {
    if (key !== 'Enter') return

    const value = inputElement.value
    if (value.trim() === '') return

    inputElement.value = '';

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.append(value)

    const button = document.createElement('button');
    button.innerText = '완료';
    button.addEventListener('click', () => {
        todoItem.remove()
        todoItem.removeChild(button)

        const removeButton = document.createElement('button');
        removeButton.innerText = '삭제';
        removeButton.addEventListener('click', () => {
            todoItem.remove();
        })
        todoItem.appendChild(removeButton)

        completeListElement.append(todoItem)
    })
    todoItem.appendChild(button)

    todoListElement.appendChild(todoItem)
})
