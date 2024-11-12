import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { apiGettask } from '../Shared/Services/authentication/userapi/apitask';
import useAuth from '../Shared/hooks/useAuth';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const {userdetails}=useAuth();
    const apigettaskfun=async()=>{const res = await apiGettask({filterData:"dashboard",userdata:userdetails()?.email});setData(res)}
    useEffect(()=>{apigettaskfun()},[])
    const stats = [
        {
          _id: "1",
          label: "TOTAL TASK",
          //   total: totals["completed"] || 0,
          
          icon: <div className='w-10 h-10 rounded-full bg-green-300 flex justify-center items-center'>{data?.totaltask}</div>,
          bg: "bg-[#1d4ed8]",
        },
        {
          _id: "2",
          label: "COMPLTED TASK",
        //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-green-300 flex justify-center items-center'>{data?.completed}</div>,
          bg: "bg-[#0f766e]",
        },
        {
          _id: "3",
          label: "TASK IN PROGRESS ",
          //   total: totals["completed"] || 0,
          icon: <div className='w-10 h-10 rounded-full bg-green-300 flex justify-center items-center'>{data?.inprogress}</div>,
          bg: "bg-[#f59e0b]",
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
          <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
            <div className='h-full flex flex-1 flex-col justify-between'>
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
          <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
            {stats.map(({ icon, bg, label, total }, index) => (
              <Card key={index} icon={icon} bg={bg} label={label} count={total} />
            ))}
          </div>
        </div>
      );
    };
