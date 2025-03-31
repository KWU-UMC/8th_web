import { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
}: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h1 className="render-container__title">{title}</h1>
      <ul className="render-container__list">
        {todos?.map((todo) => (
          //todos 객체 배열에 .map(item) 메서드를 적용 : todos 객체 배열의 객체 아이템들을 순회하며 각 객체 todo의 속성들 (id, text)이 바로 렌더링에 사용 됨
          //key는 리액트가 각 요소를 식별하는데 사용됨
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button
              onClick={() => onClick(todo)}
              style={{ backgroundColor: buttonColor }}
              className="render-container__item-button"
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
