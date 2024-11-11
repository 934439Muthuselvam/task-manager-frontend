import React, { useEffect, useState } from 'react'
import { apiGettask } from '../Shared/Services/authentication/userapi/apitask';
import BoardView from './BoardView';
import useAuth from '../Shared/hooks/useAuth';

export default function Inprogress() {
    const [data, setData] = useState([]);
    const {userdetails}=useAuth();
    const apigettaskfun=async()=>{const res = await apiGettask({filterData:"In Progress",userdata:userdetails()?.name});setData(res)}
    useEffect(()=>{apigettaskfun()},[])
    const date =(data)=>{ const date=new Date(data);return date.toISOString().split('T')[0];}
    return (
      <div>
        {data.length>0&&
            <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
            {data.map((task, index) => (
              <div key={index} className="w-full h-fit bg-white shadow-md p-4 rounded">
                <div className="w-full flex justify-between">
                  <h4 className="line-clamp-1 text-black font-bold">{task?.taskTitle}</h4>
                </div>
                <span className="text-sm text-gray-600">{date(task?.taskDate)}</span>
      
                <div className="mt-4">
                  <label htmlFor={`taskStage-${index}`} className="text-sm text-gray-800">
                    Task Stage:
                  </label>
                 <div>{task?.taskStage}</div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    )
  }


