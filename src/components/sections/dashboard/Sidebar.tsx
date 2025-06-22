import { NavLink } from "react-router-dom";
import {
  CashIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  SupportIcon,
  TaskIcon,
} from "../../svgs/Icons";

const Sidebar = () => {
  return (
    <div className="lg:w-[15%] bg-[#fff] lg:bg-inherit z-50 py-4 w-[100%] flex lg:flex-col flex-row justify-between fixed lg:relative bottom-0 lg:border-r-2 border-[#808080] text-[#667085] lg:pt-10 lg:h-[95vh]">
      <div className="lg:space-y-6 flex lg:flex-col flex-row justify-between w-[100%]">
        <NavLink
          to="/dashboard"
          className="flex lg:flex-row flex-col items-center space-x-3 px-4"
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/tasks"
          className="flex lg:flex-row flex-col items-center space-x-3 px-4"
        >
          <TaskIcon />
          <span>Tasks</span>
        </NavLink>
        <NavLink
          to="/wallet"
          className="flex lg:flex-row flex-col items-center space-x-3 px-4"
        >
          <CashIcon />
          <span>Wallet</span>
        </NavLink>
        <NavLink
          to="/settings"
          className="flex lg:flex-row flex-col items-center space-x-3 px-4"
        >
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="space-y-6 pb-20 lg:block hidden">
        <div className="flex items-center space-x-3 px-4">
          <SupportIcon />
          <span>Live Support</span>
        </div>
        <div className="flex items-center space-x-3  text-[#E33629] font-semibold px-4">
          <LogoutIcon />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
