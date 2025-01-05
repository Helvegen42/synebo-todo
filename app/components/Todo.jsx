import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Bin from "../assets/Bin";

const Task = ({
  id,
  text,
  completed,
  toggleTodoCompletedState,
  setTodos,
  todos,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className='flex items-center py-[20px]  text-[24px] ' style={style}>
      <div className='w-[28px] h-[28px] mr-[28px] ml-[32px]'>
        <div className='round'>
          <input
            type='checkbox'
            id={`checkbox-${id}`}
            checked={completed}
            itemID={id}
            onChange={(e) => {
              toggleTodoCompletedState(id);
            }}
          />
          <label htmlFor={`checkbox-${id}`}></label>
        </div>
      </div>
      <div
        className='flex flex-1'
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          touchAction: "none",
          userSelect: "none",
        }}
      >
        <div
          className={`flex-grow relative top-[2px] ${
            completed ? "line-through text-gray-300" : "text-gray-600"
          }`}
        >
          {text}
        </div>
        <div>{completed}</div>
      </div>
      <button
        className='ml-2 border-none p-2 rounded-lg bg-gray-200 text-black hover:bg-red-600 transition mr-[16px] hover:fill-white '
        onClick={() => setTodos(todos.filter((t) => t.id !== id))}
      >
        <Bin />
      </button>
    </li>
  );
};

export default Task;
