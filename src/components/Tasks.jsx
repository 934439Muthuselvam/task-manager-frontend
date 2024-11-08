import React, { useEffect, useState } from "react";
import BoardView from "../components/BoardView";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button, Input } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import toast from "react-hot-toast";
import { apiAddtask, apiGettask } from "../Shared/Services/authentication/userapi/apitask";

export default function Tasks() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Form state management
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [taskStage, setTaskStage] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [data, setData] = useState([]);
  const apigettaskfun=async()=>{const res = await apiGettask();setData(res)}
  useEffect(()=>{apigettaskfun()},[])

  const handleSubmit = async() => {
    if (taskTitle && assignedUser && taskStage && taskDate) {
      const taskData = { taskTitle, assignedUser, taskStage, taskDate };
      const res = await apiAddtask(taskData);

      // Save data to localStorage
      localStorage.setItem("task", JSON.stringify(taskData));

      // Console log to verify data saved
      console.log(
        "User data saved to localStorage:",
        res)
      ;

      // onClose();
      toast("User data saved.");
      apigettaskfun()
    } else {
      toast("All fields are required.");
    }
  };
  console.log(data);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-xl">Tasks</div>
        <Button onPress={onOpen} color="primary">
          <FaPlus />
          Create Tasks
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Add Task
            </ModalHeader>
            <ModalBody>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                label="Task Title"
                placeholder="Enter Task"
                variant="bordered"
              />
              <Input
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                label="Assign Task To:"
                placeholder="Add Users"
                variant="bordered"
              />
              <div>
  <label htmlFor="taskStage" className="block text-sm font-medium text-gray-700">
    Task Stage
  </label>
  <select
    id="taskStage"
    value={taskStage}
    onChange={(e) => setTaskStage(e.target.value)}
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select Task Stage</option>
    <option value="Complete">Complete</option>
    <option value="In Progress">In Progress</option>
    <option value="Testing">Testing</option>
  </select>
</div>

              <Input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                label="Task Date"
                type="date"
                placeholder="Select task date"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    {data.length>0&&
      <BoardView tasks={data} a={apigettaskfun}/>}
    </div>
  );
}
