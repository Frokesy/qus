import { User } from "lucide-react";
import MainContainer from "../../components/containers/MainContainer";
import { useAuthStore } from "../../stores/useAuthStore";
import Spinner from "../../components/defaults/Spinner";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuthStore();

  if (loading) return <Spinner />;
  return (
    <MainContainer>
      <div className="h-[80vh] overflow-y-auto lg:pb-0 pb-20 text-[#fff]">
        <h1 className="lg:text-[30px] text-[20px] font-semibold">Profile</h1>

        <div className="flex flex-col justify-center items-center space-y-6 text-center">
          <div className="p-3 border border-[#ccc] rounded-full">
            <User size={100} color="#ccc" />
          </div>
          <div className="flex flex-col">
            <span className="text-[24px] font-semibold">{user?.name}</span>
            <span className="text-gray-500 text-[18px] italic">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between mt-10 lg:w-[50%] space-y-10 lg:space-y-0 mx-auto">
          <div className="space-y-6">
            <div>
              <h2 className="lg:text-[18px] font-semibold">Earnings</h2>
              <p className="lg:text-[16px] text-[14px]">
                ${user?.total_earnings}
              </p>
            </div>
            <div>
              <h2 className="lg:text-[18px] font-semibold">Rank</h2>
              <p className="lg:text-[16px] text-[14px]">{user?.rank}</p>
            </div>
            <div>
              <h2 className="lg:text-[18px] font-semibold">Stats</h2>
              {user?.tasks === null ? (
                <p className="lg:text-[16px] text-[14px]">
                  You haven't completed any tasks yet
                </p>
              ) : (
                <div className="flex flex-col space-y-1">
                  <p>Total Tasks Completed: {user?.tasks.length}</p>
                  <p>Average Rating: 4.8/5</p>
                  <p>Feedback Received: 0</p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="lg:text-[18px] font-semibold">User Details</h2>

            <p>Username: {user?.username ? user.username : "N/A"}</p>
            <p>Phone: {user?.phone ? user.phone : "N/A"}</p>
            <p>Address: {user?.address ? user.address : "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          <NavLink
            to="/settings/edit-profile"
            className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </NavLink>
        </div>
      </div>
    </MainContainer>
  );
};

export default Profile;
