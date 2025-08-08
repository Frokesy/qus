import { NavLink } from "react-router-dom";
import {
  CashIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  SupportIcon,
  TaskIcon,
} from "../../svgs/Icons";
import { useState } from "react";
import LogoutModal from "../../modals/LogoutModal";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="lg:w-[15%] bg-[#010725] lg:bg-inherit z-50 py-4 w-[100%] flex lg:flex-col flex-row justify-between fixed lg:relative bottom-0 lg:border-r-2 border-[#808080] text-[#ffffff] lg:pt-10 lg:h-[95vh]">
        <div className="lg:space-y-6 flex lg:flex-col flex-row justify-between w-[100%]">
          <NavLink
            to="/dashboard"
            className="flex lg:flex-row flex-col items-center lg:space-x-3 space-y-2 px-4"
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/tasks"
            className="flex lg:flex-row flex-col items-center lg:space-x-3 space-y-2 px-4"
          >
            <TaskIcon />
            <span>Tasks</span>
          </NavLink>
          <NavLink
            to="/wallet"
            className="flex lg:flex-row flex-col items-center lg:space-x-3 space-y-2 px-4"
          >
            <CashIcon />
            <span>Wallet</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex lg:flex-row flex-col items-center lg:space-x-3 space-y-2 px-4"
          >
            <SettingsIcon />
            <span>Settings</span>
          </NavLink>
        </div>

        <div className="space-y-6 pb-20 lg:block hidden">
          <a href="https://t.me/+12016095017" className="flex items-center space-x-3 px-4">
            <SupportIcon />
            <span>Live Support</span>
          </a>
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-3 cursor-pointer text-[#E33629] font-semibold px-4"
          >
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>

      <LogoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Sidebar;
