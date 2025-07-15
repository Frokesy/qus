import { useAdminStore } from "../../stores/useAdminStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../components/containers/AuthContainer";
import { EyeIcon } from "../../components/svgs/Icons";
import { supabase } from "../../utils/supabaseClient";
import { toast, ToastContainer } from "react-toastify";

const AdminAuth = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginDetails.username || !loginDetails.password) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#333", color: "#fff" },
      });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", loginDetails.username)
      .single();

    if (error || !data) {
      toast.error("Admin not found", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#333", color: "#fff" },
      });
      setLoading(false);
      return;
    }

    if (data.password !== loginDetails.password) {
      toast.error("Incorrect password", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#333", color: "#fff" },
      });
      setLoading(false);
      return;
    }

    localStorage.setItem("admin", JSON.stringify(data));
    const setAdmin = useAdminStore.getState().setAdmin;

    setAdmin(data);

    toast.success("Login successful! Redirecting...", {
      position: "top-center",
      autoClose: 2000,
      style: { background: "#333", color: "#fff" },
      onClose: () => navigate("/admin/dashboard"),
    });

    setLoading(false);
  };

  return (
    <AuthContainer>
      <ToastContainer position="top-center" />

      <div className="flex flex-col lg:h-[80vh] overflow-y-auto items-center pt-[20vh]">
        <h2 className="lg:text-[24px] text-[20px] text-center font-semibold">
          Admin Login
        </h2>

        <div className="space-y-6 mt-6 lg:w-auto w-[100%]">
          <div className="flex flex-col space-y-2 lg:w-[25vw]">
            <label htmlFor="username" className="text-[14px] text-[#fff]">
              Admin ID
            </label>
            <input
              type="username"
              id="username"
              value={loginDetails.username}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, username: e.target.value })
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
      </div>
    </AuthContainer>
  );
};

export default AdminAuth;
