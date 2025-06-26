import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";
import { useAuthStore } from "../../stores/useAuthStore";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthStore();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
