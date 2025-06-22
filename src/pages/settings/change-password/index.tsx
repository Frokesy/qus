import { useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import { EyeIcon } from "../../../components/svgs/Icons";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // TODO: Implement password change logic
      setError("");
    }
  };

  return (
    <MainContainer>
      <h1 className="text-[30px] font-semibold">Change Password</h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 w-[30vw]">
        <div className="flex flex-col space-y-2 lg:w-[30vw]">
          <label htmlFor="password" className="text-[14px] text-[#232323]">
            Old Password
          </label>
          <div className="flex space-x-2 justify-between bg-[#ececec] rounded-md p-4 w-full">
            <input
              type="password"
              id="password"
              className="outline-none w-[100%]"
            />
            <EyeIcon />
          </div>
        </div>
        <div className="flex flex-col space-y-2 lg:w-[30vw]">
          <label htmlFor="password" className="text-[14px] text-[#232323]">
            New Password
          </label>
          <div className="flex space-x-2 justify-between bg-[#ececec] rounded-md p-4 w-full">
            <input
              type="password"
              id="password"
              className="outline-none w-[100%]"
            />
            <EyeIcon />
          </div>
        </div>
        <div className="flex flex-col space-y-2 lg:w-[30vw]">
          <label htmlFor="password" className="text-[14px] text-[#232323]">
            Confirm New Password
          </label>
          <div className="flex space-x-2 justify-between bg-[#ececec] rounded-md p-4 w-full">
            <input
              type="password"
              id="password"
              className="outline-none w-[100%]"
            />
            <EyeIcon />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#007bff] text-white px-6 py-3 font-semibold rounded-lg">
            Change Password
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </MainContainer>
  );
};

export default ChangePassword;
