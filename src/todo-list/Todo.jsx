import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function TodoList({ todos, setTodos }) {

    function handleChange(e, id, text) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight + 1}px`;
        const textH = `${e.target.scrollHeight + 1}px`;

        //todos 배열을 수정
        setTodos(todos =>
            todos.map(todo => todo.id === id ?
                { ...todo, text, areaH: textH } : todo
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

    function handleDragEnd(result) {

        if (!result.destination) return;

        const TodosArr = [...todos];
        const [movedItem] = TodosArr.splice(result.source.index, 1);
        TodosArr.splice(result.destination.index, 0, movedItem);

        setTodos(TodosArr);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo__list" direction="vertical">
                {provided => (
                    //provided -> drag 전달 객체
                    <ul className="todo__list" {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.length === 0 ? (
                            <li class="info-text">[버튼을 눌러 할 일을 추가해주세요!]</li>
                        ) : (
                            todos.map((todo, index) => (
                                //draggableId는 문자열(string)
                                <Draggable draggableId={todo.id.toString()} index={index} key={todo.id}>
                                    {provided => (
                                        <li className="todo__item" ref={provided.innerRef}{...provided.draggableProps} style={provided.draggableProps.style} >
                                            <label>
                                                <input type="checkbox" className="todo-chk hidden" name="check" checked={todo.done} onChange={(e) => handleCheck(todo.id, e.target.checked)} />
                                                <span className="icon"></span>
                                            </label>
                                            <textarea name="todoText" className={todo.done ? "checked" : ""} value={todo.text} onChange={(e) => handleChange(e, todo.id, e.target.value)} style={{ height: todo.areaH }}></textarea>
                                            <div className="btn-box">
                                                <div className="btn btn-drag" {...provided.dragHandleProps}></div>
                                                <button type="button" className="btn btn-delete" onClick={() => handleDelete(todo.id)}></button>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );

}
export default TodoList;