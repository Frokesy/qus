import { NavLink, useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/containers/AuthContainer";
import {
  EmailIcon,
  EyeIcon,
  Facebook,
  GoogleIcon,
} from "../../../components/svgs/Icons";
import { supabase } from "../../../utils/supabaseClient";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    invitationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.invitationCode
    ) {
      toast.error("Please fill in all required fields.", {
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

    const { data: inviteCodeData, error: inviteError } = await supabase
      .from("inviteCodes")
      .select("*")
      .eq("code", userDetails.invitationCode)
      .single();

    if (inviteError || !inviteCodeData) {
      toast.error("Invalid invitation code.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: userDetails.email,
        password: userDetails.password,
        options: {
          data: {
            full_name: userDetails.name,
          },
        },
      },
    );

    if (signUpError || !signUpData.user) {
      toast.error(signUpError?.message || "Signup failed.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
      return;
    }

    const userId = signUpData.user.id;

    const { error: insertUserError } = await supabase.from("users").insert([
      {
        user_id: userId,
        name: userDetails.name,
        email: userDetails.email,
        total_earnings: 0,
        frozen_balance: 10,
        rank: "Novice",
        free_spins: 1,
        daily_tasks: [],
        tasks: [],
      },
    ]);

    if (insertUserError) {
      toast.error("Failed to save user data.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
      return;
    }

    const newInviteCode = uuidv4().split("-")[0];

    const { error: inviteInsertError } = await supabase
      .from("inviteCodes")
      .insert([{ user_id: userId, code: newInviteCode, refs: 0 }]);

    if (inviteInsertError) {
      toast.error("Failed to generate invite code.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
      return;
    }

    toast.success("🎉 Signup successful!", {
      position: "top-center",
      autoClose: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
      onClose: () => {
        setLoading(false);
        navigate("/dashboard");
      },
    });
  };
  return (
    <AuthContainer>
      <ToastContainer />
      <div className="flex flex-col lg:h-[80vh] min-h-screen overflow-y-auto items-center pt-6">
        <h2 className="lg:text-[24px] text-[20px] text-center font-semibold">
          Sign Up to get started!
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
            <label htmlFor="name" className="text-[14px] text-[#fff]">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="outline-none bg-[#ececec] rounded-md p-4 w-full placeholder:text-[#333] text-[#333]"
            />
          </div>
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="email" className="text-[14px] text-[#fff]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
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
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
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

          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="invitationCode" className="text-[14px] text-[#fff]">
              Invitation Code
            </label>
            <input
              type="text"
              id="invitationCode"
              value={userDetails.invitationCode}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  invitationCode: e.target.value,
                })
              }
              className="outline-none bg-[#ececec] rounded-md p-4 w-full placeholder:text-[#333] text-[#333]"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSignup}
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
                "Sign Up"
              )}
            </button>
          </div>
        </div>
        <div className="flex lg:mt-[5vh] mt-20 items-end space-x-3">
          <h2>Already have an account?</h2>
          <NavLink to="/" className="text-[#007bff] underline">
            Login
          </NavLink>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Signup;
