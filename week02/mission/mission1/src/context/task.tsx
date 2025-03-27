import { createContext, ReactNode, useState } from "react";
import { TodoI } from "../type";

interface TaskContextI {
  todos: TodoI[];
  setTodos: React.Dispatch<React.SetStateAction<TodoI[]>>;
}
export const TaskContext = createContext<TaskContextI | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoI[]>([]);

  const value = {
    todos,
    setTodos,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
