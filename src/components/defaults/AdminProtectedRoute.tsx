import { Navigate } from "react-router-dom";
import { useAdminStore } from "../../stores/useAdminStore";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: Props) => {
  const { admin } = useAdminStore();

  if (!admin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
