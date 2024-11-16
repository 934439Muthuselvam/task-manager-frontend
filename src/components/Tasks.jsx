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
import toast from "react-hot-toast";
import {
  apiAddtask,
  apiGettask,
} from "../Shared/Services/authentication/userapi/apitask";
import useAuth from "../Shared/hooks/useAuth";
import { apiGetUser } from "../Shared/Services/authentication/userapi/apiuser";

export default function Tasks() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { userdetails, setboolval } = useAuth();
  const [bool, setbool] = useState();

  const [taskTitle, setTaskTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [assignedUserName, setAssignedUserName] = useState(""); // State for user name
  const [taskStage, setTaskStage] = useState("Assigned");
  const [taskDate, setTaskDate] = useState("");
  const [data, setData] = useState([]);
  const [userdropdown, setUserdropdown] = useState([]); // List of users for dropdown

  // Fetch tasks
  const apigettaskfun = async () => {
    const res = await apiGettask({
      filterData: {},
      userdata: userdetails()?.email,
    });
    setData(res);
  };

  console.log("data", data);

  // Fetch users for dropdown
  const apigetuserfun = async () => {
    const res = await apiGetUser();
    setUserdropdown(res);
  };

  useEffect(() => {
    apigettaskfun();
    apigetuserfun();
    console.log("sdfsd");
  }, [bool]);

  // Handle task form submission
  const handleSubmit = async () => {
    if (
      taskTitle &&
      assignedUser &&
      assignedUserName &&
      taskStage &&
      taskDate
    ) {
      const taskData = {
        taskTitle,
        assignedUser,
        assignedUserName,
        taskStage,
        taskDate,
      };
      await apiAddtask(taskData);
      onClose();
      toast("User data saved.");

      // Option 1: Full page reload (uncomment if you want this behavior)
      // window.location.reload();

      // Option 2: Component refresh (uncomment if you prefer this approach)
      apigettaskfun(); // Refresh component data
      setboolval();
    } else {
      toast("All fields are required.");
    }
  };

  // const submit = async (taskdata, index, data) => {
  //   if (data != "") {
  //     const res = await apiupdatetask({ taskdata });
  //     res && alert("Submitted Succesfully");
  //     a();
  //     const updatedTasks = tasks.map((task, i) =>
  //       i === index ? { ...task, taskinfo: "" } : task
  //     );
  //     setTasks(updatedTasks);
  //     setboolval(!boolval)
  //   } else {
  //     alert("Input field cannot be Empty");
  //   }
  // };

  // Handle user selection from dropdown
  const handleUserSelection = (email) => {
    const selectedUser = userdropdown.find((user) => user.email === email);
    setAssignedUser(email);
    setAssignedUserName(selectedUser?.name || ""); // Set user's name based on selection
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-xl">Tasks</div>
        <Button
          className={`${userdetails()?.name === "admin" ? "block" : "hidden"}`}
          onPress={() => {
            setAssignedUser("");
            setTaskTitle("");
            setTaskDate("");
            setAssignedUserName("");
            onOpen();
          }}
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
              <Select
                placeholder="Select email"
                className="w-full"
                value={assignedUser}
                onSelectionChange={(e) => handleUserSelection(e.currentKey)}
              >
                {userdropdown.map((user) => (
                  <SelectItem key={user.email} value={user.email}>
                    {user.email}
                  </SelectItem>
                ))}
              </Select>
              <Input
                value={assignedUserName}
                label="User Name"
                placeholder="User's name will appear here"
                readOnly // Make input read-only since it's auto-filled
                variant="bordered"
              />
              <Input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                label="Task Date"
                type="date"
                placeholder="Select task date"
                variant="bordered"
                min={new Date().toISOString().split("T")[0]} // Minimum date is today
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {data.length > 0 && (
        <BoardView
          tasks={data}
          a={apigettaskfun}
          bool={bool}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
}
