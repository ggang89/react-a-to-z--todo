type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];
type PropsType = {
  id: number;
  title: string;
  completed: boolean;
  todoData: TodoList;
  setTodoData: React.Dispatch<React.SetStateAction<TodoList>>;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};
export default function TodoItem({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
}:PropsType) {
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
    <div
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded `}
    >
      <div className="items-center">
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={() => handleCompleteChange(id)}
        />{" "}
        <span className={completed ? "line-through" : undefined}>{title}</span>
      </div>
      <div className="items-center">
        <button
          className="px-4 py-2 float-right"
          onClick={() => handleClick(id)}
        >
          X
        </button>
      </div>
    </div>
  );
}
