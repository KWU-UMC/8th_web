import { Ttodo } from "./todoType";

export interface TTodoContextType {
    todos: Ttodo[];
    handleAddTodo: (text: string) => void;
    handleMove: (id: number) => void;
    handleDeleteTodo: (id: number) => void;
};