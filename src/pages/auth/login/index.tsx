import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContainer from "../../../components/containers/AuthContainer";
import {
  EmailIcon,
  EyeIcon,
  Facebook,
  GoogleIcon,
} from "../../../components/svgs/Icons";
import { supabase } from "../../../utils/supabaseClient";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!loginDetails.email || !loginDetails.password) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDetails.email,
      password: loginDetails.password,
    });

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return data;
    }

    toast.success("Login successful! Redirecting...", {
      position: "top-center",
      autoClose: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
      onClose: () => {
        window.location.href = "/dashboard";
      },
    });
  };

  return (
    <AuthContainer>
      <ToastContainer position="top-center" />

      <div className="flex flex-col h-[60vh] overflow-y-hidden items-center justify-center">
        <h2 className="lg:text-[24px] text-[20px] text-center font-semibold">
          Welcome back! Sign In to Continue
        </h2>

        <div className="my-6 space-x-6 flex items-center">
          <div className="bg-[#ececec] p-3 rounded-full">
            <Facebook />
          </div>
          <div className="bg-[#ececec] p-3 rounded-full">
            <GoogleIcon />
          </div>
          <div className="bg-[#ececec] p-3 rounded-full">
            <EmailIcon />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="border-t-2 border-[#ccc] w-10"></div>
          <span className="text-[14px] text-[#232323]">or do via email</span>
          <div className="border-t-2 border-[#ccc] w-10"></div>
        </div>

        <div className="space-y-6 mt-6 lg:w-auto w-[100%]">
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="email" className="text-[14px] text-[#232323]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
              className="outline-none bg-[#ececec] rounded-md p-4 w-full"
            />
          </div>
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="password" className="text-[14px] text-[#232323]">
              Password
            </label>
            <div className="flex space-x-2 justify-between bg-[#ececec] rounded-md p-4 w-full">
              <input
                type="password"
                id="password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                className="outline-none w-[100%]"
              />
              <EyeIcon />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleLogin}
              className="bg-[#007bff] text-white px-6 py-3 font-semibold rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-[15vh] items-end space-x-3">
        <h2>Don't have an account?</h2>
        <NavLink to="/signup" className="text-[#007bff] underline">
          Register
        </NavLink>
      </div>
    </AuthContainer>
  );
};

export default Login;
