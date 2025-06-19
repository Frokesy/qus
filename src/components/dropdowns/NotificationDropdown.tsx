import { motion } from "framer-motion";

const NotificationDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="lg:absolute bg-gray-800 text-[#fff] lg:rounded-xl lg:shadow-lg mt-2 flex flex-col items-start space-y-2 lg:w-[20vw] w-[100%] lg:top-15 -left-[18vw] p-6"
    >
      <p className="">No notifications</p>
    </motion.div>
  );
};

export default NotificationDropdown;
