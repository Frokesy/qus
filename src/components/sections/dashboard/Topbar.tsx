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
import { NavLink } from "react-router-dom";
import type { CustomUser } from "../../../stores/useAuthStore";
import PromoTickerBar from "../../defaults/PromoTickerBar";

interface TopbarProps {
  user: CustomUser | null;
}

const Topbar = ({ user }: TopbarProps) => {
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState<boolean>(false);
  return (
    <div className="lg:relative fixed w-[100%]">
      <PromoTickerBar />

      <div className="w-[100%] py-3 bg-[#010725] lg:bg-inherit z-50 flex justify-between px-4 border-b-2 border-[#808080] pt-16">
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
            <NavLink
              to="/profile"
              className="p-2 bg-[#1B1B2F] rounded-full lg:hidden shadow-md"
            >
              <User2 color="#fff" />
            </NavLink>
          </div>
          <div className="hidden lg:block relative">
            <div
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-3 bg-[#1B1B2F] cursor-pointer text-[#fff] py-2 px-6 rounded-full"
            >
              <Avatar />
              <span className="ml-2">{user?.name}</span>
              <CaretDown />
            </div>
            {showUserDropdown && <UserDropdown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
