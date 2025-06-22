import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import { CaretDown } from "../../components/svgs/Icons";

const Settings = () => {
  return (
    <MainContainer>
      <div className="h-[80vh]">
        <h1 className="lg:text-[30px] text-[20px] font-semibold">Settings</h1>

        <div className="space-y-4 lg:w-[50%] mt-10">
          <NavLink
            to="/settings/edit-profile"
            className="flex items-center justify-between border-b-2 border-[#ccc] pb-4"
          >
            <span className="lg:text-[16px] text-[14px]">
              Edit Account Information
            </span>
            <div className="rotate-270">
              <CaretDown color="black" />
            </div>
          </NavLink>
          <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
            <span className="lg:text-[16px] text-[14px]">
              Update Payment Information
            </span>
            <div className="rotate-270">
              <CaretDown color="black" />
            </div>
          </div>
          <NavLink
            to="/settings/change-password"
            className="flex items-center justify-between border-b-2 border-[#ccc] pb-4"
          >
            <span className="lg:text-[16px] text-[14px]">Change Password</span>
            <div className="rotate-270">
              <CaretDown color="black" />
            </div>
          </NavLink>
          <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
            <span className="lg:text-[16px] text-[14px]">
              Enable Two-Factor Authentication
            </span>
            <div className="rotate-270">
              <CaretDown color="black" />
            </div>
          </div>
          <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
            <span className="lg:text-[16px] text-[14px] text-red-500">
              Logout
            </span>
            <div className="rotate-270">
              <CaretDown color="black" />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Settings;
