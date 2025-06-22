import { User } from "lucide-react";
import MainContainer from "../../components/containers/MainContainer";

const Profile = () => {
  return (
    <MainContainer>
      <h1 className="text-[30px] font-semibold">Profile</h1>

      <div className="flex flex-col justify-center items-center space-y-6 text-center">
        <div className="p-3 border border-[#ccc] rounded-full">
          <User size={100} color="#ccc" />
        </div>
        <div className="flex flex-col">
          <span className="text-[24px] font-semibold">John Doe</span>
          <span className="text-gray-500 text-[18px] italic">
            john.doe@example.com
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-10 w-[50%] mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-[18px] font-semibold">Earnings</h2>
            <p className="text-[16px]">$1000</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Rank</h2>
            <p className="text-[16px]">Top Talent</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Stats</h2>
            <div className="flex flex-col space-y-1">
              <p>Total Jobs Completed: 10</p>
              <p>Average Rating: 4.8/5</p>
              <p>Feedback Received: 5</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-[18px] font-semibold">User Details</h2>

          <p>Username: Johndoe32</p>
          <p>Phone: +1 (555) 555-5555</p>
          <p>Address: 123 Main St, Anytown, USA</p>
          <p>Member Since: 2022</p>
          <p>Payment Method: Credit Card</p>
          <p>Payment Status: Active</p>
        </div>
      </div>
    </MainContainer>
  );
};

export default Profile;
