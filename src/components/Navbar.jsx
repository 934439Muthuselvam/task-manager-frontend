import React, { useState, useEffect } from "react";
import useAuth from "../Shared/hooks/useAuth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useNavigate, Link } from "react-router-dom";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdReportProblem,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { SiProgress } from "react-icons/si";
import { apiGettask } from "../Shared/Services/authentication/userapi/apitask";

export default function Navbar() {
  const { Issignin, logout, userdetails, boolval } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState([]);

  // Toggle mobile menu visibility
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Fetch task data
  const apigettaskfun = async () => {
    try {
      const res = await apiGettask({
        filterData: "dashboard",
        userdata: userdetails()?.email || "",
      });
      setData(res || {});
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  useEffect(() => {
    apigettaskfun();
  }, [boolval]);

  return (
    <div className="flex justify-between items-center bg-white px-5 py-3 2xl:py-4 sticky z-10 top-0">
      {/* Left Section: Account Button */}
     
      <div className="flex gap-2 justify-start lg:ml-auto">
        {Issignin ? (
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-red-400" variant="bordered">
                My Account
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Account Menu">
              <DropdownItem key="new">
                {userdetails()?.name || "User"}
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onClick={logout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <a
            className="bg-blue-700 p-4 font-bold rounded-lg text-center"
            href="/"
          >
            Signin
          </a>
        )}
      </div>

      <h1 className="text-2xl font-bold text-blue-600 flex gap-1 justify-center lg:hidden  items-center flex-1">
    <span className="text-2xl font-bold text-blue-600">Task</span>
    <span className="text-2xl font-bold text-red-400">Assigner</span>
  </h1>

      {/* Right Section: Menu Button */}
      <button
        onClick={handleMenuToggle}
        className="text-2xl text-gray-500 block lg:hidden"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-100 w-full p-2 lg:hidden">
          <div className="flex flex-col gap-y-5 text-base py-8">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-normal gap-2 hover:text-white hover:bg-blue-700 p-2 rounded-lg"
            >
              <div className="mt-1">
                <MdDashboard />
              </div>
              <div>Dashboard</div>
            </Link>

            <Link
              to="/team"
              onClick={() => setIsMenuOpen(false)}
              className={`${
                userdetails()?.name === "admin" ? "flex" : "hidden"
              } justify-normal gap-2 hover:text-white hover:bg-orange-500 p-2 rounded-lg active:scale-110 transition-transform duration-150 ease-in-out`}
            >
              <div className="mt-1">
                <RiTeamFill />
              </div>
              <div>Team</div>
            </Link>

            <Link
              to="/tasks"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between hover:text-white hover:bg-blue-700 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
            >
              <div className="flex items-center gap-2">
                <FaTasks className="text-xl" />
                <span>Total Tasks</span>
              </div>
              <span>{data?.totaltask}</span>
            </Link>

            <Link
              to="/assigned-task"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between hover:text-white hover:bg-pink-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
            >
              <div className="flex items-center gap-2">
                <MdOutlinePendingActions className="text-xl" />
                <span>Assigned</span>
              </div>
              <span>{data?.assignedtask}</span>
            </Link>

            <Link
              to="/inprogress"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between hover:text-white hover:bg-yellow-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
            >
              <div className="flex items-center gap-2">
                <SiProgress className="text-xl" />
                <span>In progress</span>
              </div>
              <span>{data?.inprogress}</span>
            </Link>

            <Link
              to="/some-problem"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between hover:text-white hover:bg-red-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
            >
              <div className="flex items-center gap-2">
                <MdReportProblem className="text-xl" />
                <span>Blocked</span>
              </div>
              <span>{data?.problem}</span>
            </Link>

            <Link
              to="/completed"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between hover:text-white hover:bg-green-500 p-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-105"
            >
              <div className="flex items-center gap-2">
                <MdTaskAlt className="text-xl" />
                <span>Completed</span>
              </div>
              <span>{data?.completed}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
