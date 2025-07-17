import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../stores/useAdminStore";

const useAdminLogout = () => {
  const navigate = useNavigate();
  const clearAdmin = useAdminStore((state) => state.clearAdmin);

  const logout = () => {
    clearAdmin();
    navigate("/admin");
  };

  return logout;
};

export default useAdminLogout;
