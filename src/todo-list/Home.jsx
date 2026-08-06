import { useState, useEffect } from 'react'

import './Todo.scss'
import TodoList from "./Todo.jsx";

function Home() {

    const [now, setToday] = useState(new Date()); //날짜의 초기값
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
    const dayText = ['Sun', 'Mon', 'Tues', 'Weds', 'Thur', 'Fri', 'Sat'];

    useEffect(() => {
        //날짜 정보
        const tomorrow = new Date(now);

        tomorrow.setDate(tomorrow.getDate() + 1); //날짜 변경
        tomorrow.setHours(0, 0, 0, 0); // 00:00
        const timeout = tomorrow - now;

        const timer = setTimeout(() => {
            //자정이 되면 useState 상태를 변경
            setToday(new Date());
        }, timeout);

        //타이머 정리
        return function () {
            clearTimeout(timer);
        }
    }, [now])

    const [todos, setTodos] = useState(() => {
        const savedData = localStorage.getItem("todos");

        //갹체 생성
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const doneCount = todos.filter(todo => todo.done).length;
    const donePercent = Math.round(doneCount / todos.length * 100);

    function handleAdd() {
        //배열의 뒤에 추가
        //배열이 업데이트 됨과 동시에 화면에 li가 렌더링 됨
        setTodos(todo => [
            ...todo,
            {
                id: Date.now(),
                text: "",
                done: false,
            }
        ]);
    }

    return (
        <>
            <header className="header"></header>
            <main className="main">
                <section className="sec-todo">
                    <div className="top-area">
                        <div className="top-inner">
                            <button type="button" className="add-todo" onClick={handleAdd}></button>
                            <h1 className="title">To-Do List</h1>
                        </div>
                    </div>
                    <div className="todo-area">
                        <TodoList todos={todos} setTodos={setTodos} />
                    </div>
                    <div className="total-area">
                        <div className="goal">
                            <span className="num">
                                {doneCount}/{todos.length}
                            </span>
                            <span className="percent">
                                {Number.isNaN(donePercent) ? 0 : donePercent}%
                            </span>
                        </div>
                        <p className="date">
                            {month < 10 ? '0' + month : month}/{date < 10 ? '0' + date : date} {dayText[day]}
                        </p>
                    </div>
                </section>
            </main>
            <footer className="footer"></footer>
        </>
    )
}

export default Home