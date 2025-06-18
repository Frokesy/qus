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
        <div className="flex items-center space-x-3  px-4">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
        <div className="flex items-center space-x-3  px-4">
          <TaskIcon />
          <span>Tasks</span>
        </div>
        <div className="flex items-center space-x-3  px-4">
          <CashIcon />
          <span>Wallet</span>
        </div>
        <div className="flex items-center space-x-3  px-4">
          <SettingsIcon />
          <span>Settings</span>
        </div>
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
