import React, { useContext, useState } from "react";
import * as S from './todo.style';
// import {Ttodo} from '../types/todoType';
import TodoContext from "../context/TodoContext";

const TodoList = () => {
    const [input, setInput] = useState<string>('');
    const { todos, handleAddTodo, handleMove, handleDeleteTodo } = useContext(TodoContext);
  
    // 할 일에 item 생성
    const handleAddTodoClick = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddTodo(input);  
      setInput('');
    };
  
    return (
      <S.Layout>
        <S.Container>
          <S.Header>TODO</S.Header>
          <S.Form onSubmit={handleAddTodoClick}>
            <S.Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="할 일 입력"
              required
            />
            <S.Btn type="submit">할 일 추가</S.Btn>
          </S.Form>
  
          <S.ListContainer>
            <S.ListSection>
              <S.Title>할 일</S.Title>
              <S.List>
                {todos.filter(todo => !todo.completed).map(todo => (
                  <S.ListItem key={todo.id}>
                    {todo.text}
                    <S.CompleteButton onClick={() => handleMove(todo.id)}>
                      완료
                    </S.CompleteButton>
                  </S.ListItem>
                ))}
              </S.List>
            </S.ListSection>
  
            <S.ListSection>
              <S.Title>완료</S.Title>
              <S.List>
                {todos.filter(todo => todo.completed).map(todo => (
                  <S.ListItem key={todo.id}>
                    {todo.text}
                    <S.DeleteButton onClick={() => handleDeleteTodo(todo.id)}>
                      삭제
                    </S.DeleteButton>
                  </S.ListItem>
                ))}
              </S.List>
            </S.ListSection>
          </S.ListContainer>
        </S.Container>
      </S.Layout>
    );
  };
  
  export default TodoList;