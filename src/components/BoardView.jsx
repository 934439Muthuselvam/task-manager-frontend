import React, { useState } from "react";
import { apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";

const BoardView = ({ tasks: initialTasks,a }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStageChange =async (index, newStage,taskdata) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskStage: newStage } : task
    );
    
    const res = await apiupdatetask({ ...taskdata, taskStage: newStage });
    a()
    setTasks(updatedTasks);
  };
  const date =(data)=>{ const date=new Date(data);return date?.toISOString().split('T')[0];}

  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task, index) => (
        <div key={index} className="w-full h-fit bg-white shadow-md p-4 rounded">
          <div className="w-full flex justify-between">
            <h4 className="line-clamp-1 text-black font-bold">{task?.taskTitle}</h4>
          </div>
          <span className="text-sm text-gray-600">{date(task?.taskDate)}</span>

          <div className="mt-4">
            <label htmlFor={`taskStage-${index}`} className="text-sm text-gray-800">
              Task Stage:
            </label>
            <select
              id={`taskStage-${index}`}
              name="taskStage"
              value={task.taskStage || ""}
              onChange={(e) => handleStageChange(index, e.target.value,task)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Stage</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Testing">Testing</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView;
