import { useState } from "react";
import {
  Avatar,
  CaretDown,
  HelpIcon,
  NotificationIcon,
} from "../../svgs/Icons";
import UserDropdown from "../../dropdowns/UserDropdown";
import NotificationDropdown from "../../dropdowns/NotificationDropdown";
import { User2 } from "lucide-react";

const Topbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState<boolean>(false);
  return (
    <div className="w-[100%] py-3 lg:relative fixed bg-[#fff] lg:bg-inherit z-50 flex justify-between px-4 border-b-2 border-[#808080]">
      <img src="/assets/logo.png" alt="logo" className="w-[50px] h-[50px]" />
      <div className="flex items-center lg:space-x-10">
        <div className="lg:block hidden">
          <HelpIcon />
        </div>
        <div className="relative lg:block flex items-center space-x-2">
          <div
            className="cursor-pointer"
            onClick={() =>
              setShowNotificationDropdown(!showNotificationDropdown)
            }
          >
            <NotificationIcon />
          </div>

          <div className="lg:block hidden">
            {showNotificationDropdown && <NotificationDropdown />}
          </div>
          <div className="p-2 bg-[#fff] rounded-full lg:hidden shadow-md">
            <User2 />
          </div>
        </div>
        <div className="hidden lg:block relative">
          <div
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-3 bg-[#1B1B2F] cursor-pointer text-[#fff] py-2 px-6 rounded-full"
          >
            <Avatar />
            <span className="ml-2">John Doe</span>
            <CaretDown />
          </div>
          {showUserDropdown && <UserDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
