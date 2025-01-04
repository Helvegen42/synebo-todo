"use client";
import React from "react";
import { useState } from "react";
import Todo from "./components/Todo";
import Moon from "./components/Moon";

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

  const toggleTodoCompletedState = (todoId) => {
    const newTodos = todos.map((item) =>
      item.id === todoId ? { ...item, completed: !item.completed } : item
    );

    setTodos(newTodos);
  };

  return (
    <>
      <div className='absolute'>
        <div className='relative h-60 w-screen'>
          <img
            className='absolute h-60 w-screen object-cover'
            src='https://assets.iflscience.com/assets/articleNo/73209/aImg/74597/longest-ocean-range-l.webp'
          />
          <div
            className='absolute h-60 w-screen '
            style={{
              background: "rgb(43,187,217)",
              background:
                "linear-gradient(295deg, rgba(43,187,217,0.8239670868347339) 8%, rgba(145,105,180,0.7903536414565826) 50%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
      <div className='min-h-screen flex flex-col w-full items-center text-black relative z-2'>
        <div className='w-[640px] mt-[16px] '>
          <div className='flex justify-between py-[36px]'>
            <h1 className='flex text-3xl font-bold text-left text-white mb-6 text-[46px] tracking-[18px]'>
              TODO
            </h1>
            <Moon />
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
              className='bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600'
            >
              Add
            </button>
          </div>
          <ul className='space-y-2'>
            {todos.map((todo) => {
              console.log("todo:", todo);

              return (
                <li
                  key={todo.id}
                  className='flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200'
                >
                  <div className='container'>
                    <div className='round'>
                      <input
                        type='checkbox'
                        id={`checkbox-${todo.id}`}
                        checked={todo.completed}
                        itemID={todo.id}
                        onChange={(e) => {
                          toggleTodoCompletedState(todo.id);
                        }}
                      />
                      <label htmlFor={`checkbox-${todo.id}`}></label>
                    </div>
                  </div>
                  <Todo text={todo.text} completed={todo.completed} />
                  <button
                    className='ml-2 border-none p-2 rounded-lg bg-red-500 text-black hover:bg-red-600'
                    onClick={() =>
                      setTodos(todos.filter((t) => t.id !== todo.id))
                    }
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
