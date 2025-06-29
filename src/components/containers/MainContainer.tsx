import Sidebar from "../sections/dashboard/Sidebar";
import Topbar from "../sections/dashboard/Topbar";
import { useAuthStore } from "../../stores/useAuthStore";
import Spinner from "../defaults/Spinner";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const { user, loading } = useAuthStore();

  if (loading) return <Spinner />;

  return (
    <div className="bg-[#010725]">
      <Topbar user={user} />
      <div className="flex h-[90vh] lg:overflow-hidden overflow-y-auto lg:flex-row flex-col-reverse">
        <Sidebar />
        <div className="lg:w-[85%] lg:p-10 p-4 lg:mt-10 mt-[15vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
