//여기에 실질적인 컴포넌트 구현 다 해야 함
import './App.css'
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";

import { TodoProvider } from './context/TodoContext';

export default function App(){
  return (
      <TodoProvider>
        <div className='app-wrapper'>
          <div className="todo-container">
            <h1 className="todo-container__header">SEOYEON TODO</h1>
            <TodoInput />
            <div className="render-container">
              <TodoList />
              <DoneList />
            </div>
          </div>
        </div>
      </TodoProvider>
  )
}


// 1. 상태(state) 를 생각하기 -> tsx 는 상태 값 위주로 자동으로 업데이트 하는 것을 생각해야함
// 1) todoList 입력 -> 할 일에 추가
// 2) 할 일 완료 -> 완료 에 추가
// 3) 완료 삭제 -> 아예 삭제

//const [inputValue, setIntputValue] = useState("할 일을 입력하세요");
//이러면 사용자가 지우지 않으면 그대로 todo로 등록되어버리니깐 이러면 안 됨
//만약 띄우고 싶으면 placeholder 로 지정할 것
//밑에서 정의하지 않으년 오류가 나기 때문에 처음 선언 때 오류나는 것은 무시할 것
//아니면 const [inputValue, setInputValue] = useState<string>('');

// 참고 : export default function vs fuction
// export default function : 이러면 import App from ./App 이렇게 사용 가능햊ㅁ
// function : 독같이 동작하는데 기능적으로 차이가 없음 다만 뒤에 export defalut 는 해줘야함


// type Task = {
//   id : number;
//   text : string;
// };

// function App() {
//   const [inputValue, setInputValue] = useState('');
//   const [todos, setTodos] = useState<Task[]>([]);
//   const [doneTodos, setDoneTodos] = useState<Task[]>([]);
  
//   //입력 핸들러
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); //폼 기본 동작(새로 고침 막기)
//     //입력값이 있으면 add 로 보내기
//     if(inputValue.trim()){
//       addTodo(inputValue.trim());
//     }
//   }
  
//   //할 일 추가
//   //text: string -> 매개변수 타입 지정
//   //newTask 은 객체 리터럴 단축 문법 
//   // -> id는 고유Id 용, text는 위와 동일한 타입이니깐 text로 생략 가능(text: text 가 원래 코드)
//   // 상태 값을 배열(todos)에 복사해서 새 값에 추가하는 거임 
//   // => 이래야 react가 바뀐 걸 알아봄
//   const addTodo = (text : string) => {
//     const newTask = { id : Date.now(), text};
//     setTodos([...todos, newTask]);
//     setInputValue(''); //입력창 다시 초기화
//   };
  
//   // 할 일 표시하기
//   // todos. 기준으로 자동으로 반복해서 화면에 그리는 것
//   <ul>
//     {todos.map(task => (
//       <li key={task.id}>
//         {task.text}
//         <button onClick={ () => completeTask(task)}> 완료 </button>
//       </li>
//     ))}
//   </ul>
  
//   //완료 처리 함수
//   //filter : 조건에 맞는 것만 남기고 배열을 새로 만드는 함수
//   const completeTask = (task: Task) => {
//     setTodos(todos.filter(t => t.id !== task.id));
//     setDoneTodos([...doneTodos, task]);
//   }
  
//   //완료 목록 그리기
//   <ul>
//     {todos.map(task => (
//       <li key={task.id}>
//         {task.text}
//         <button onClick={ () => deleteTodos(task)}> 삭제 </button>
//       </li>
//     ))}
//   </ul>
  
//   //삭제 함수
//   const deleteTodos = (task: Task) =>{
//     setDoneTodos(doneTodos.filter(t => t.id !== task.id));
//   }
  
//   //입력창 만들기
//   //onSubmit -> 폼 제출 시 addTodo를 호출하기 위함
//   <form onSubmit={handleSubmit}>
//     <input
//       value={inputValue}
//       onChange={(e) => setInputValue(e.target.value)}
//       placeholder="할 일 입력"
//       />
//   </form>

//   //body 부부만
//   return (
//   <>
//   <div className="todo-container">
//     <h1 className="todo-container__header">YONG TODO</h1>

//     <form onSubmit={handleSubmit} className="todo-container__form">
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="todo-container__input"
//         placeholder="할 일 입력"
//         required
//       />
//       <button type="submit" className="todo-container__button">할 일 추가</button>
//     </form>

//     <div className="render-container">
//       <div className="render-container__section">
//         <h2 className="render-container__title">할 일</h2>
//         <ul className="render-container__list">
//           {todos.map(task => (
//             <li key={task.id} className="render-container__item">
//               <span className="render-container__item-text">{task.text}</span>
//               <button
//                 onClick={() => completeTask(task)}
//                 className="render-container__item-button"
//                 style={{ backgroundColor: '#28a745' }}
//               >
//                 완료
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="render-container__section">
//         <h2 className="render-container__title">완료</h2>
//         <ul className="render-container__list">
//           {doneTodos.map(task => (
//             <li key={task.id} className="render-container__item">
//               <span className="render-container__item-text">{task.text}</span>
//               <button
//                 onClick={() => deleteTodos(task)}
//                 className="render-container__item-button"
//                 style={{ backgroundColor: '#dc3545' }}
//               >
//                 삭제
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   </div>
//   </>
//   )
// }

// export default App