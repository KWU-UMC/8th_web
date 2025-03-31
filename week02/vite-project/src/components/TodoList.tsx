import { useTodo } from "../context/TodoContext";

export default function TodoList(){
    const{todos, completeTask } = useTodo();

//span은 인라인 요소로 아무런 스타일이나 의미가 없는 기본 태그
//텍스트나 다른 요소를 감싸서 스타일을 적용하거나 js에서 선택할 때 사용함
//보통 css에서 적용할 때 사용용
    return (
        <div className = "render-container__section">
            <h2 className = "render-container__title">할 일</h2>
            <ul className = "render-container__list">
                {todos.map(task => (
                    <li key ={task.id} className="render-container__item">
                        <span className="render-container__item-text">{task.text}</span>
                        <button
                        onClick={() => completeTask(task)}
                        className="render-container__item-button"
                        style={{backgroundColor:'#28a745'}}>
                            완료
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}