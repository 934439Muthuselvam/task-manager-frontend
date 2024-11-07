import React from "react";
import clsx from "clsx";
// import { tasks } from "../assets/data";

const BoardView = () => {
const tasks=["web development","web development1","web development2","web development3","web development4"]
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {tasks.map((task, index) => (
        <div key={index}>
        <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          

          {/* {user?.isAdmin && <TaskDialog task={task} />} */}
        </div>

        <>
          <div className='flex items-center gap-2'>
            <div
              className={"w-4 h-4 rounded-full"}
            />
            <h4 className='line-clamp-1 text-black'>{task}</h4>
          </div>
          <span className='text-sm text-gray-600'>
            28/10/2024
          </span>
        </>

        <div>
        <label for="cars">Choose a car:</label>

        <select name="cars" id="cars">
          {/* <option value="volvo">online</option> */}
          <option value="saab">inprogress</option>
          <option value="mercedes">completed</option>
          <option value="audi">testing</option>
        </select>
        </div>
        </div>
        
      {/* <AddSubTask open={open} setOpen={setOpen} id={task._id} /> */}
      </div>
      ))}
    </div>
    
  );
};

export default BoardView;
