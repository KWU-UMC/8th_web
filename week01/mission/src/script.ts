const input = document.querySelector<HTMLInputElement>('#input');
const form = document.querySelector<HTMLFormElement>('#form');
const todoList = document.querySelector<HTMLUListElement>('#todo_list');
const doneList = document.querySelector<HTMLUListElement>('#done_list');

if (!input || !form || !todoList || !doneList) {
    throw new Error("Not found");
}

// 할 일에 item 생성
const createItem = (text: string): HTMLLIElement => {
    const item = document.createElement('li');  
    item.textContent = text;

    // 완료 버튼
    const doneButton = document.createElement('button');
    doneButton.textContent = '완료';
    doneButton.classList.add('complete-button'); 
    doneButton.addEventListener('click', () => moveItem(item));
    item.appendChild(doneButton);
    return item;
};

// 할 일에 item 추가
const addItem = (text: string): void => {
    const item = createItem(text);  
    todoList.appendChild(item);        
};

// 폼 event 추가
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); 

    // input 비어 있는 경우 return
    if (input.value.trim() === "") return;

    // 아이템 추가
    addItem(input.value.trim());
    input.value = "";
});

// item 이동 
const moveItem = (item: HTMLLIElement): void => {
    const doneItem = createDoneItem(item);    
    item.remove();                            
    doneList.appendChild(doneItem);           
};

// 완료된 item 생성
const createDoneItem = (item: HTMLLIElement): HTMLLIElement => {
    const doneItem = item.cloneNode(true) as HTMLLIElement;  
    const doneButton = doneItem.querySelector<HTMLButtonElement>('button');  

    if (doneButton) {
        // 삭제 버튼 
        doneButton.textContent = '삭제';
        doneButton.classList.add('delete-button'); 
        doneButton.replaceWith(doneButton.cloneNode(true)); 

        const newButton = doneItem.querySelector<HTMLButtonElement>('button');
        if (newButton) {
            newButton.addEventListener('click', () => {
                doneItem.remove();
            });
        }
    }
    return doneItem; 
};
