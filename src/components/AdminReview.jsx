import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiGettask, apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";
import moment from "moment";
import useAuth from "../Shared/hooks/useAuth";

export default function AdminReview() {
  const [data, setData] = useState([]);
  const { userdetails } = useAuth();
  const { setboolval } = useAuth();

  // Format date and time
  const DateTimeComponent = (data) => {
    const formattedDate = moment(data).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  // Fetch completed tasks
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: "Complete",
      taskstatus: "",
      userdata: userdetails()?.email,
    });
    setData(res);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    apigettaskfun();
  }, []);

  // Handle verify action (admin verifies the task)
  const handleVerify = async (task) => {
    const confirm = window.confirm("Are you sure you want to verify this task?");
    if (confirm) {
      try {
        const updatedTask = { ...task, taskstatus: "Admin Verified" };
        await apiupdatetask({ taskdata: updatedTask });
        toast.success("Task successfully verified!");
        apigettaskfun();
        setboolval();
      } catch (error) {
        toast.error("Failed to verify the task.");
      }
    } else {
      toast("Task verification cancelled.");
    }
  };

  // Handle deny action
  const handleDeny = async (task) => {
    const confirm = window.confirm("Are you sure you want to deny this task?");
    if (confirm) {
      try {
        const updatedTask = { ...task, taskStage: "In Progress", taskstatus: "" };
        await apiupdatetask({ taskdata: updatedTask });
        toast.success("Task successfully denied!");
        apigettaskfun();
        setboolval();
      } catch (error) {
        toast.error("Failed to deny the task.");
      }
    } else {
      toast("Task denial cancelled.");
    }
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-10">
          {data.map((task, index) => (
            <div
              key={index}
              className="w-full h-fit bg-amber-500 shadow-lg hover:shadow-2xl p-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div className="w-full flex justify-between">
                <h4 className="text-white font-semibold text-xl break-words">
                  Task Title : {task?.taskTitle}
                </h4>
              </div>

              {/* Assigned Users */}
              <div className="mt-2 text-white text-sm font-semibold flex gap-1">
                <div>Email: </div>
                <div className="flex gap-1">
                  {task?.assignedUser?.map((a, index) => (
                    <div key={index} className="text-white">{a + ""}</div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
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
              <div className={`${task?.taskinfo === "" ? "hidden" : "block"} w-full flex justify-between`}>
                <h4 className="mt-2 text-white font-semibold text-sm break-words">Remarks : {task?.taskinfo}</h4>
              </div>

              {task?.link && (
                <div className="mt-4 text-sm text-white break-words">
                  <strong>URL :</strong>{" "}
                  <a
                    href={task?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-700"
                  >
                    {task?.link}
                  </a>
                </div>
              )}

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
