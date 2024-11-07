import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apisignup } from "../../Shared/Services/authentication/userapi/apiusersignup";
import toast from "react-hot-toast";

const Signup = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await apisignup(formData);
  
      // Check response and handle accordingly
      res.message === "successfully signup"
        ? success(res)
        : toast.error(res.message);
    };
  
    const success = (res) => {
      toast.success(res.message);
      navigate("/"); // Redirect to customer sign-in after successful signup
    };
  
    return (
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
          {/* left side */}
          <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
            <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
              <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
                Manage all your task in one place!
              </span>
              <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
                <span>Task Manager</span>
              </p>
  
              <div className="cell">
                <div className="circle rotate-in-up-left"></div>
              </div>
            </div>
          </div>
  
          {/*right side*/}
          <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="form-container rounded-2xl w-full md:w-[450px] flex flex-col gap-y-3 bg-white px-10 pt-10 pb-10"
            >
              <div className="">
                <p className="text-blue-600 text-3xl font-bold text-center">
                  Create a new account
                </p>
                <p className="text-center text-base text-gray-700 ">
                  It's quick and easy.
                </p>
              </div>
  
              {/* Name Field */}
              <div className="flex flex-col  gap-y-5">
                <label className="block text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
  
                {/* Email Field */}
  
                <label className="block text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
  
                {/* Phone Field */}
  
                <label className="block text-gray-700" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                />
  
                {/* Password Field */}
  
                <label className="block text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your Password"
                  required
                />
             
  
              {/* Sign Up Button */}
              <button
                className="bg-blue-600 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-700"
                type="submit"
              >
                Sign Up
              </button>
  
              <p className="text-sm text-center mt-3  text-gray-500 ">
                Already have an account?{" "}
                <a href="/" className="text-blue-600 ">
                  Sign in
                </a>
              </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Signup;
  