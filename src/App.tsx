import { useState } from "react";
import List from "./component/list";
import "./App.css";
import Form from "./component/form";

type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];

//const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")):[] ;

// 위의 타입 오류 해결
const initialTodoData: TodoList = JSON.parse(
  localStorage.getItem("todoData") || "[]"
) as TodoList;

export default function App() {
  const [todoData, setTodoData] = useState<TodoList>(initialTodoData);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData([...todoData, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className="font-bold text-2xl">할 일 목록</h1>
          <button className="cursor-pointer" onClick={handleRemoveClick}>
            Delete All
          </button>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
