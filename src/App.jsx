import { useState } from 'react'
//import './App.css'
import './todo-list/Todo.scss'
import TodoList from "./todo-list/Todo.jsx";

function App() {
  //날짜 정보
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const dayText = ['Sun', 'Mon', 'Tues', 'Weds', 'Thur', 'Fri', 'Sat'];

  const [todos, setTodos] = useState([]);

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

  function handleDrag() {

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

export default App