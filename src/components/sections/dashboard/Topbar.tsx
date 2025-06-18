import { Avatar, CaretDown, HelpIcon } from "../../svgs/Icons";

const Topbar = () => {
  return (
    <div className="w-[100%] py-3 flex justify-between px-4 border-b-2 border-[#808080]">
      <img src="/assets/logo.png" alt="logo" className="w-[50px] h-[50px]" />
      <div className="flex items-center space-x-10">
        <HelpIcon />
        <div className="flex items-center space-x-3 bg-[#1B1B2F] text-[#fff] py-2 px-6 rounded-full">
          <Avatar />
          <span className="ml-2">John Doe</span>
          <CaretDown />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
