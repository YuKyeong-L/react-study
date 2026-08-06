import { BrowserRouter, Routes, Route } from "react-router-dom";
//import './App.css'
import TodoHome from "./todo-list/Home";
import HanKkiHome from "./han-kki/Home";

function App() {
  return (
    <BrowserRouter basename="/react-study">
      <Routes>
        <Route path="/" element={<TodoHome />} />
        <Route path="/han-kki/*" element={<HanKkiHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App