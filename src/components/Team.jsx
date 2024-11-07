import React from 'react'
import Button from './Button';
import clsx from 'clsx';
export default function Team() {
    const summary= [
        {
          name: "New User",
          title: "Designer",
          role: "Developer",
        },
        {
          name: "Emily Wilson",
          title: "Data Analyst",
          role: "Analyst",
        },
        {
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
        },
        {
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
        },
        {
          name: "Codewave Asante",
          title: "Administrator",
          role: "Admin",
        },
      ]
    const TableHeader = () => (
        <thead className='border-b border-gray-300'>
          <tr className='text-black text-left'>
            <th className='py-2'>Full Name</th>
            <th className='py-2'>Title</th>
            <th className='py-2'>Email</th>
            <th className='py-2'>Role</th>
          </tr>
        </thead>
      );
      const TableRow = ({ user }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
          <td className='p-2'>
            <div className='flex items-center gap-3'>
               
              {user.name}
            </div>
          </td>
    
          <td className='p-2'>{user.title}</td>
          <td className='p-2'>{user.email || "user.emal.com"}</td>
          <td className='p-2'>{user.role}</td>
    
          <td className='p-2 flex gap-4 justify-end'>
            <Button
              className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
              label='Edit'
              type='button'
              onClick={() => editClick(user)}
            />
    
            <Button
              className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
              label='Delete'
              type='button'
              onClick={() => deleteClick(user?._id)}
            />
          </td>
        </tr>
      );
  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <div>Team members</div>
          <Button
            label='Add New User'
            icon={<div className='bg-blue-400 w-10 h-10 rounded-full'></div>}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            // onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {summary?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      /> */}
    </>
  )
}
