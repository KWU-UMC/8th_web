import { createContext,PropsWithChildren,useState,useContext } from 'react';
import {TTodo} from '../types/todo'

interface ITodocontext{
    todos:TTodo[];
    doneTodos:TTodo[];
    addTodo:(text:string)=>void;
    completeTodo:(todo:TTodo)=>void;
    deleteTodo:(todo:TTodo)=>void;
}

const TodoContext = createContext<ITodocontext|undefined>(undefined);

export const TodoProvider=({children}:PropsWithChildren)=>{
    const[todos,setTodos]=useState<TTodo[]>([]);
    const[doneTodos,setDoneTodos]=useState<TTodo[]>([]);

    const addTodo=(text:string):void=>{
        const newTodo:TTodo={id:Date.now(),text};
        setTodos((prevTodos):TTodo[]=>[...prevTodos,newTodo]);
    }
    const deleteTodo=((todo:TTodo)=>{
        setDoneTodos((prevDoneTodo:TTodo[])=>prevDoneTodo.filter((t):boolean=>t.id!=todo.id))

    })

    const completeTodo=(todo:TTodo):void=>{
        setTodos((prevTodos):TTodo[]=>prevTodos.filter((t):boolean=>t.id!==todo.id));
        setDoneTodos((prevDoneTodos):TTodo[]=>[...prevDoneTodos,todo])
    }

    return(
        <TodoContext.Provider value={{todos,doneTodos,addTodo,completeTodo,deleteTodo}}>{children}</TodoContext.Provider>
    )
}
export default TodoContext

export const useTodo=()=>{
    const context=useContext(TodoContext);
    if(!context){
        throw new Error('useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.')
    }
    return context;
}