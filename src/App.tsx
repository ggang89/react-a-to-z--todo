import { useState } from "react";
import List from "./component/list";
import "./App.css";
import Form from "./component/form";

type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];

export default function App() {
  const [todoData, setTodoData] = useState<TodoList>([]);
  const [value, setValue] = useState("");

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData([...todoData, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={ handleSubmit} value={value} setValue={setValue} />
        
      </div>
    </div>
  );
}
