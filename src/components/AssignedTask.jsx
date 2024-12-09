import React, { useEffect, useState } from "react";
import { apiGettask } from "../Shared/Services/authentication/userapi/apitask";
import useAuth from "../Shared/hooks/useAuth";

export default function AssignedTask() {
  const [data, setData] = useState([]);
  const { userdetails } = useAuth();

  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: "Assigned",
      userdata: userdetails()?.email,
    });
    const assignedTasks = res.filter((task) => task.taskStage === "Assigned");
    setData(assignedTasks);
  };

  useEffect(() => {
    apigettaskfun();
  }, []);

  const formatDate = (data) => {
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
              className="w-full bg-pink-500 shadow-lg hover:shadow-xl rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div className="p-4">
                {/* Task Title */}

                <div className="w-full flex justify-between">
                  <h4 className="text-white font-semibold text-xl break-words">
                    Task Title : {task?.taskTitle}
                  </h4>
                </div>

                {/* Task Date */}
                <span className="mt:2 text-sm font-semibold text-white">
                 Date : {formatDate(task?.taskDate)}
                </span>

                {/* Assigned Users */}
                <div className="mt-2  text-white font-semibold text-sm flex gap-1">
                  <div>Email:</div>
                  <div className="flex gap-1">
                    {task?.assignedUser?.map((a, index) => (
                      <div key={index} className="text-white">
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Stage */}
                <div className="mt-4   text-white font-semibold mb-5">
                  <label htmlFor={`taskStage-${index}`} className="text-sm">
                    Task Stage: {task?.taskStage}
                  </label>
                  {/* <div className="font-semibold">{task?.taskStage}</div> */}
                </div>

                {/* Task Info (conditionally displayed) */}
                {task?.taskinfo && (
                  <div className="w-full mt-4 text-sm">
                    <h4 className="font-semibold text-base break-words">
                      Task Info: {task?.taskinfo}
                    </h4>
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
