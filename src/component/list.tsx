type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];

type PropsType = {
  todoData: TodoList;
  setTodoData: React.Dispatch<React.SetStateAction<TodoList>>; // 상태 업데이트 함수 타입
};

export default function List({ todoData,setTodoData }: PropsType) {
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
  const handleCompleteChange = (id: number) => {
    const newTodo: TodoList = todoData.map((todo: Todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoData(newTodo);
  };
  const handleClick = (id: number) => {
    const newTodoData = todoData.filter((todo: Todo) => todo.id !== id);
    setTodoData(newTodoData);
  };
  return (
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
    </div>
  );
}
