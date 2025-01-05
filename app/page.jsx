"use client";
import React, { useMemo } from "react";
import { useState } from "react";
import Todo from "./components/Todo";
import Moon from "./assets/Moon";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Josefin_Sans } from "next/font/google";
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

const page = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [todoFilter, setTodoFilter] = useState("All");

  const sensor = useSensors(useSensor(PointerSensor));

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

  const getItemsLeft = () => {
    return todos.filter((item) => !item.completed).length;
  };

  const filteredTodos = useMemo(() => {
    switch (todoFilter) {
      case "All":
        return todos;
      case "Completed":
        return todos.filter((item) => item.completed);
      case "Active":
        return todos.filter((item) => !item.completed);
    }
  }, [todoFilter, todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter((item) => !item.completed));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={josefinSans.className}>
      <div className='absolute'>
        <div className='relative h-[340px] w-screen'>
          <img
            className='absolute h-[340px] w-screen object-cover'
            src='https://assets.iflscience.com/assets/articleNo/73209/aImg/74597/longest-ocean-range-l.webp'
          />
          <div
            className='absolute h-[340px] w-screen'
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
      <div className='min-h-screen flex flex-col w-full items-center text-black relative '>
        <div className='w-full px-[16px] md:px-[64px] xl:px-0 xl:w-[640px] mt-[16px] text-[24px]'>
          <div className='flex justify-between items-center mt-[48px] mb-[32px]'>
            <h1 className='flex  font-bold text-left text-white text-[46px] leading-[100%] tracking-[18px] relative top-[6px]'>
              TODO
            </h1>
            <Moon />
          </div>

          <div className='flex mb-[30px] border bg-white h-[72px] rounded-[6px] items-center'>
            <div className='w-[28px] h-[28px] mr-[28px] ml-[32px]'>
              <div className='round'>
                <input
                  type='checkbox'
                  id={`checkbox-placeholder`}
                  checked={false}
                  onChange={() => {}}
                  itemID='checkbox-placeholder'
                  className='pointer-events-none cursor-default'
                />
                <label
                  htmlFor={`checkbox-placeholder`}
                  className='!cursor-default'
                ></label>
              </div>
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              placeholder='Create a new todo...'
              className='flex-grow relative outline-none placeholder:translate-y-[2px]'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (input.length > 0) {
                    setTodos((prev) => [
                      ...prev,
                      { id: Date.now(), text: input, completed: false },
                    ]);
                    setInput("");
                  }
                }
              }}
            />
            {/* <button
              onClick={addTodo}
              className='bg-green-500 text-white px-4 py-2  hover:bg-green-600 transition'
            >
              Add
            </button> */}
          </div>
          <ul className='divide-y divide-gray-300 shadow-[-2px_19px_31px_20px_rgba(0,_0,_0,_0.1)] rounded-[7px] overflow-hidden '>
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensor}
            >
              <SortableContext items={filteredTodos}>
                {filteredTodos.map((todo) => {
                  return (
                    <div key={todo.id} className='bg-white'>
                      <Todo
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        toggleTodoCompletedState={toggleTodoCompletedState}
                        setTodos={setTodos}
                        todos={todos}
                      />
                    </div>
                  );
                })}
              </SortableContext>
            </DndContext>
            <div className='flex bg-white  text-gray-500 justify-between rounded-b-lg px-3 py-2 text-[16px] flex-wrap'>
              <div className='flex m-1 p-1'>{getItemsLeft()} items left</div>
              <div className='flex rounded-lg '>
                <button
                  className={`m-1 p-1  hover:text-green-600 transition focus:text-green-600 ${
                    todoFilter === "All" ? "text-green-600" : ""
                  }`}
                  onClick={() => setTodoFilter("All")}
                >
                  All
                </button>
                <button
                  className={`m-1 p-1  hover:text-green-600 transition focus:text-green-600 ${
                    todoFilter === "Active" ? "text-green-600" : ""
                  }`}
                  onClick={() => setTodoFilter("Active")}
                >
                  Active
                </button>
                <button
                  className={`m-1 p-1  hover:text-green-600 transition focus:text-green-600 ${
                    todoFilter === "Completed" ? "text-green-600" : ""
                  }`}
                  onClick={() => setTodoFilter("Completed")}
                >
                  Completed
                </button>
              </div>
              <div className='flex m-1 p-1  hover:text-red-600 transition'>
                <button onClick={clearCompletedTodos}>Clear completed</button>
              </div>
            </div>
          </ul>
          <div className=' flex justify-center text-gray-400 text-[16px] mt-[48px] mb-[48px] lg:mb-0'>
            Drag and drop to reorder a list
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
