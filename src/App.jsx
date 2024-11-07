import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Team from './components/Team'
import Tasks from './components/Tasks'

function Layout() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-screen flex flex-col md:flex-row bg-red-400'>
    <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
      <Sidebar />
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

function App(){
  return(
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/team' element={<Team/>} />
        <Route path='/tasks' element={<Tasks/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  </main>
  )
}
export default App
