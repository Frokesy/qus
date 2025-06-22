import Sidebar from "../sections/dashboard/Sidebar";
import Topbar from "../sections/dashboard/Topbar";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="bg-[#f1f1f1]">
      <Topbar />
      <div className="flex h-[95vh] lg:overflow-hidden overflow-y-auto lg:flex-row flex-col-reverse">
        <Sidebar />
        <div className="lg:w-[85%] lg:p-10 p-4 lg:mt-0 mt-[10vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
