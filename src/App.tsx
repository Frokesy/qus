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
import QuizPage from "./pages/tasks/quizpage";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/wallet", element: <Wallet /> },
    { path: "/tasks", element: <Tasks /> },
    { path: "/settings", element: <Settings /> },
    { path: "/profile", element: <Profile /> },
    { path: "/settings/change-password", element: <ChangePassword /> },
    { path: "/settings/edit-profile", element: <EditProfile /> },
    { path: "/taskspage", element: <TaskPage /> },
    { path: "/quizpage", element: <QuizPage /> },
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
