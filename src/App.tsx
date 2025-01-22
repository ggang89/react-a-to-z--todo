import React, { Component } from "react";
import "./App.css";

export default class App extends Component {

  state = {
     todoDatas : [
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
  ]
  }

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none",
    };
  };

  handleClick = (id:string) => {
    const newTodoDatas = this.state.todoDatas.filter(todo => todo.id !== id);
    this.setState({ todoDatas: newTodoDatas });
  }

 

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

      
          <div>
            {this.state.todoDatas.map((todo) => (
              <div key={todo.id} style={this.getStyle()}>
                <input type="checkbox" defaultChecked={todo.completed} />
               {" "} {todo.title}
                <button style={this.btnStyle} onClick={()=>this.handleClick(todo.id)}>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
