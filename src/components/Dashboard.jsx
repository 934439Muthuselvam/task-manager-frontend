import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { apiGettask } from '../Shared/Services/authentication/userapi/apitask';
import useAuth from '../Shared/hooks/useAuth';
import Inprogress from './Inprogress';
import Completed from './Completed';
import Team from './Team';


export default function Dashboard() {
  const [data, setData] = useState([]);
  const {userdetails}=useAuth();
    const apigettaskfun=async()=>{const res = await apiGettask({filterData:"dashboard",userdata:userdetails()?.email});setData(res)}
    useEffect(()=>{apigettaskfun()},[])
    const stats = [

      {
        _id: "1",
        label: "Total TASK",
        //   total: totals["completed"] || 0,
        
        icon: <div className='w-10 h-10 rounded-full  bg-blue-700 flex justify-center items-center'>{data?.totaltask}</div>,
        bg: "bg-[#1d4ed8]",
      },


        {
          _id: "2",
          label: "ASSIGNED TASK",
          //   total: totals["completed"] || 0,
          
          icon: <div className='w-10 h-10 rounded-full  bg-pink-500 flex justify-center items-center'>{data?.assignedtask}</div>,
          bg: "bg-[#1d4ed8]",
        },

        {
          _id: "3",
          label: "TASK IN PROGRESS ",
          //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-yellow-500 flex justify-center items-center'>{data?.inprogress}</div>,
          bg: "bg-[#f59e0b]",
        },


        {
          _id: "4",
          label: "BLOCKED ",
          //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-red-500 flex justify-center items-center'>{data?.problem}</div>,
          bg: "bg-[#f59e0b]",
        },

     
        // className={`${
        //   userdetails()?.name === "admin" ? "flex" : "hidden"
        //                  } justify-normal gap-2 hover:text-white hover:bg-orange-500 p-2 rounded-lg 
        //                 active:scale-110 transition-transform duration-150 ease-in-out`}
        // {
        //   _id: "5",
        //   label: "Review",
        //   icon: (
        //     <div className="w-10 h-10 rounded-full bg-amber-500 flex justify-center items-center">
        //       {data?.review}
        //     </div>
        //   ),
        //   bg: "bg-[#0f766e]",
        //   visible: (() => {
        //     const role = userdetails()?.name;
        //     console.log("User Role for Review Card:", role); // Debug the role here
        //     return role === "admin";
        //   })(), // Ensure it's visible only to admins
        // },


        {
          _id: "5",
          label: "Review",
        //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-amber-500 flex justify-center items-center'>{data?.review}</div>,
          bg: "bg-[#0f766e]",
        },

        
     
        {
          _id: "7",
          label: "Submitted",
        //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-amber-500 flex justify-center items-center'>{data?.submitted}</div>,
          bg: "bg-[#0f766e]",
        },

      


        {
          _id: "6",
          label: "COMPLTED TASK",
        //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-green-500 flex justify-center items-center'>{data?.completed}</div>,
          bg: "bg-[#0f766e]",
        },

       
     

      
       
        // {
        //   _id: "4",
        //   label: "TODOS",
        //   //   total: totals["completed"] || 0,
        //   icon: <div className='w-10 h-10 rounded-full bg-green-300 flex justify-center items-center'>2</div>,
        //   bg: "bg-[#be185d]" || 0,
        // },
      ];
    
      const Card = ({ label, count, bg, icon }) => {
        return (
          <div className='w-full h-20 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
            <div className=' flex flex-1 flex-col justify-between'>
              <p className='text-base text-gray-600'>{label}</p>
              <span className='text-2xl font-semibold'>{count}</span>
              {/* <span className='text-sm text-gray-400'>{"110 last month"}</span> */}
            </div>
    
            <div
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center text-white",
                bg
              )}
            >
              {icon}
            </div>
          </div>
        );
      };
      return (
        <div classNamee='h-full py-4'>
          <div className='grid lg:grid-cols-1 gap-5 xl:grid-cols-5'>
          {
stats
.filter((item) => {
  // Filter based on the visibility condition
  if (item._id === "5") {
    const role = userdetails()?.name;
    console.log("User Role for Review Card:", role); // Debug the role
    return role === "admin"; // Allow only admins to see the "Review" card
  }
  if (item._id === "7") {
    const role = userdetails()?.name;
    console.log("User Role for Completed Task Card:", role); // Debug the role
    return role !== "admin"; // Hide the "COMPLETED TASK" card for admins
  }
  return true; // Allow all other cards to pass through
})
.map(({ icon, bg, label, total }, index) => (
  <Card key={index} icon={icon} bg={bg} label={label} count={total} />
))

}


          </div>
          <div >
            {/* <Chart/> */}
            {/* <Team/> */}
            {/* <Inprogress/> */}
          {/* <Completed/> */}
          
          </div>
          
        </div>
      );
    };
