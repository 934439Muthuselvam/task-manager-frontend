import React, { useEffect } from 'react'
import useAuth from '../Shared/hooks/useAuth'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  const {Issignin,logout,userdetails}=useAuth();
  const navigate=useNavigate()

// useEffect(()=>{if(!Issignin){
//   navigate("/")
//   }},[Issignin])


  return (
    <div className='flex justify-between items-center bg-white px-10 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
        //   onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>

        {/* <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
          <MdOutlineSearch className='text-gray-500 text-xl' />

          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
          />
        </div> */}
      </div>

      <div className='flex gap-2 text-center items-center'>
        {/* <NotificationPanel /> */}
        {Issignin==true?  <Dropdown >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          My Account
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions" >
        <DropdownItem key="new">{userdetails().name}</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onPress={logout}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>:<a className='bg-blue-700 p-4 font-bold rounded-lg text-center' href="/">Signin</a>}


       
      </div>
    </div>
  )
}
