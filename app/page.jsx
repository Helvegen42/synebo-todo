"use client";
import React from "react";
import { useState } from "react";
import Todo from "./components/Todo";

const page = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
      setInput("");
    }
  };
  console.log(todos);
  return (
    <div className='min-h-screen flex items-start justify-center bg-black text-black'>
      <div className='bg-white shadow-lg rounded-md p-16'>
        <div className='text-3xl font-bold text-center text-green-800 mb-6'>
          ToDo
        </div>
        <div className='flex mb-4'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Add a new task'
            className='flex-grow px-3 py-2 border rounded-l-lg  focus:ring-green-500'
          />
          <button
            onClick={addTodo}
            className='bg-green-500 text-black px-4 py-2 rounded-r-lg hover:bg-green-600'
          >
            Add
          </button>
        </div>
      </div>
      <ul className='space-y-2'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200'
          >
            <input
              className='mr-2 h-5 w-5 text-green-600'
              type='checkbox'
              checked={todo.completed}
              onChange={() =>
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                )
              }
            />
            <Todo id={todo.id} text={todo.text} completed={todo.completed} />
            <button
              className='ml-2 border-none p-2 rounded-lg bg-red-500 text-black hover:bg-red-600'
              onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
