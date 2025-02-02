import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import React from "react";

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

const TodoItem = React.memo(
  ({
    id,
    title,
    completed,
    todoData=[],
    setTodoData,
    provided,
    snapshot,
  }: PropsType) => {
    const handleCompleteChange = (id: number) => {
      const newTodo = todoData.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
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
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleCompleteChange(id)}
          />{" "}
          <span className={completed ? "line-through" : undefined}>
           {" "} {title}
          </span>
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
);
export default TodoItem;
