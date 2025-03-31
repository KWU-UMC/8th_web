import { useTodo } from "../context/TodoContext";

export default function DoneList(){
    const{doneTodos, deleteTask} = useTodo();

    return(
        <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul className="render-container__list">
                {doneTodos.map( task=>(
                    <li key={task.id} className="render-container__item">
                        <span className="render-container__item-text">{task.text}</span>
                        <button
                        onClick={()=> deleteTask(task)}
                        className="render-container__item-button"
                        style={{backgroundColor:'#dc3545'}}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}