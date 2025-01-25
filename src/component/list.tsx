type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];

type PropsType = {
  todoData: TodoList;
  setTodoData: React.Dispatch<React.SetStateAction<TodoList>>; // 상태 업데이트 함수 타입
};

export default function List({ todoData,setTodoData }: PropsType) {
 
  
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
        <div
          key={todo.id}
          className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded "
        >
          <div className="items-center">
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              onChange={() => handleCompleteChange(todo.id)}
            />{" "}
            <span className={todo.completed?"line-through":undefined}>{todo.title}</span>
          </div>
          <div className="items-center">
            <button className ="px-4 py-2 float-right" onClick={() => handleClick(todo.id)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}
