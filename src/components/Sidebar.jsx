import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdReportProblem,
  MdTaskAlt,
} from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../Shared/hooks/useAuth";
import { SiProgress } from "react-icons/si";
import { apiGettask } from "../Shared/Services/authentication/userapi/apitask";

export default function Sidebar() {
  const [data, setData] = useState([]);
  const { userdetails, boolval } = useAuth();
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: "dashboard",
      userdata: userdetails()?.email,
    });
    setData(res);
  };
  useEffect(() => {
    apigettaskfun();
  }, [boolval]);
  return (
    <div className="w-full  h-full  flex-col  gap-6 p-5 lg:flex hidden">
      <h1 className="flex gap-1 items-center">
        <span className="text-2xl font-bold text-blue-600">Task</span>
        <span className="text-2xl font-bold text-red-400">Assigner</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5   text-base py-8 ">
      <Link
          to={"/dashboard"}
          className="flex justify-normal gap-2  hover:text-white hover:bg-blue-700 p-2 rounded-lg"
        >
          <div className="mt-1">
            <MdDashboard />
          </div>
          <div>Dashboard</div>
        </Link>

        <Link
          to={"/team"}
          className={`${
            userdetails()?.name === "admin" ? "flex" : "hidden"
                           } justify-normal gap-2 hover:text-white hover:bg-orange-500 p-2 rounded-lg 
                          active:scale-110 transition-transform duration-150 ease-in-out`}
                         >
            <div className="mt-1">
            <RiTeamFill />
          </div>
          <div>Team</div>
        </Link>

        <Link
          to={"/tasks"}
          className={`flex items-center justify-between hover:text-white hover:bg-blue-700 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105`}
        >
          {/* <div  className="mt-1">
            <FaTasks />
          </div>
          <div>
              Tasks
          </div> */}
          <div className="flex items-center gap-2">
            <FaTasks className="text-xl" />
            <span>Total Tasks</span>
          </div>
          <span>{data?.totaltask}</span>
        </Link>

        <Link
          to={"/assigned-task"}
          className="flex items-center justify-between hover:text-white hover:bg-pink-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
        >
          <div className="flex items-center gap-2">
            <MdOutlinePendingActions className="text-xl" />
            <span>Assigned</span>
          </div>
          <span>{data?.assignedtask}</span>
        </Link>

        <Link
          to={"/inprogress"}
          className="flex items-center justify-between hover:text-white hover:bg-yellow-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
        >
          <div className="flex items-center gap-2">
            <SiProgress className="text-xl" />
            <span>In progress</span>
          </div>
          <span>{data?.inprogress}</span>
        </Link>

        <Link
          to={"/some-problem"}
          className="flex items-center justify-between hover:text-white hover:bg-red-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
        >
          <div className="flex items-center gap-2">
            <MdReportProblem className="text-xl" />
            <span>Blocked</span>
          </div>
          <span>{data?.problem}</span>
        </Link>

        <Link
          to={"/completed"}
          className="flex items-center justify-between hover:text-white hover:bg-green-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
        >
          <div className="flex items-center gap-2">
            <MdTaskAlt className="text-xl" />
            <span>Completed</span>
          </div>
          <span>{data?.completed}</span>
        </Link>
      </div>
    </div>
  );
}
