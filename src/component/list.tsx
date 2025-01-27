import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type Todo = { id: number; title: string; completed: boolean };
type TodoList = Todo[];

type PropsType = {
  todoData: TodoList;
  setTodoData: React.Dispatch<React.SetStateAction<TodoList>>; // 상태 업데이트 함수 타입
};

export default function List({ todoData, setTodoData }: PropsType) {
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

  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함된다.
    console.log("result",result)
    // 목적지가 없으면(이벤트 취소) 이 함수를 종료한다.
    if (!result.destination) return;

    // 리액트 불변성을 지키기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

    // 1.변경시키는 아이템을 배열에서 지워준다.
    // 2.return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 넣어준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  }
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((todo: Todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={todo.id}
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
                          defaultChecked={todo.completed}
                          onChange={() => handleCompleteChange(todo.id)}
                        />{" "}
                        <span
                          className={
                            todo.completed ? "line-through" : undefined
                          }
                        >
                          {todo.title}
                        </span>
                      </div>
                      <div className="items-center">
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(todo.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
