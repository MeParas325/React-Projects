import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts'
import {TodoForm, TodoItem} from "./components"

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {

    setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos])

  }

  const updateTodo = (id, todo) => {

    setTodos((prevTodos) => prevTodos.map((prevTodo) => prevTodo.id === id ? { ...todo, id: Date.now() } : prevTodo))

  }

  const deleteTodo = (id) => {

    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id != id))

  }

  const toggleComplete = (id) => {

    setTodos((prevTodos) => prevTodos.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))

  }

  useEffect(() => {

    const localTodos = JSON.parse(localStorage.getItem("todos"))

    if (localTodos && localTodos.length > 0) {
      setTodos(localTodos)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => {
              return <div className='w-full' key={todo.id}>
                 <TodoItem todo = {todo} />
              </div>
})}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
