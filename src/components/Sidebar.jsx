import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdDashboard,  MdOutlinePendingActions, MdReportProblem, MdTaskAlt } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../Shared/hooks/useAuth";
import { SiProgress } from "react-icons/si";
import { apiGettask } from "../Shared/Services/authentication/userapi/apitask";

export default function Sidebar() {
  const [data, setData] = useState([]);
  const {userdetails}=useAuth()
  const apigettaskfun=async()=>{const res = await apiGettask({filterData:"dashboard",userdata:userdetails()?.email});setData(res)}
  useEffect(()=>{apigettaskfun()},[])
  return (
    <div className="w-full  h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
  <span className="text-2xl font-bold text-blue-600">Task</span>
  <span className="text-2xl font-bold text-red-400">Assigner</span>
</h1>


      <div className="flex-1 flex flex-col gap-y-5 text-base py-8">
        <Link to={"/dashboard"} className="flex justify-normal gap-2  hover:text-white hover:bg-blue-700 p-2 rounded-lg">
          <div className="mt-1">
            <MdDashboard />
          </div>
          <div>
              Dashboard
          </div>
        </Link>


        <Link to={"/team"} className={`${userdetails()?.name=="admin"?"flex":"hidden"} justify-normal gap-2  hover:text-white hover:bg-blue-700 p-2 rounded-lg`}>
          <div className="mt-1">
            <RiTeamFill />
          </div>
          <div>
            
              Team
          </div>
        </Link>

        {/* <Link
              to={"/tasks"}  className={`${userdetails()?.name=="admin"?"flex":"hidden"} flex justify-normal gap-2  hover:text-white hover:bg-blue-700 p-2 rounded-lg`}>
          <div  className="mt-1">
            <FaTasks />
          </div>
          <div>
              Tasks
          </div>
        </Link> */}

        <Link
              to={"/assigned-task"}  className="flex justify-normal gap-2 hover:text-white hover:bg-blue-700 p-2 rounded-lg">
          <div  className="mt-1">
          <MdOutlinePendingActions />
          </div>
          <div>
              Assigned {data?.totaltask}
            
          </div>
          </Link>

       

          <Link
              to={"/inprogress"}  className="flex justify-normal gap-2 hover:text-white hover:bg-blue-700 p-2 rounded-lg">
          <div  className="mt-1">
          <SiProgress />
          </div>
          <div>
              In progress {data?.inprogress}
            
          </div>
          </Link>


          <Link
              to={"/some-problem"}  className="flex justify-normal gap-2 hover:text-white hover:bg-blue-700 p-2 rounded-lg">
          <div  className="mt-1">
          <MdReportProblem />
          </div>
          <div>
          Some Problem {data?.problem}
            
          </div>
          </Link>


          <Link
              to={"/completed"}  className="flex justify-normal gap-2  hover:text-white hover:bg-blue-700 p-2 rounded-lg">
          <div  className="mt-1">
          <MdTaskAlt />
          </div>
          <div>
              Completed {data?.completed}
            
          </div>
          </Link>

       

        {/* <div>a</div> */}
      </div>

      <div className=""></div>
    </div>
  );
}
