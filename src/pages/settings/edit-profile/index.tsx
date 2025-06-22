import { User } from "lucide-react";
import MainContainer from "../../../components/containers/MainContainer";

const EditProfile = () => {
  return (
    <MainContainer>
      <div className="h-[80vh] overflow-y-auto lg:pb-0 pb-20">
        <h1 className="lg:text-[30px] text-[20px] font-semibold">
          Edit Profile
        </h1>

        <div className="flex lg:space-x-10 lg:space-y-0 space-y-6 lg:flex-row flex-col lg:w-[60%] mt-10">
          <div className="flex lg:items-start items-center justify-center">
            <div className="border border-[#ccc] p-3 rounded-full">
              <User size={100} color="#ccc" />
            </div>
          </div>
          <div className="space-y-6 w-[100%]">
            <div className="flex lg:flex-row flex-col justify-between lg:space-x-10 lg:space-y-0 space-y-6 w-[100%]">
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label htmlFor="name" className="text-[14px] text-[#232323]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label
                  htmlFor="username"
                  className="text-[14px] text-[#232323]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2 lg:w-[100%]">
              <label htmlFor="email" className="text-[14px] text-[#232323]">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="outline-none bg-[#ececec] rounded-md p-4 w-full"
              />
            </div>

            <div className="flex lg:flex-row flex-col justify-between lg:space-x-10 lg:space-y-0 space-y-6 w-[100%]">
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label htmlFor="address" className="text-[14px] text-[#232323]">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
              <div className="flex flex-col space-y-2 lg:w-[50%]">
                <label htmlFor="phone" className="text-[14px] text-[#232323]">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="outline-none bg-[#ececec] rounded-md p-4 w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-[#007bff] text-white px-6 py-3 font-semibold rounded-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default EditProfile;
