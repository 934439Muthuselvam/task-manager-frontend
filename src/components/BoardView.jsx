import React, { useEffect, useState } from "react";
import { apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";
import { Input } from "@nextui-org/react";
import useAuth from "../Shared/hooks/useAuth";
import { div } from "framer-motion/client";
import { warn } from "dialog";

const BoardView = ({ tasks: initialTasks, a ,bool}) => {
  const { userdetails,boolval,setboolval } = useAuth();
  const [tasks, setTasks] = useState();
  const [taskTitle, setTaskTitle] = useState("");

  const handleStageChange = (index, newStage) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskStage: newStage } : task
    );
    setTasks(updatedTasks);
  };

  const handletextChange = (index, newStage) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskinfo: newStage } : task
    );
    setTasks(updatedTasks);
  };

  const submit = async (taskdata, index, data) => {
    if (data != "") {
      const res = await apiupdatetask({ taskdata });
      res && alert("Submitted Succesfully");
      a();
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, taskinfo: "" } : task
      );
      setTasks(updatedTasks);
      setboolval(!boolval)
    } else {
      alert("Input field cannot be Empty");
    }
  };

  useEffect(() => {
    const updatedTasks = initialTasks.map((task) => ({
      ...task,
      taskinfo: "", // Replace taskinfo with an empty string
    }));

    setTasks(updatedTasks);
   
  }, [initialTasks]);

  const formatDate = (data) => {
    const date = new Date(data);
    return date?.toISOString().split("T")[0];
  };
  console.log(tasks);
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks?.map((task, index) => (
        <div
          key={index}
          className="w-full h-fit bg-blue-700 shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
        >
          {/* Task Title */}
          <div className="w-full flex justify-between">
            <h4 className="line-clamp-1 text-white font-semibold text-xl">
              Task Title : {task?.taskTitle}
            </h4>
          </div>

          {/* Displaying Name and Email */}
          <div className="mt-3 text-white  font-semibold text-sm flex gap-2">
            <div className="font-medium">Email:</div>
            <div className="flex gap-1">
              {task?.assignedUser?.map((a, index) => (
                <div key={index} className="text-white">
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Task Date */}
          <div className="mt-2 text-white font-semibold text-sm">
            {formatDate(task?.taskDate)}
          </div>

          {/* Conditional rendering based on user role (Admin vs Regular User) */}
          {userdetails()?.name=="admin"?(
            <div>
            <div className="mt-4 font-semibold">
            <label
              htmlFor={`taskStage-${index}`}
              className="text-sm text-white"
            >
              Task Stage:
            </label>
            <div>{task?.taskStage}</div>
          </div>
            <div className={`${task?.taskinfo==""?"hidden":"block"} w-full  font-semibold flex justify-between`}>
            <h4 className="line-clamp-1 text-white font-semibold text-base">
              Task info: {task?.taskinfo}
            </h4>
          </div>
          </div>
          ) : (

            <div className="mt-4">
               
              {/* Task Stage Selector */}
              <div className="mb-3">
                <label
                  htmlFor={`taskStage-${index}`}
                  className="text-white text-sm block"
                >
                  Task Stage:
                </label>
                <select
                  id={`taskStage-${index}`}
                  name="taskStage"
                  value={task.taskStage || ""}
                  onChange={(e) => handleStageChange(index, e.target.value)}
                  className={`mt-1 text-white w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none 
                                   ${
                                    task.taskStage === "Complete"
                                   ? "bg-green-500"
                                   : task.taskStage === "In Progress"
                                   ? "bg-yellow-500"
                                    : task.taskStage === "Blocked"
                                    ? "bg-red-500"
                                    : "bg-pink-500"
                                    }`}
                >
                  <option value="Assigned" disabled>Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                  <option value="Blocked">Blocked</option>
                </select>

                {/* Custom Select Arrow */}
                <style>
                         {`
                               select {
                           -webkit-appearance: none;
                               -moz-appearance: none;
                             appearance: none;
                                 background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath fill="black" d="M12 6l-4 4-4-4z" /%3E%3C/svg%3E');
                               background-repeat: no-repeat;
                               background-position: right 1rem center;
                        background-size: 16px; /* Increase the arrow size */
                          }
                         `}
                </style>
              </div>

              {/* Task Info Input */}
              <div className="mt-2 text-white text-sm">
                <Input
                  value={tasks[index]?.taskinfo}
                  onChange={(e) => handletextChange(index, e.target.value)}
                  placeholder="Enter Task Info"
                  className="bg-white text-black rounded-xl w-full"
                  required
                />
              </div>

              {/* Submit Button */}
              <div
                onClick={() => submit(task, index, tasks[index]?.taskinfo)}
                role="button"
                className="mt-4 py-2 px-4 text-center bg-blue-600 hover:bg-blue-900 text-white rounded-lg cursor-pointer"
              >
                Submit
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default BoardView;
