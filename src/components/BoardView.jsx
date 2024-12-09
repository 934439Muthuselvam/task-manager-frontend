import React, { useEffect, useState } from "react";
import { apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";
import { Input } from "@nextui-org/react";
import useAuth from "../Shared/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const BoardView = ({ tasks: initialTasks, a, bool }) => {
  const { userdetails, boolval, setboolval } = useAuth();
  const [tasks, setTasks] = useState();

  const handleStageChange = (index, newStage) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskStage: newStage } : task
    );
    setTasks(updatedTasks);
  };

  const handletextChange = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskinfo: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleLinkChange = (index, newLink) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, link: newLink } : task
    );
    setTasks(updatedTasks);
  };

  const submit = async (taskdata, index, data) => {
    if (data !== "") {
      try {
        const res = await apiupdatetask({ taskdata });
        if (res) {
          toast.success("Task updated successfully!");
          a();
          const updatedTasks = tasks.map((task, i) =>
            i === index
              ? { ...task, taskinfo: "", link: "" } 
              : task
          );
          setTasks(updatedTasks);
          setboolval(!boolval); 
        }
      } catch (error) {
        toast.error("Failed to update the task. Please try again!");
      }
    } else {
      toast.error("Input field cannot be empty!");
    }
  };

  useEffect(() => {
    const updatedTasks = initialTasks.map((task) => ({
      ...task,
      taskinfo: "", 
      link: "", 
    }));
    setTasks(updatedTasks);
  }, [initialTasks]);

  const formatDate = (data) => {
    const date = new Date(data);
    return date?.toISOString().split("T")[0];
  };

  return (
    <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-10">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toast container */}
      {tasks?.map((task, index) => (
        <div
          key={index}
          className="w-full h-auto bg-blue-500 shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
        >
          <div className="w-full flex justify-between">
            <h4 className="text-white font-semibold text-xl break-words">
              Task Title : {task?.taskTitle}
            </h4>
          </div>

          <div className="mt-3 text-white font-semibold text-sm flex gap-2">
            <div className="font-medium">Email:</div>
            <div className="flex flex-wrap gap-1">
              {task?.assignedUser?.map((email, index) => (
                <div key={index} className="text-white">
                  {email}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 text-white font-semibold text-sm">
            {formatDate(task?.taskDate)}
          </div>

          {userdetails()?.name === "admin" ? (
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
              <div
                className={`${
                  task?.taskinfo === "" ? "hidden" : "block"
                } w-full font-semibold`}
              >
                <h4 className="text-white font-semibold text-base break-words">
                  Task info: {task?.taskinfo}
                </h4>
              </div>
            </div>
          ) : (
            <div className="mt-4">
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
                  className={`mt-1 text-white w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none 
                                   ${task.taskStage === "Complete"
                                     ? "bg-green-500"
                                     : task.taskStage === "In Progress"
                                     ? "bg-yellow-500"
                                     : task.taskStage === "Blocked"
                                     ? "bg-red-500"
                                     : "bg-pink-500"}`}
                >
                  <option value="Assigned" disabled>
                    Assigned
                  </option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Submitted</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className="mt-2 text-white text-sm">
                <Input
                  value={tasks[index]?.taskinfo}
                  onChange={(e) => handletextChange(index, e.target.value)}
                  placeholder="Remarks "
                  className="bg-white text-black rounded-xl w-full"
                  required
                />
              </div>

              {/* Link Input Field */}
              <div className="mt-4 text-white text-sm">
                <Input
                  value={tasks[index]?.link || ""}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  placeholder="Add a link (optional)"
                  className="bg-white text-black rounded-xl w-full"
                />
              </div>

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
