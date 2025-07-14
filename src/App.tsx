import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import { AnimatePresence } from "framer-motion";
import Wallet from "./pages/wallet";
import Tasks from "./pages/tasks";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import ChangePassword from "./pages/settings/change-password";
import EditProfile from "./pages/settings/edit-profile";
import TaskPage from "./pages/tasks/taskspage";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import ProtectedRoute from "./components/defaults/ProtectedRoute";
import AdminAuth from "./pages/admin/auth";
import AdminDashboard from "./pages/admin/admindashboard";
import Spins from "./pages/admin/spins";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/wallet",
      element: (
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      ),
    },
    {
      path: "/tasks",
      element: (
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/change-password",
      element: (
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/edit-profile",
      element: (
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/tasks/:id",
      element: (
        <ProtectedRoute>
          <TaskPage />
        </ProtectedRoute>
      ),
    },

    //admin routes
    {
      path: "/admin",
      element: <AdminAuth />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/spins",
      element: <Spins />,
    },
  ]);

  useEffect(() => {
    const fetchSession = useAuthStore.getState().fetchSession;
    fetchSession();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default App;
