import { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";
const TodoBefore = () => {
  const [todos, setTodos] = useState<TTodo[]>([]); //todos의 상태를 정의 : todos는 id와 text 키:값 프로퍼티를 가진 객체들의 배열 타입으로 초깃값은 빈 배열 []
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]); //doneTodos의 상태를 정의 : 마찬가지 객체 배열 타입으로 초깃값은 빈 배열 []
  const [input, setInput] = useState<string>(""); //input의 상태를 정의 : string타입으로 초깃값은 빈 문자열 ''

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    //폼 제출 이벤트 함수 정의
    e.preventDefault(); //폼 제출시 디폴트로 실행되는 새로고침을 방지
    const text = input.trim(); //input은 앞서 정의한 상태 변수로 공백 없이 텍스트 값 그 자체만을 가져오기 위해 .trim()을 붙여줌
    //만약 상태 변수 input값으로 부터 정제된 텍스트 값을 얻었다면
    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      //id는 고유해야 함으로 Date.now() 메서드를 사용해주고 정제된 text값을 가져와서 새로운 객체 아이템 데이터 가공
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      //확장 연산자를 통해 기존의 데이터는 보존하면서 새로운 객체 아이템을 추가해서 새 배열을 만들어준다

      setInput(""); //input 상태 변수의 초깃값을 빈 문자열로 원상복귀 시켜줌 (어짜피 데이터는 얻어서 저장,가공 해주었으니)
    }
  };
  const completeTodo = (todo: TTodo) => {
    setTodos((prevTodos) => prevTodos.filter((t): boolean => t.id !== todo.id));
    //todo에 객체 아이템을 받아와서 해당 객체 아이템의 고유 id, 즉 todo.id를 이용해 해당 객체 아이템을 prevTodos즉 기존 객체 배열 데이터에서 걸러내는 작업
    //filter는 true에 해당하는 아이템들로만 배열을 재구성하기 때문에 todo로 넘어온 객체 아이템을 제외한 아이템들로만 todos 객체 배열이 재구성됨
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]); //기존의 doneTodos 객체 배열을 유지하면서 todo 객체 아이템을 추가해 새 배열을 만들어줌
  };
  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodos) =>
      prevDoneTodos.filter((t): boolean => t.id != todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">SIMONE TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input} //input 상태값이 입력창의 값(value) 을 제어함, 즉 input 요소의 값은 항상 input 상태 값과 동기화됨.
          onChange={(e) => setInput(e.target.value)} //사용자가 타이핑하면 onChange 이벤트가 발생하고 setInput으로 상태를 업데이트함
          className="todo-container__input"
          type="text"
          placeholder="You can write down what you have to do"
          required
        />
        <button className="todo-container__button" type="submit">
          Add Todo
        </button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h1 className="render-container__title">Todo</h1>
          <ul className="render-container__list">
            {todos.map((todo) => (
              //todos 객체 배열에 .map(item) 메서드를 적용 : todos 객체 배열의 객체 아이템들을 순회하며 각 객체 todo의 속성들 (id, text)이 바로 렌더링에 사용 됨
              //key는 리액트가 각 요소를 식별하는데 사용됨
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => completeTodo(todo)}
                  style={{ backgroundColor: "#28a745" }}
                  className="render-container__item-button"
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h1 className="render-container__title">Done</h1>
          <ul className="render-container__list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo)}
                  style={{ backgroundColor: "#dc3545" }}
                  className="render-container__item-button"
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

export default TodoBefore;
