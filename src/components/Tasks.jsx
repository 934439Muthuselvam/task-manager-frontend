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
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import toast from "react-hot-toast";
import {
  apiAddtask,
  apiGettask,
} from "../Shared/Services/authentication/userapi/apitask";
import useAuth from "../Shared/hooks/useAuth";
import { apiGetUser } from "../Shared/Services/authentication/userapi/apiuser";

export default function Tasks() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { userdetails } = useAuth();

  // Form state management
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState([]);
  const [email, setAssignedUserEmail] = useState("");
  const [taskStage, setTaskStage] = useState("Assigned");
  const [taskDate, setTaskDate] = useState("");
  const [data, setData] = useState([]);
  const [userdropdown, setUserdropdown] = useState([]);
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: {},
      userdata: userdetails()?.email,
    });
    console.log(res)
    setData(res);
  };
  const apigetuserfun = async () => {
    const res = await apiGetUser();
    setUserdropdown(res);
  };
  useEffect(() => {
    apigettaskfun(), apigetuserfun();
  }, []);

  const handleSubmit = async () => {
    if (
      taskTitle &&
      assignedUser &&
      setAssignedUserEmail &&
      taskStage &&
      taskDate
    ) {
      const taskData = {
        taskTitle,
        assignedUser,
        setAssignedUserEmail,
        taskStage,
        taskDate,
      };
      console.log(taskData);
      const res = await apiAddtask(taskData);

      console.log("User data saved to localStorage:", res);

      onClose();
      toast("User data saved.");
      apigettaskfun();
    } else {
      toast("All fields are required.");
    }
  };
  console.log(assignedUser);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-xl">Tasks</div>
        <Button
          className={`${userdetails()?.name == "admin" ? "block" : "hidden"} `}
          onPress={()=>{setAssignedUser("");setTaskTitle("");setTaskDate("");onOpen()}}
          color="primary"
        >
          Create Tasks
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Add Task</ModalHeader>
            <ModalBody>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                label="Task Title"
                placeholder="Enter Task"
                variant="bordered"
              />
              {/* <Input
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                label="email for User:"
                placeholder="Add User email"
                variant="bordered"
              /> */}
              <Select
                placeholder="Select email"
                className="w-full"
                value={assignedUser}
                onSelectionChange={(e)=>{e.size==0?setAssignedUser(""):setAssignedUser(e.currentKey)}}
              >
                {userdropdown?.map((data, i) => (
                  <SelectItem key={data.email}>{data.email}</SelectItem>
                ))}
              </Select>
              {/* <Input
                value={email}
                onChange={(e) => setAssignedUserEmail(e.target.value)}
                label="name for User:"
                placeholder="Add User Name"
                variant="bordered"
              /> */}

              <div>
                <label
                  htmlFor="taskStage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Stage
                </label>
                <div>{taskStage}</div>
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
              <Button
                color="danger"
                variant="flat"
                onPress={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {data.length > 0 && <BoardView tasks={data} a={apigettaskfun} />}
    </div>
  );
}
