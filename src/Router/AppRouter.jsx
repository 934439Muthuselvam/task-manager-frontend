import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Team from '../components/Team'
import Tasks from '../components/Tasks'
import Signin from '../components/User/Signin'
import Signup from '../components/User/Signup'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Completed from '../components/Completed'
import Inprogress from '../components/Inprogress'
import AssignedTask from '../components/AssignedTask'
import SomeProblem from '../components/SomeProblem'


function Layout() {
  
    return (
      <div className='w-full h-screen flex flex-col md:flex-row bg-[#f3f4f6]'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar/>
      </div>
      <div className='flex-1 overflow-y-auto'>
          <Navbar />
          <div className='p-4 2xl:px-10'>
            <Outlet />
          </div>
          </div>
          </div>
    )
  }

export default function AppRouter() {
  return (
    <div className='w-full min-h-screen bg-[#f3f4f6] '>
        <div>
        
        <Toaster richColors  position='top-right'/>
        </div>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/team' element={<Team/>} />
          <Route path='/tasks' element={<Tasks/>} /> 
          <Route path='/completed' element={<Completed/>} />
          <Route path='/inprogress' element={<Inprogress/>} />
          <Route path='/assigned-task' element={<AssignedTask/>} />
          <Route path='/some-problem' element={<SomeProblem/>} />
          

          
        </Route>
        <Route path='/' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
