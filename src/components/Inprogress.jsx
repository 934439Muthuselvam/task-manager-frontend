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
      taskstatus: "",
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
        <div className="w-full py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-10 break-words">
          {data.map((task, index) => (
            <div
              key={index}
              className="w-full bg-yellow-500 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <div className="p-4">
                {/* Task Title */}
                <div className="w-full flex justify-between">
                  <h4 className="text-white font-semibold text-xl break-words">
                    Task Title : {task?.taskTitle}
                  </h4>
                </div>
                {/* Task Date */}
                {/* <span className="text-sm font-semibold text-white">
                  {date(task?.taskDate)}
                </span> */}

                {/* Assigned Users */}
                <div className="mt-2 text-white font-semibold text-sm flex gap-1">
                  <div className="text-white">Email:</div>
                  <div className="flex gap-1">
                    {task?.assignedUser?.map((a, index) => (
                      <div key={index} className="text-white">
                        {a + ""}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Stage */}
                <div className="mt-2  font-semibold mb-5">
                  <label
                    htmlFor={`taskStage-${index}`}
                    className="text-sm text-white"
                  >
                    Task Stage : {task?.taskStage}
                  </label>
                  {/* <div className="text-white font-semibold">
                    {task?.taskStage}
                  </div> */}
                </div>

                {/* Task Info (conditionally displayed) */}
                <div className={`${task?.taskinfo === "" ? "hidden" : "block"} w-full  mt-2 flex justify-between`}>
                <h4 className=" text-white font-semibold text-sm break-words">Remarks : {task?.taskinfo}</h4>
              </div>


                {task?.link && (
                  <div className="mt-2 text-sm text-white break-words">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
