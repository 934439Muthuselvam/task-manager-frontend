import React, { useState } from "react";
import { apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";

const BoardView = ({ tasks: initialTasks, a }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStageChange = async (index, newStage, taskdata) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskStage: newStage } : task
    );
    
    const res = await apiupdatetask({ ...taskdata, taskStage: newStage });
    a();
    setTasks(updatedTasks);
  };

  const formatDate = (data) => { 
    const date = new Date(data);
    return date?.toISOString().split('T')[0];
  };
console.log(tasks)
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task, index) => (
        <div key={index} className="w-full h-fit bg-white shadow-md p-4 rounded">
          {/* Task Title */}
          <div className="w-full flex justify-between">
            <h4 className="line-clamp-1 text-black font-semibold text-base">Task Title: {task?.taskTitle}</h4>
          </div>
          
          {/* Displaying Name and Email */}
          <div className="mt-2 text-gray-700 text-sm flex gap-1">
            <div>Email :</div>
            <div className=" flex gap-1">
              {task?.assignedUser?.map((a,index)=>(
                <div key={index}>{a+","}</div>
              ))}
              
            </div>
          </div>

          {/* Task Stage Selector */}
          <div className="mt-4 mb-3">
            <label htmlFor={`taskStage-${index}`} className="text-gray-800 text-sm">
              Task Stage:
            </label>
            <select
              id={`taskStage-${index}`}
              name="taskStage"
              value={task.taskStage || ""}
              onChange={(e) => handleStageChange(index, e.target.value, task)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              
              <option value="">Select Stage</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Testing">Testing</option>
            </select>
          </div>

          {/* Task Date */}
          <div>
            <span className="text-gray-600 text-sm">{formatDate(task?.taskDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView;
