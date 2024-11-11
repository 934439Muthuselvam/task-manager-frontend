import React from "react";
import { FaTasks } from "react-icons/fa";
import { MdDashboard, MdOutlineAddTask, MdOutlinePendingActions, MdTaskAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../Shared/hooks/useAuth";

export default function Sidebar() {
  const {userdetails}=useAuth()
  return (
    <div className="w-full  h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">TaskMe</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        <Link to={"/dashboard"} className="flex justify-normal gap-2 hover:text-[#2564ed] hover:bg-blue-100 p-2 rounded-lg">
          <div className="mt-1">
            <MdDashboard />
          </div>
          <div>
              Dashboard
          </div>
        </Link>


        <Link to={"/team"} className={`${userdetails()?.name=="admin"?"flex":"hidden"} justify-normal gap-2 hover:text-[#2564ed] hover:bg-blue-100 p-2 rounded-lg`}>
          <div className="mt-1">
            <RiTeamFill />
          </div>
          <div>
            
              Team
          </div>
        </Link>

        <Link
              to={"/tasks"}  className={` flex justify-normal gap-2 hover:text-[#2564ed] hover:bg-blue-100 p-2 rounded-lg`}>
          <div  className="mt-1">
            <FaTasks />
          </div>
          <div>
              Tasks
          </div>
        </Link>

        <Link
              to={"/completed"}  className="flex justify-normal gap-2 hover:text-[#2564ed] hover:bg-blue-100 p-2 rounded-lg">
          <div  className="mt-1">
          <MdTaskAlt />
          </div>
          <div>
              Completed 
            
          </div>
          </Link>

          <Link
              to={"/inprogress"}  className="flex justify-normal gap-2 hover:text-[#2564ed] hover:bg-blue-100 p-2 rounded-lg">
          <div  className="mt-1">
          <MdOutlinePendingActions />
          </div>
          <div>
              In progress
            
          </div>
          </Link>

       

        {/* <div>a</div> */}
      </div>

      <div className=""></div>
    </div>
  );
}
