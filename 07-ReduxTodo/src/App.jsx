import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  return (
    <>
      <div >
        <h1 className='text-xl font-semibold'>Redux toolkit Todo App</h1>
        <TodoForm />
        <TodoItem />
      </div>
    </>
  )
}

export default App
