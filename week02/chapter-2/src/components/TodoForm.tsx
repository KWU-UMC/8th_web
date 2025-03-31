import { FormEvent, useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState<string>(""); //input의 상태를 정의 : string타입으로 초깃값은 빈 문자열 ''
  const { addTodo } = useTodo(); //TodoForm 컴포넌트에 필요한 것 (addTodo)만 context를 반환하는 useTodo()에서 가져온다
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    //폼 제출 이벤트 함수 정의
    e.preventDefault(); //폼 제출시 디폴트로 실행되는 새로고침을 방지
    const text = input.trim(); //input은 앞서 정의한 상태 변수로 공백 없이 텍스트 값 그 자체만을 가져오기 위해 .trim()을 붙여줌
    //만약 상태 변수 input값으로 부터 정제된 텍스트 값을 얻었다면
    if (text) {
      //addTodo()
      addTodo(text); //context에서 가져온 addTodo함수 사용
      setInput(""); //input 상태 변수의 초깃값을 빈 문자열로 원상복귀 시켜줌 (어짜피 데이터는 얻어서 저장,가공 해주었으니)
    }
  };

  return (
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
  );
};

export default TodoForm;
