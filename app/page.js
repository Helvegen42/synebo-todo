import React from "react";

const page = () => {
  return (
    <div className='min-h-screen flex items-start justify-center bg-black text-black'>
      <div className='bg-white shadow-lg rounded-md p-16'>
        <div className='text-3xl font-bold text-center text-green-800 mb-6'>
          ToDo
        </div>
        <div className='flex mb-4'>
          <input
            type='text'
            placeholder='Add a new task'
            className='flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-green-500'
          />
          <button className='bg-green-500 text-black px-4 py-2 rounded-l-lg hover:bg-green-600'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
