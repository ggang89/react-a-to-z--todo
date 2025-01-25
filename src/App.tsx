import { useState } from "react";
import "./App.css";

type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];

export default function App() {
  const [todoData, setTodoData] = useState<TodoList>([]);
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    cssFloat: "right",
  };

  const getStyle = (completed: boolean) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const handleClick = (id: number) => {
    const newTodoData = todoData.filter((todo: Todo) => todo.id !== id);
    setTodoData(newTodoData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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

  const handleCompleteChange = (id: number) => {
    const newTodo: TodoList = todoData.map((todo: Todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoData(newTodo);
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <div>
          {todoData.map((todo: Todo) => (
            <div key={todo.id} style={getStyle(todo.completed)}>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={() => handleCompleteChange(todo.id)}
              />{" "}
              {todo.title}
              <button style={btnStyle} onClick={() => handleClick(todo.id)}>
                X
              </button>
            </div>
          ))}

          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="해야할 일을 입력하세요."
              value={value}
              onChange={handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: "1" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
