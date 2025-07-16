import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import useAdminLogout from "../../stores/useAdminLogout";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 50 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 50 },
};

const LogoutModal = ({ isOpen, onClose, isAdmin }: Props) => {
  const logout = useAuthStore((state) => state.logout);
  const adminLogout = useAdminLogout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    if (isAdmin) {
      await adminLogout();
    } else {
      await logout();
    }
    setLoading(false);
    navigate(isAdmin ? "/admin" : "/login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-[#1A1A1A] text-white rounded-lg shadow-xl w-[90%] max-w-md p-6 space-y-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-lg font-semibold text-center">
              Are you sure you want to log out?
            </h2>

            <div className="flex justify-between items-center mt-6 space-x-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="w-full py-2 border border-gray-600 rounded-md text-gray-200 hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Logging out...
                  </span>
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
