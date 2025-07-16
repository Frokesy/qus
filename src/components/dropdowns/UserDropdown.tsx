import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const UserDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="lg:absolute bg-gray-800 text-[#fff] lg:rounded-xl lg:shadow-lg mt-2 flex flex-col items-start p-2 space-y-2 lg:w-[20vw] w-[100%] lg:top-15 -left-[10vw]"
    >
      <NavLink
        to="/profile"
        className="text-[15px] cursor-pointer w-[100%] text-start hover:bg-gray-600 hover:rounded-xl p-3 transition-all duration-300 ease-in-out lg:border-none border-b-2 border-[#404040]"
      >
        Profile
      </NavLink>
      <NavLink
        to="/settings"
        className="text-[15px] cursor-pointer w-[100%] text-start hover:bg-gray-600 hover:rounded-xl p-3 transition-all duration-300 ease-in-out lg:border-none border-b-2 border-[#404040]"
      >
        Settings
      </NavLink>
    </motion.div>
  );
};
export default UserDropdown;
