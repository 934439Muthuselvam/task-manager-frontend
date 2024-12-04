import React, { useEffect, useState } from "react";
import { apiGettask } from "../Shared/Services/authentication/userapi/apitask";
import BoardView from "./BoardView";
import useAuth from "../Shared/hooks/useAuth";
import moment from "moment";

export default function Inprogress() {
  const [data, setData] = useState([]);
  const { userdetails } = useAuth();
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: "In Progress",
      userdata: userdetails()?.email,
    });
    setData(res);
  };
  useEffect(() => {
    apigettaskfun();
  }, []);
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
            className="w-full bg-yellow-500 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <div className="p-4">
              {/* Task Title */}
              <div className="flex items-center gap-2 font-bold text-lg text-white">
                <div className="text-white">Task Title:</div>
                <h4 className="text-white font-semibold line-clamp-1">{task?.taskTitle}</h4>
              </div>
              {/* Task Date */}
              <span className="text-sm font-semibold text-white">{date(task?.taskDate)}</span>
  
              {/* Assigned Users */}
              <div className="mt-2 text-white font-semibold text-sm flex gap-1">
                <div className="text-white">Email:</div>
                <div className="flex gap-1">
                  {task?.assignedUser?.map((a, index) => (
                    <div key={index} className="text-white">{a + ""}</div>
                  ))}
                </div>
              </div>
  
              {/* Task Stage */}
              <div className="mt-4  font-semibold mb-5">
                <label htmlFor={`taskStage-${index}`} className="text-sm text-white">
                  Task Stage:
                </label>
                <div className="text-white font-semibold">{task?.taskStage}</div>
              </div>
  
              {/* Task Info (conditionally displayed) */}
              {task?.taskinfo && (
                <div className="w-full flex justify-between mt-4 text-sm text-white">
                  <h4 className="line-clamp-1 font-semibold text-base">Task Info: {task?.taskinfo}</h4>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  
  );
}
