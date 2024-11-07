import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-blue-600 p-2 rounded-full'>
          {/* <MdOutlineAddTask className='text-white text-2xl font-black' /> */}
        </p>
        <span className='text-2xl font-bold text-black'>TaskManager</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        <Link to={"/dashboard"} className='hover:text-[#2564ed] hover:bg-blue-100'>Dashboard</Link>
        <Link to={"/team"}  className='hover:text-[#2564ed] hover:bg-blue-100'>Team</Link>
        <Link to={"/tasks"}  className='hover:text-[#2564ed] hover:bg-blue-100'>Task</Link>
        <div>a</div>
      </div>

      <div className=''>
       
      </div>
    </div>
  )
}
