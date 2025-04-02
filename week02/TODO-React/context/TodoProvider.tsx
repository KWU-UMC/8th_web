import { createContext, useContext, useState, ReactNode } from "react";

interface TodoContextProps {
  todos: string[];
  doneList: string[];
  inputValue: string;
  setInputValue: (value: string) => void; // 외부에서 접근할 일이 많은 함수들을 context에 넣어줌
  handleAddTodo: () => void;
  handleComplete: (todo: string) => void;
  handleDelete: (todo: string) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("TodoProvider 안에서 사용해야 함");
  }
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [doneList, setDoneList] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, inputValue.trim()]);
    setInputValue("");
  };

  const handleComplete = (todo: string) => {
    setTodos(todos.filter((t) => t !== todo));
    setDoneList([...doneList, todo]);
  };

  const handleDelete = (todo: string) => {
    setDoneList(doneList.filter((t) => t !== todo));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        doneList,
        inputValue,
        setInputValue,
        handleAddTodo,
        handleComplete,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
