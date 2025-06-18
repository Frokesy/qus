import { Avatar } from "../../svgs/Icons";

const Topbar = () => {
  return (
    <div className="w-full h-[10%] bg-[#333333] flex justify-between items-center px-4">
      <span className="text-white text-xl font-bold">Dashboard</span>
      <div className="flex items-center">
        <Avatar />
        <span className="text-white text-sm font-medium mr-4">
          Welcome, John Doe
        </span>
      </div>
    </div>
  );
};

export default Topbar;
