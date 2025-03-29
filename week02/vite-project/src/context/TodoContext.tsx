// Context 만들기
// Context : 컴포넌트들이 서로 공유할 수 있는 곳
/*
평소 방식
<App> <TodoList todos={todos}/> </App>
이러면 자식 컴포넌트에 props 로 계속 상태를 내려보내야 함
자식의 자식의 자식까지 내리는 것이 props-drilling

Context 방식을 사용하면
const {todos} = useTodo();
props 없이 직접 상태 꺼내서 사용하는 거임

Context 구현 방식
1. Context 만들기
2. 상태를 관리하는 provider를 만든다.
3. App에서 그 provider로 감쌈
4. useContext()로 필요한 곳에서 꺼내 쓴다


컴포넌트와 다른 점
컴포넌트들은 화면 UI를 보여주고 동작을 처리하는 역할
Context 파일은 데이터와 함수 로직을 저장하고 공유하는 곳
componenet는 여기서 함수를 가져다가 사용해야 함*/

// TodoContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

//업무 타입
export type Task = { id: number; text: string };

//context type 구현
interface TodoContextType {
    inputValue: string; //입력값값
    setInputValue: (v: string) => void; 
    todos: Task[];
    doneTodos: Task[];
    //구현할 컴포넌트트
    addTodo: (text: string) => void; 
    completeTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
}

//1. context 객체 만들기
//todoContext라는 컴포넌트 공용 저장소를 만든거임
//타입을 미리 선언해서 무엇을 공유할 지 지정하는거임
const TodoContext = createContext<TodoContextType | null>(null);

//얘가 커스텀 훅이라는 거임
//useTodo로 TodoContext에 저장된 상태와 함수를 간단하게 꺼내쓸 수 있게 해주는 도구  
// use로 시작하는 함수는 react에서 커스텀 훅으로 인정함
// 나중에 todos., complteTask 등에서 꺼내쓰려고 하는거임
export const useTodo = () => {
  // todoContext에서 저장된 값을 꺼냄
  // value로 넘긴 것들(todos 등) 을 꺼냄
  const context = useContext(TodoContext);
  //provider로 감싸지 않았을을 경우 에러를 던지는 거임
  //provider : 자식 컴포넌트에게 공통으로 사용할 값(state, 함수 등) 을 공유해주는 통로
  if (!context) throw new Error('TodoContext is not available');
  //꺼낸 context를 반환
  return context;
};

//상태 관리 + 공유 함수
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  //to-do앱에 필요한 세가지 상태를 정의의
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTodos, setDoneTodos] = useState<Task[]>([]);

  //상태 변경함수들
  const addTodo = (text: string) => {
    const newTask = { id: Date.now(), text };
    setTodos([...todos, newTask]);
    setInputValue('');
  };

  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTodos([...doneTodos, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTodos(doneTodos.filter((t) => t.id !== task.id));
  };

  //공유할 값
  //전역 데이터 공급
// Children 은 <TodoContext.provider> </TodoContext.provider>로 감싸면, 자동으로 children이라는 이름으로 들어옴옴
  return (
    <TodoContext.Provider
      value={{ 
        inputValue, 
        setInputValue, 
        todos, 
        doneTodos, 
        addTodo, 
        completeTask, 
        deleteTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};
