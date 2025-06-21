import Sidebar from "../sections/dashboard/Sidebar";
import Topbar from "../sections/dashboard/Topbar";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="bg-[#f1f1f1]">
      <Topbar />
      <div className="flex h-[95vh] overflow-hidden">
        <Sidebar />
        <div className="w-[85%] p-10">{children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
