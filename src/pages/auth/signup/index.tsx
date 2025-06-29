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
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("clicked");
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
      return;
    }

    const userId = signUpData.user.id;

    const { error: insertUserError } = await supabase.from("users").insert([
      {
        user_id: userId,
        name: userDetails.name,
        email: userDetails.email,
        total_earnings: 0,
        frozen_balance: 0,
        free_spins: 1,
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
        navigate("/dashboard");
      },
    });
  };
  return (
    <AuthContainer>
      <ToastContainer />
      <div className="flex flex-col lg:h-[70vh] overflow-y-auto items-center justify-center">
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
          <span className="text-[14px] text-[#232323]">or do via email</span>
          <div className="border-t-2 border-[#ccc] w-10"></div>
        </div>

        <div className="space-y-6 mt-6 lg:w-auto w-[100%]">
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="name" className="text-[14px] text-[#232323]">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="outline-none bg-[#ececec] rounded-md p-4 w-full"
            />
          </div>
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="email" className="text-[14px] text-[#232323]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
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
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                className="outline-none w-[100%]"
              />
              <EyeIcon />
            </div>
          </div>

          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label
              htmlFor="invitationCode"
              className="text-[14px] text-[#232323]"
            >
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
              className="outline-none bg-[#ececec] rounded-md p-4 w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSignup}
              className="bg-[#007bff] text-white px-6 py-3 font-semibold rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-[5vh] mt-20 items-end space-x-3">
        <h2>Already have an account?</h2>
        <NavLink to="/" className="text-[#007bff] underline">
          Login
        </NavLink>
      </div>
    </AuthContainer>
  );
};

export default Signup;
