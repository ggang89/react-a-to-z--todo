import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import React, { useState } from "react";

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
    todoData = [],
    setTodoData,
    provided,
    snapshot,
  }: PropsType) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id: number) => {
      const newTodo = todoData.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodoData(newTodo);
      localStorage.setItem("todoData", JSON.stringify(newTodo));
    };
    const handleClick = (id: number) => {
      const newTodoData = todoData.filter((todo: Todo) => todo.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();

      const newTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          todo.title = editedTitle;
        }
        return todo;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded ">
          <div className="flex items-center">
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                onChange={handleEditChange}
                className="bg-white w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
            >
              X
            </button>
            <button
              className="px-4 py-2 float-right"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      );
    } else {
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
              {" "}
              {title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleClick(id)}
            >
              X
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  }
);
export default TodoItem;
