import  { createContext, useState, ReactNode } from 'react';
import { Ttodo } from '../types/todoType';
import { TTodoContextType } from '../types/todocontextType';

// default
const defaultContextValue: TTodoContextType = {
    todos: [],
    handleAddTodo: () => {},
    handleMove: () => {},
    handleDeleteTodo: () => {}
};

// context 생성
const TodoContext = createContext<TTodoContextType>(defaultContextValue);

interface TodoProviderProps {
  children: ReactNode;
}

// TodoProvider 생성
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Ttodo[]>([]);

  // 할 일에 item 생성
  const handleAddTodo = (text: string) => {
    if (!text.trim()) return;  // input 비어 있는 경우 return
    setTodos([...todos, { id: Date.now(), text, completed: false }]);  // 할 일에 item 추가
  };

  // 완료로 item 이동(생성)
  const handleMove = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 완료된 item 삭제
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, handleAddTodo, handleMove, handleDeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;