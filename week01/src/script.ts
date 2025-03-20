// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 할 일 타입 정의
type Todo = {
  id: number;
  text: string;
};

// 3. 할 일 목록 저장 배열
let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 4. 할 일 렌더링 함수
const renderTasks = (): void => {
  // 기존 목록 초기화
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // 미완료 할 일 렌더링
  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  // 완료된 할 일 렌더링
  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

// 5. 입력된 할 일 텍스트 가져오기 (공백 제거)
const getTodoText = (): string => todoInput.value.trim();

// 6. 할 일 추가 함수
const addTodo = (text: string): void => {
  if (text === "") return;

  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

// 7. 할 일 상태 변경 (완료 ⇄ 미완료)
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 8. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

// 9. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;

  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
    button.onclick = () => deleteTodo(todo);
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#007bff";
    button.onclick = () => completeTodo(todo);
  }

  li.appendChild(button);
  return li;
};

// 10. 폼 제출 이벤트 리스너
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

// 초기 렌더링 실행
renderTasks();
