import React, { Component } from "react";
import "./App.css";

type Todo = { id: string; title: string; completed: boolean };
//type TodoList = Todo[];

export default class App extends Component {
  state = {
    todoDatas: [],
    value: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    cssFloat: "right",
  };

  getStyle = (completed: boolean) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  handleClick = (id: string) => {
    const newTodoDatas = this.state.todoDatas.filter((todo:Todo) => todo.id !== id);
    this.setState({ todoDatas: newTodoDatas });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
    
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    this.setState({ todoDatas: [...this.state.todoDatas, newTodo], value: "" });
  };

  handleCompleteChange = (id: string) => {
    const newTodo = this.state.todoDatas.map((todo:Todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todoData: newTodo });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          <div>
            {this.state.todoDatas.map((todo:Todo) => (
              <div key={todo.id} style={this.getStyle(todo.completed)}>
                <input
                  type="checkbox"
                  defaultChecked={todo.completed}
                  onChange={() => this.handleCompleteChange(todo.id)}
                />{" "}
                {todo.title}
                <button
                  style={this.btnStyle}
                  onClick={() => this.handleClick(todo.id)}
                >
                  X
                </button>
              </div>
            ))}

            <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="value"
                style={{ flex: "10", padding: "5px" }}
                placeholder="해야할 일을 입력하세요."
                value={this.state.value}
                onChange={this.handleChange}
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
}
