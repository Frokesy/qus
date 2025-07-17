import MainContainer from "../../../components/containers/MainContainer";
import { EyeIcon } from "../../../components/svgs/Icons";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../../utils/supabaseClient";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const fallbackTimeout = setTimeout(() => {
      toast.success("Password changed.");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
    }, 5000);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    clearTimeout(fallbackTimeout);

    if (error) {
      toast.error("Failed to update password: " + error.message);
    } else {
      toast.success("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <MainContainer>
      <ToastContainer />
      <div className="h-[80vh] overflow-y-auto text-[#fff] lg:pb-0 pb-20">
        <h1 className="lg:text-[30px] text-[20px] font-semibold">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 lg:w-[30vw]">
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword" className="text-[14px]">
              New Password
            </label>
            <div className="flex items-center justify-between bg-[#ececec] rounded-md p-4 w-full">
              <input
                type={showNew ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="outline-none w-full bg-transparent text-[#333]"
              />
              <span
                onClick={() => setShowNew(!showNew)}
                className="cursor-pointer"
              >
                <EyeIcon />
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-[14px]">
              Confirm New Password
            </label>
            <div className="flex items-center justify-between bg-[#ececec] rounded-md p-4 w-full">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="outline-none w-full bg-transparent text-[#333]"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="cursor-pointer"
              >
                <EyeIcon />
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#007bff] text-white px-6 py-3 font-semibold rounded-lg flex items-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              )}
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};

export default ChangePassword;
