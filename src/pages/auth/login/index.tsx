import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

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
      setLoading(false);
      return data;
    }
    setLoading(false);
    toast.success("Login successful! Redirecting...", {
      position: "top-center",
      autoClose: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
      onClose: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <AuthContainer>
      <ToastContainer position="top-center" />

      <div className="flex flex-col lg:h-[80vh] min-h-screen overflow-y-auto items-center pt-6">
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
          <span className="text-[14px] text-[#fff]">or do via email</span>
          <div className="border-t-2 border-[#ccc] w-10"></div>
        </div>

        <div className="space-y-6 mt-6 lg:w-auto w-[100%]">
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="email" className="text-[14px] text-[#fff]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
              className="outline-none bg-[#ececec] rounded-md p-4 w-full placeholder:text-[#333] text-[#333]"
            />
          </div>
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="password" className="text-[14px] text-[#fff]">
              Password
            </label>
            <div className="flex space-x-2 justify-between bg-[#ececec] rounded-md p-4 w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                className="outline-none w-full placeholder:text-[#333] text-[#333] bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[#333]"
                aria-label="Toggle password visibility"
              >
                <EyeIcon />
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`bg-[#007bff] text-white px-6 py-3 font-semibold rounded-lg flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
        <div className="flex mt-[15vh] items-end space-x-3">
          <h2>Don't have an account?</h2>
          <NavLink to="/signup" className="text-[#007bff] underline">
            Register
          </NavLink>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
