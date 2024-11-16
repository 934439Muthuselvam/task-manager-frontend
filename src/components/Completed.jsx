import React, { useEffect, useState } from "react";
import { apiGettask, apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";
import BoardView from "./BoardView";
import useAuth from "../Shared/hooks/useAuth";
import moment from "moment";

export default function Completed() {
  const [data, setData] = useState([]);
  const { userdetails } = useAuth();
  const {setboolval}=useAuth();

  // Format date and time
  const DateTimeComponent = (data) => {
    const formattedDate = moment(data).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  // Fetch completed tasks
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: "Complete",
      userdata: userdetails()?.email,
    });
    setData(res);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    apigettaskfun();
  }, []);

  // Format date
  const date = (data) => {
    const date = new Date(data);
    return date.toISOString().split("T")[0];
  };

  const handleVerify=async(task)=>{
    alert("Admin verified")
    const updatedTask = { ...task, taskstatus: "Admin Verified" };
    const res = await apiupdatetask({ taskdata:updatedTask });
    // apigettaskfun()
    // setboolval()
  }

  // Handle verify action (admin verifies the task)
  
  const handleDeny = async(task) => {
    const updatedTask = { ...task, taskStage: "In Progress",taskstatus:""  };
    const res = await apiupdatetask({ taskdata:updatedTask });
    // Your deny logic goes here
    console.log("Denied:", task);
    apigettaskfun()
    setboolval()
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
          {data.map((task, index) => (
            <div
              key={index}
              className="w-full h-fit bg-green-500 shadow-lg hover:shadow-2xl p-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div className="font-bold w-full flex gap-1 text-white">
                <div>Task Title:</div>
                <h4 className="line-clamp-1 text-white font-bold">{task?.taskTitle}</h4>
              </div>

              <span className="text-sm font-semibold text-white">{date(task?.taskDate)}</span>

              {/* Assigned Users */}
              <div className="mt-2 text-white text-sm font-semibold flex gap-1">
                <div>Email: </div>
                <div className="flex gap-1">
                  {task?.assignedUser?.map((a, index) => (
                    <div key={index} className="text-white">{a + ""}</div>
                  ))}
                </div>
              </div>

              {/* Task Stage */}
              <div className="mt-4">
                <label htmlFor={`taskStage-${index}`} className="text-sm font-semibold text-white">
                  Task Stage: {task?.taskStage}
                </label>
              </div>

              <div className={`mt-4 `}>
                <label htmlFor={`taskStage-${index}`} className="font-semibold text-sm text-white">
                  Task Status: {task?.taskstatus}
                </label>
              </div>

              {/* Time Section (only shown if Task is Complete) */}
              <div
                className={`mt-2 text-white font-semibold text-sm flex gap-1 ${task?.taskStage === "Complete" ? "block" : "hidden"}`}
              >
                <div>Time:</div>
                <div className="flex gap-1">{DateTimeComponent(task?.updatedAt)}</div>
              </div>

              {/* Task Info */}
              <div className={`${task?.taskinfo === "" ? "hidden" : "block"} w-full mt-4 text-white`}>
                <h4 className="line-clamp-1 font-semibold text-base">Task Info: {task?.taskinfo}</h4>
              </div>

              {/* Buttons for Admin Verify and Deny (Visible only to admin) */}
              {userdetails()?.role === "admin" && (
                <div className="mt-4 flex gap-4 justify-between">
                  <button
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => handleVerify(task)}
                  >
                    Admin Verify
                  </button>
                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
                    onClick={() => handleDeny(task)}
                  >
                    Deny
                  </button>
                </div>
              )}

              {/* Show if the task is Admin Verified */}
              {task.adminVerified && (
                <div className="mt-4 text-white font-bold text-xl">Admin Verified</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
