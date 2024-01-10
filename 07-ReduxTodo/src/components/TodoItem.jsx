import { useSelector, useDispatch } from "react-redux";
import { removeTodo, todoCompleted } from "../features/todo/todoSlice";

function TodoItem({ todo }) {

    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const deleteTodoHandler = (todoId) => {
        dispatch(removeTodo(todoId))

    }

    const todoComplete = (todoId) => {
        dispatch(todoCompleted(todoId))
    }

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}
                className={`flex border bg-purple-400 border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black bg-[#ccbed7]"
                }`}
            >
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={todo.completed}
                    onChange={() => todoComplete(todo.id)}
                />
                <input
                    type="text"
                    className={` border-none outline-none w-full bg-transparent rounded-lg "border-transparent ${todo.completed ? "line-through" : "" } `
                    }
                    value={todo.text}
                    readOnly={true}
                />
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                    onClick={() => deleteTodoHandler(todo.id)}
                >
                    ❌
                </button>
            </div>
            ))}
        </div>
        
    );
}

export default TodoItem;
