import { useState } from "react";

function TodoList({ todos, setTodos }) {

    function handleChange(e, id, text) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;

        //todos 배열을 수정
        setTodos(todos =>
            todos.map(todo => todo.id === id ?
                { ...todo, text } : todo
            )
        );

    }
    function handleDelete(id) {
        setTodos(
            //클릭한 id 값과 다른, 즉 해당 요소가 아닌 다른 요소들만 남기고 새로 배열을 생성
            //결과적으로 클릭한 요소만 삭제됨
            todos.filter(todo => todo.id !== id)
        );
    }

    function handleCheck(id, checked) {
        setTodos(todos =>
            todos.map(todo => todo.id === id ?
                { ...todo, done: checked } : todo
            )
        );
    }

    return (
        <ul className="todo__list">
            {todos.length === 0 ? (
                <li>버튼을 눌러 할 일을 추가해주세요!</li>
            ) : (
                todos.map(todo => (
                    <li className="todo__item" key={todo.id}>
                        <label>
                            <input type="checkbox" className="todo-chk hidden" name="check" checked={todo.done} onChange={(e) => handleCheck(todo.id, e.target.checked)} />
                            <span className="icon"></span>
                        </label>
                        <textarea name="todoText" className={todo.done ? "checked" : ""} value={todo.text} onChange={(e) => handleChange(e, todo.id, e.target.value)}></textarea>
                        <div className="btn-box">
                            <button type="button" className="btn-drag"></button>
                            <button type="button" className="btn-delete" onClick={() => handleDelete(todo.id)}></button>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );

}
export default TodoList;