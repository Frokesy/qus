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
    <div className="w-[15%] flex flex-col justify-between border-r-2 border-[#808080] text-[#667085] pt-3 h-[95vh]">
      <div className="space-y-6">
        <NavLink to="/dashboard" className="flex items-center space-x-3  px-4">
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/tasks" className="flex items-center space-x-3  px-4">
          <TaskIcon />
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/wallet" className="flex items-center space-x-3  px-4">
          <CashIcon />
          <span>Wallet</span>
        </NavLink>
        <NavLink to="/settings" className="flex items-center space-x-3  px-4">
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="space-y-6 pb-20">
        <div className="flex items-center space-x-3  px-4">
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
