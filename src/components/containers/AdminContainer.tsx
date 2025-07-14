import { useState } from "react";
import LogoutModal from "../modals/LogoutModal";
import { Avatar, DashboardIcon, LogoutIcon, TaskIcon } from "../svgs/Icons";
import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminContainer = ({ children }: Props) => {
  const [showAdminLogoutModal, setShowAdminLogoutModal] = useState(false);

  return (
    <div className="bg-[#010725] min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full py-3 bg-[#010725] border-b-2 border-[#808080] px-4 flex justify-between items-center fixed top-0 z-50">
        <img src="/assets/logo.png" alt="logo" className="w-[40px] h-[40px]" />
        <div className="hidden lg:flex items-center space-x-3 bg-[#1B1B2F] text-white py-2 px-4 rounded-full">
          <Avatar />
          <span>Super Admin</span>
        </div>
      </div>

      <div className="flex flex-1 pt-[72px] lg:pt-[90px]">
        <div className="lg:w-[15%] w-full lg:h-auto fixed lg:relative bottom-0 lg:flex-col lg:border-r-2 border-t-2 lg:border-t-0 border-[#808080] bg-[#010725] text-white z-40 flex justify-between px-6 py-4">
          <div className="flex lg:flex-col w-full justify-between lg:space-y-6">
            <NavLink
              to="/admin/dashboard"
              className="flex flex-col lg:flex-row lg:items-start items-center space-x-0 lg:space-x-3 space-y-1 lg:space-y-0 cursor-pointer px-2"
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/spins"
              className="flex flex-col lg:flex-row lg:items-start items-center space-x-0 lg:space-x-3 space-y-1 lg:space-y-0 cursor-pointer px-2"
            >
              <TaskIcon />
              <span>Spins</span>
            </NavLink>
          </div>

          <div className="lg:pb-10">
            <div
              onClick={() => setShowAdminLogoutModal(true)}
              className="flex lg:flex-row flex-col items-center space-x-2 text-[#E33629] font-semibold cursor-pointer"
            >
              <LogoutIcon />
              <span>Logout</span>
            </div>
          </div>
        </div>

        <div className="lg:w-[85%] mt-10 lg:ml-6 w-full px-4 lg:px-10 pb-20 pt-6 lg:pt-0 overflow-y-auto">
          {children}
        </div>
      </div>

      <LogoutModal
        isOpen={showAdminLogoutModal}
        onClose={() => setShowAdminLogoutModal(false)}
      />
    </div>
  );
};

export default AdminContainer;
