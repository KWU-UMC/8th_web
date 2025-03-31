// 모든 값들이 담겨져있는 곳 
//여기서 이걸 useTodo를 이용해서 뺐다 꼈다 해야함함
import { useTodo } from '../context/TodoContext';

//내보낼 때 사용하는 방식식
export default function TodoInput() {
    //useTodo 할 때, 꺼내쓰고 싶은 것들 꺼내기기
    const { inputValue, setInputValue, addTodo } = useTodo();

    //input 할 때 필요한 것것
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
        addTodo(inputValue.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-container__form">
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="todo-container__input"
            placeholder="할 일 입력"
            required
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
        </form>
    );
}
