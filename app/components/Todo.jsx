import React from "react";

const Task = ({ text, completed }) => {
  return (
    <div>
      <div
        className={`flex-grow ${
          completed ? "line-through text-gray-500" : "text-black"
        }`}
      >
        {text}
      </div>
      <div>{completed}</div>
    </div>
  );
};

export default Task;
