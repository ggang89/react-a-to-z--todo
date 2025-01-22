import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    todoDatas: [
      {
        id: "1",
        title: "공부하기",
        completed: true,
      },
      {
        id: "2",
        title: "운동하기",
        completed: false,
      },
    ],
    value: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed:boolean) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed?"line-through":"none",
    };
  };

  handleClick = (id: string) => {
    const newTodoDatas = this.state.todoDatas.filter((todo) => todo.id !== id);
    this.setState({ todoDatas: newTodoDatas });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(), title: this.state.value, completed: false,
    };

    this.setState({todoDatas:[...this.state.todoDatas,newTodo],value:""})

  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          <div>
            {this.state.todoDatas.map((todo) => (
              <div key={todo.id} style={this.getStyle(todo.completed)}>
                <input type="checkbox" defaultChecked={todo.completed} />{" "}
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
