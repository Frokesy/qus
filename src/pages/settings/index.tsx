import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import { CaretDown } from "../../components/svgs/Icons";
import LogoutModal from "../../components/modals/LogoutModal";
import { useState } from "react";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <MainContainer>
      <div className="h-[80vh] text-[#fff]">
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
              <CaretDown />
            </div>
          </NavLink>
          <NavLink
            to="/settings/change-password"
            className="flex items-center justify-between border-b-2 border-[#ccc] pb-4"
          >
            <span className="lg:text-[16px] text-[14px]">Change Password</span>
            <div className="rotate-270">
              <CaretDown />
            </div>
          </NavLink>
          <NavLink
            to="https://t.me/+12016095017"
            target="_blank"
            className="flex items-center justify-between border-b-2 border-[#ccc] pb-4"
          >
            <span className="lg:text-[16px] text-[14px]">Live Support</span>
            <div className="rotate-270">
              <CaretDown />
            </div>
          </NavLink>
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center justify-between cursor-pointer border-b-2 border-[#ccc] pb-4"
          >
            <span className="lg:text-[16px] text-[14px] text-red-500">
              Logout
            </span>
          </div>
        </div>
      </div>
      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </MainContainer>
  );
};

export default Settings;
