import React, { useEffect, useState } from "react";

import clsx from "clsx";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { IoIosMailOpen, IoMdLock } from "react-icons/io";
import { FaPlus, FaUserCheck } from "react-icons/fa";
import { PiBookOpenUserFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { apiAddUser, apideleteUser, apiGetUser, apiupdateUser } from "../Shared/Services/authentication/userapi/apiuser";
import { apideletetask } from "../Shared/Services/authentication/userapi/apitask";
import useAuth from "../Shared/hooks/useAuth";

export default function Team() {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {userdetails}=useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [bool, setbool] = useState(false);
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState([]);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [formdata,setformdata]=useState({})

  const handlechange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const apigetuserfun=async()=>{const res = await apiGetUser();setSummary(res)}
  useEffect(()=>{apigetuserfun()},[])

  const handleSignIn = async() => {
      const userData = { name, email, role, password };
      const res = await apiAddUser(formdata);
      apigetuserfun()

      // Save data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Console log to verify data saved
      console.log(
        "User data saved to localStorage:",
        res)
      ;

      onClose();
      toast("User data saved.");
    } 
  

  const deleteClicks = async(id) => {
    const res = await apideleteUser(id);
    apigetuserfun()
    // setOpenDialog(true);
  };

  const handleupdate = async() => {
    const res = await apiupdateUser(formdata);
    onClose();
    apigetuserfun();
  };



  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Email</th>
        <th className="py-2">Role</th>
        <th className="py-2">Password</th>
      </tr>
    </thead>
  );
  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">{user.name}</div>
      </td>

      <td className="p-2">{user.email || "user.emal.com"}</td>
      <td className="p-2">{user.role}</td>
      <td className="p-2">{user.password}</td>

      <td className="p-2 flex gap-4 justify-end">
      <Button onPress={()=>{setbool(true);setformdata(user);onOpen()}} color="primary">
            Edit
          </Button>
          

        <Button
          className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(user?._id)}
        >Delete</Button>
      </td>
    </tr>
  );
  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between  font-bold mb-8">  
          <div className="text-xl ">Team members</div>
          <Button className={`${userdetails()?.name=="admin"?"block":"hidden"} `} onPress={()=>{setbool(false);setformdata({});onOpen()}} color="primary">
            {
              <div>
                <FaPlus />
              </div>
            }
            Add User
          </Button>
          
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {summary?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    User Update
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      name="name"
                      value={formdata?.name}
                      onChange={(e) => handlechange(e)}
                      endContent={
                        <FaUserCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Name"
                      placeholder="Enter User Name"
                      variant="bordered"
                      required
                    />

                    <Input
                      id="email"
                      name="email"
                      value={formdata?.email}
                      onChange={(e) => handlechange(e)}
                      endContent={
                        <IoIosMailOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter User email"
                      variant="bordered"
                      required
                    />

                    <Input
                      value={formdata?.role}
                      name="role"
                      onChange={(e) => handlechange(e)}
                      endContent={
                        <PiBookOpenUserFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Role"
                      placeholder="Enter User Role"
                      variant="bordered"
                      required
                    />


                    <Input
                      value={formdata?.password}
                      name="password"
                      onChange={(e) => handlechange(e)}
                      endContent={
                        <IoMdLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter User password"
                      type="password"
                      variant="bordered"
                      required
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={(onClose)}>
                      Close
                    </Button>
                    <Button color="primary" onPress={()=>{bool?handleupdate():handleSignIn()}}>
                      {bool?"update User Data":"add data"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
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
  );
}
