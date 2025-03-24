//---HTML 요소 선택---
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const todoForm = document.getElementById("todoForm") as HTMLFormElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const doneList = document.getElementById("doneList") as HTMLUListElement;

//---할 일 및 완료된 작업을 저장할 배열---
type Task = {
  id: number;
  text: string;
}; //타입 별칭 : Task는 number type의 id와 string type의 text를 가진 객체 타입

let todos: Task[] = []; //할 일을 저장할 배열 : Task 타입 객체 배열, 초기값은 빈 배열
let doneTasks: Task[] = []; //완료된 작업을 저장할 배열 : Task 타입 객체 배열, 초기값은 빈 배열

//---할 일 텍스트 입력 처리 함수---
const getTodoText = (): string => {
  return todoInput.value.trim();
};
//getTodoText()은 form 제출 이벤트 발생 시 해당 input의 value를 공백 없이 반환하는 역할
//: string 은 반환값(return value) 의 타입을 명시

//---폼 제출 이벤트 리스너---
todoForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const text = getTodoText(); //정제된 text값을 반환하는 getTodoText()호출
  if (text) {
    addTodo(text);
    //만약 text가 공백란이 아닌 문자열로 존재한다면 text 데이터와 함께 addTodo() 호출
  }
}); //addEventListener("이벤트명", 함수) 이 구조를 기억!

//---할 일 추가 함수---
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  console.log(todos);
  todoInput.value = ""; //향후 사용자가 다시 입력할 수 있게 초기화
  renderTasks(); //새로운 배열 데이터를 바탕으로 UI를 다시 그린다
};

//addTodo()는 폼 제출 이벤트 리스너 화살표 함수에서 getTodoText()를 활용해 가져온 정제된 text값을
//앞서 전역적으로 정의해두었던 todos 객체 배열의 한 객체 아이템으로 push해주는 역할을 할거야
//객체 아이템은 Task type의 객체이고 id : number, text : string의 프로퍼티를 가지고 있어
//각 객체 아이템은 나중에 forEach문에서 비교하는 구문에 쓰이기 때문에 고유한 id number를 가져야 함으로
//Date.now()를 사용하는 것

//---할 일 목록 렌더링 함수---
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  //우린 todos와 doneTasks라는 객체 배열 데이터를 바탕으로 매번 UI(특히 ul요소)를 새롭게 구성해줘야 함으로
  todos.forEach((task) => {
    //todos 객체 배열의 각 객체 아이템들을 순회하면서 해당 코드 동작
    const li = createTaskElement(task, false);
    todoList.appendChild(li);
  });
  doneTasks.forEach((task) => {
    const li = createTaskElement(task, true);
    doneList.appendChild(li);
  });
};
//renderTasks()는

//---할 일 아이템 생성 함수---
const createTaskElement = (task: Task, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li"); //li 요소 create
  li.classList.add("render-container__item"); //li요소의 스타일링 가미를 위해
  li.textContent = task.text; //li 태그 안에 텍스트 노드로 task.text 문자열을 넣는다
  //여기서 task.text는 todos 객체 아이템으로 넣어준 text property의 정제된 string 값
  const button = document.createElement("button"); //btn 요소 create
  button.classList.add("render-container__item-button"); //for btn element styling
  //여기까지는 li와 li 하위 요소 btn의 기본적인 설정, 즉 특정 여건에 의해 유동적이지 않는 것들

  //---완료 여부에 따른 button textContent & Color---
  if (isDone) {
    //if isDone is true, doneTasks 객체 배열's 객체 task
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545"; //red(delete)
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745"; //green(complete)
  }
  //button: HTML의 <button> 요소 (DOM 객체)
  //style: DOM 요소가 가지고 있는 style 속성 객체 (HTML의 style="" 태그에 대응)
  //여기까지 li와 btn 요소의 textContent, styling을 정적, 동적으로 설정해줌
  //---이제 btn click event에 대한 동작 코드를 짜서 객체 배열 데이터 사이를 오가며
  //객체 아이템들을 옮겨주고 li요소를 다시 그려줄 차례가 왔어 ---
  button.addEventListener("click", () => {
    if (isDone) {
      //doneTasks 배열에 존재하는 item button click
      deleteTask(task);
    } else {
      //todos 배열에 존재하는 item button click
      completeTask(task);
    }
  });
  li.appendChild(button); //btn요소를 li 하위요소로 추가해주고
  return li; //li요소를 반환
};

//---할 일 상태 변경 (완료로 이동 push to doneTasks)---
const completeTask = (task: Task): void => {
  todos = todos.filter((t) => t.id !== task.id);
  //우리가 task.id에 고유 number를 부여한 이유
  //filter()는 배열 아이템들을 순회하며 조건에 매치되는 것들로만 배열을 recreating
  //todos 배열에 존재하는 item중 complete btn을 click한 item 데이터가 이 함수로 넘어와
  //즉, 해당 아이템의 id가 곧 task.id이기에 조건을 충족하지 못하고 todos 객체 배열에서 out!
  doneTasks.push(task);
  //그리고 우린 그 아이템을 doneTasks 객체 배열로 넘겨줄거야
  renderTasks();
  //마지막으로 업데이트된 배열 데이터를 바탕으로 UI를 다시 그린다!
};
const deleteTask = (task: Task): void => {
  doneTasks = doneTasks.filter((t) => t.id != task.id);
  renderTasks();
};

renderTasks(); //초기 렌더링
