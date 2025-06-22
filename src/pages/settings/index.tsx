import MainContainer from "../../components/containers/MainContainer";
import { CaretDown } from "../../components/svgs/Icons";

const Settings = () => {
  return (
    <MainContainer>
      <h1 className="text-[30px] font-semibold">Settings</h1>

      <div className="space-y-4 w-[50%] mt-10">
        <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
          <span className="text-[16px]">Account Information</span>
          <div className="rotate-270">
            <CaretDown color="black" />
          </div>
        </div>
        <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
          <span className="text-[16px]">Update Payment Information</span>
          <div className="rotate-270">
            <CaretDown color="black" />
          </div>
        </div>
        <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
          <span className="text-[16px]">Change Password</span>
          <div className="rotate-270">
            <CaretDown color="black" />
          </div>
        </div>
        <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
          <span className="text-[16px]">Enable Two-Factor Authentication</span>
          <div className="rotate-270">
            <CaretDown color="black" />
          </div>
        </div>
        <div className="flex items-center justify-between border-b-2 border-[#ccc] pb-4">
          <span className="text-[16px] text-red-500">Logout</span>
          <div className="rotate-270">
            <CaretDown color="black" />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Settings;
