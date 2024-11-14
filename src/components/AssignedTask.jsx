import React, { useEffect, useState } from "react";
import BoardView from "./BoardView";
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

export default function AssignedTask() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { userdetails } = useAuth();

  // Form state management
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState([]);
  const [email, setAssignedUserEmail] = useState("");
  const [taskStage, setTaskStage] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [data, setData] = useState([]);
  const [userdropdown, setUserdropdown] = useState([]);
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: {},
      userdata: userdetails()?.email,
    });
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
        <div className="font-bold text-xl">Assigned Tasks</div>
       
      </div>
      {data.length > 0 && <BoardView tasks={data} a={apigettaskfun} />}
    </div>
  );
}
