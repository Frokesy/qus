import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import { AnimatePresence } from "framer-motion";
import Wallet from "./pages/wallet";
import Tasks from "./pages/tasks";
import Settings from "./pages/settings";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/wallet", element: <Wallet /> },
    { path: "/tasks", element: <Tasks /> },
    { path: "/settings", element: <Settings /> },
  ]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default App;
