import React, { useEffect, useState } from "react";
import { apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";
import { Input } from "@nextui-org/react";
import useAuth from "../Shared/hooks/useAuth";
import { div } from "framer-motion/client";
import { warn } from "dialog";

const BoardView = ({ tasks: initialTasks, a }) => {
  const { userdetails } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitle, setTaskTitle] = useState("");

  const handleStageChange =  (index, newStage) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskStage: newStage } : task
    );
    setTasks(updatedTasks);
  };

  const handletextChange =  (index, newStage) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskinfo: newStage } : task
    );
    setTasks(updatedTasks);
  };

  const submit=async(taskdata,index,data)=>{
    if(data!=""){
      const res = await apiupdatetask({taskdata});
      res&&alert("Submitted Succesfully")
      a();
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, taskinfo: "" } : task
      );
      setTasks(updatedTasks); 
    }
    else{
      alert("Input field cannot be Empty")
    }
    
  }

  useEffect(()=>{
    const updatedTasks = tasks.map(task => ({
      ...task,
      taskinfo: ""  // Replace taskinfo with an empty string
    }));
    
    setTasks(updatedTasks);
  },[])

  const formatDate = (data) => {
    const date = new Date(data);
    return date?.toISOString().split("T")[0];
  };
  console.log(tasks);
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="w-full h-fit bg-blue-600  shadow-md p-4 rounded"
        >
          {/* Task Title */}
          <div className="w-full flex justify-between">
            <h4 className="line-clamp-1 text-white font-semibold text-base">
              Task Title: {task?.taskTitle}
            </h4>
          </div>

          {/* Displaying Name and Email */}
          <div className="mt-2 text-white text-sm flex gap-1">
            <div>Email :</div>
            <div className=" flex gap-1">
              {task?.assignedUser?.map((a, index) => (
                <div key={index}>{a + ""}</div>
              ))}
            </div>
          </div>

          {/* Task Stage Selector */}


          
          <div>
            <span className="text-white text-sm">
              {formatDate(task?.taskDate)}
            </span>
          </div>
          
          {userdetails()?.name=="admin"?(
            <div>
            <div className="mt-4">
            <label
              htmlFor={`taskStage-${index}`}
              className="text-sm text-gray-800"
            >
              Task Stage:
            </label>
            <div>{task?.taskStage}</div>
          </div>
            <div className={`${task?.taskinfo==""?"hidden":"block"} w-full flex justify-between`}>
            <h4 className="line-clamp-1 text-white font-semibold text-base">
              Task info: {task?.taskinfo}
            </h4>
          </div>
          </div>
          ):(
            <div>
              <div className="mt-4 mb-3">
            <label
              htmlFor={`taskStage-${index}`}
              className="text-white text-sm"
            >
              Task Stage:
            </label>
            <select
              id={`taskStage-${index}`}
              name="taskStage"
              value={task.taskStage || ""}
              onChange={(e) => handleStageChange(index, e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm
      ${
        task.taskStage === "Complete"
          ? "bg-green-400"
          : task.taskStage === "In Progress"
          ? "bg-yellow-400"
          :task.taskStage === "Problem"? "bg-red-400": "bg-blue-400"
      }`}
            >
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Problem">Problem</option>
            </select>
          </div>
            <div className={`mt-2 text-white text-sm flex gap-1 w-full`}>
            <div className=" flex gap-1">
            <Input
                value={tasks[index]?.taskinfo}
                onChange={(e) => handletextChange(index,e.target.value)}
                placeholder="Enter Task"
                variant="bordered"
                className="bg-white text-black rounded-xl w-full"
                required
              />
            </div>
          </div>
          <div onClick={()=>submit(task,index,tasks[index]?.taskinfo)} role="button">submit</div>
          </div>
          )}
          

          {/* Task Date */}
          
          
        </div>
        
      ))}
    </div>
  );
};

export default BoardView;
