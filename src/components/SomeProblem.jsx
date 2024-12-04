import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGettask } from "../Shared/Services/authentication/userapi/apitask";
import BoardView from "./BoardView";
import useAuth from "../Shared/hooks/useAuth";
import moment from "moment";

export default function SomeProblem() {
  const [data, setData] = useState([]);
  const { userdetails } = useAuth();

  //
  const DateTimeComponent = (data) => {
    const formattedDate = moment(data).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  //

  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: "Blocked",
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
        <div className="w-full py-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-10">
          {data.map((task, index) => (
            <div
              key={index}
              className="w-full h-fit bg-red-500 shadow-md p-4 rounded"
            >
              <div className="font-bold text-white w-full flex gap-1 ">
              <div>Task Titile :</div>
                <h4  className="line-clamp-1 text-white font-bold">
                  {task?.taskTitle}
                </h4>
              </div>
              <span className="text-sm text-white  font-semibold ">
                {date(task?.taskDate)}
              </span>
              <div className="mt-2 text-white   text-sm font-semibold flex gap-1">
                <div>Email : </div>
                <div className=" flex gap-1">
                  {task?.assignedUser?.map((a, index) => (
                    <div key={index}>{a +  ""}</div>
                  ))}
                </div>
              </div>

              <div className="mt-4  text-white font-semibold">
                <label
                  htmlFor={`taskStage-${index}`}
                  className="text-sm "
                >
                  Task Stage:
                </label>
                <div>{task?.taskStage}</div>
              </div>

              <div className={`${task?.taskinfo==""?"hidden":"block"} w-full text-white font-semibold flex justify-between`}>
            <h4 className="line-clamp-1  font-semibold text-base">
              Task info: {task?.taskinfo}
            </h4>
          </div>

              <div
                className={`mt-2  text-sm flex gap-1 ${
                  task?.taskStage == "Complete" ? "block" : "hidden"
                }`}
              >
                <div>Time :</div>
                <div className=" flex gap-1">
                  {DateTimeComponent(task?.updatedAt)}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
