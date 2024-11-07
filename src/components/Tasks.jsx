import React from 'react'
import Button from './Button'
import BoardView from './BoardView';
export default function Tasks() {
    // console.log(tasks)
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <div>Tasks</div>

        {/* {!status && ( */}
          <Button
            // onClick={() => setOpen(true)}
            label='Create Task'
            icon={<div>a\f</div>}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        {/* )} */}
      </div>

      {/* <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )} */}

        {/* {selected !== 1 ? ( */}
          <BoardView />
        {/* ) : (
          <div className='w-full'>
            <Table tasks={tasks} />
          </div>
        )} */}
      {/* </Tabs> */}

      {/* <AddTask open={open} setOpen={setOpen} /> */}
    </div>
  )
}
