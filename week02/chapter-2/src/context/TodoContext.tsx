import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TTodo[]>([]); //todos의 상태를 정의 : todos는 id와 text 키:값 프로퍼티를 가진 객체들의 배열 타입으로 초깃값은 빈 배열 []
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]); //doneTodos의 상태를 정의 : 마찬가지 객체 배열 타입으로 초깃값은 빈 배열 []

  const addTodo = (text: string) => {
    const newTodo: TTodo = { id: Date.now(), text };
    //id는 고유해야 함으로 Date.now() 메서드를 사용해주고 정제된 text값을 가져와서 새로운 객체 아이템 데이터 가공
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    //확장 연산자를 통해 기존의 데이터는 보존하면서 새로운 객체 아이템을 추가해서 새 배열을 만들어준다
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
    <TodoContext.Provider
      value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): ITodoContext => {
  const context = useContext(TodoContext);
  //context가 없는 경우
  if (!context) {
    throw new Error(
      "useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다."
    );
  }
  //context가 있는 경우
  return context;
};
