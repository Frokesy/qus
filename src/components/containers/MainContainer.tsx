import Sidebar from "../sections/dashboard/Sidebar";
import Topbar from "../sections/dashboard/Topbar";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div>
      <Topbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-[85%]">{children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
