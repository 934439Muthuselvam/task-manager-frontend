import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiGettask, apiupdatetask } from "../Shared/Services/authentication/userapi/apitask";
import moment from "moment";
import useAuth from "../Shared/hooks/useAuth";

export default function UserSubmitted()  {
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

  // Format date
  const date = (data) => {
    const date = new Date(data);
    return date.toISOString().split("T")[0];
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

              {/* <span className="text-sm font-semibold text-white">{date(task?.taskDate)}</span> */}

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
              {/* <div className="mt-4">
                <label htmlFor={`taskStage-${index}`} className="text-sm font-semibold text-white">
                  Task Stage: {task?.taskStage}
                </label>
              </div> */}

              {/* <div className={`mt-4 `}>
                <label htmlFor={`taskStage-${index}`} className="font-semibold text-sm text-white">
                  Task Status: {task?.taskstatus}
                </label>
              </div> */}

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

 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
