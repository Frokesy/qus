import MainContainer from "../../components/containers/MainContainer";

const Dashboard = () => {
  const activities = [
    "✅ You completed Task 18 — ₦200 added to wallet.",
    "🎉 You spun the wheel and won ₦500!",
    "🔒 ID verification pending. ₦1,000 frozen.",
    "🧠 Scored 8/10 in “Tech Quiz” — earned ₦150.",
    "💰 Earned ₦200 from referrals.",
    "💰 Earned ₦500 from referrals.",
    "💰 Earned ₦1,000 from referrals.",
  ];
  return (
    <MainContainer>
      <h2 className="lg:text-[30px] text-[20px] font-semibold">
        Welcome back, John Doe!
      </h2>
      <p className="lg:text-[20px] text-[#808080] italic">
        You're $2,350 away from your next payout.
      </p>

      {/* Summary */}
      <div className="flex lg:flex-row flex-col justify-between lg:space-y-0 space-y-6 lg:space-x-10 mt-10">
        <div className="lg:w-[25%] bg-[#fff] rounded-2xl p-6">
          <h2 className="text-[20px] pb-4 font-semibold">Total Earnings</h2>
          <span className="lg:text-[40px] text-[32px] font-semibold">
            $10,000.00
          </span>
        </div>
        <div className="lg:w-[25%] bg-[#fff] rounded-2xl p-6">
          <h2 className="text-[20px] font-semibold">Quizzes</h2>
          <div className="flex justify-between space-x-3 mt-4">
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-blue-600 font-semibold">
                10
              </span>
              <span className="text-[#808080] text-[14px]">Total</span>
            </div>
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-green-600 font-semibold">
                5
              </span>
              <span className="text-[#808080] text-[14px]">Completed</span>
            </div>
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-yellow-600 font-semibold">
                5
              </span>
              <span className="text-[#808080] text-[14px]">Pending</span>
            </div>
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-red-600 font-semibold">0</span>
              <span className="text-[#808080] text-[14px]">Failed</span>
            </div>
          </div>
        </div>

        <div className="lg:w-[25%] bg-[#fff] rounded-2xl p-6">
          <h2 className="text-[20px] font-semibold">Tasks</h2>

          <div className="flex justify-between space-x-3 mt-4">
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-blue-600 font-semibold">
                10
              </span>
              <span className="text-[#808080] text-[14px]">Total</span>
            </div>
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-green-600 font-semibold">
                5
              </span>
              <span className="text-[#808080] text-[14px]">Completed</span>
            </div>
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-yellow-600 font-semibold">
                5
              </span>
              <span className="text-[#808080] text-[14px]">Pending</span>
            </div>
            <div className="flex flex-col text-center space-y-1">
              <span className="text-[20px] text-red-600 font-semibold">0</span>
              <span className="text-[#808080] text-[14px]">Failed</span>
            </div>
          </div>
        </div>

        <div className="lg:w-[25%] bg-[#fff] rounded-2xl p-6">
          <h2 className="text-[20px] font-semibold">Free Spins Today</h2>
          <span className="lg:text-[56px] text-[32px] font-semibold">1</span>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between items-baseline space-x-4">
        {/* CTA */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 w-[100%] lg:w-[70%] mt-10">
          <div className="bg-[#fff] rounded-2xl space-y-3 p-4">
            <h2 className="text-[20px]">Continue Quiz</h2>
            <p>You left off at question 5 of 10</p>
            <button className="bg-blue-500 text-white w-[100%] font-semibold px-4 py-2 rounded-md">
              Resume Quiz
            </button>
          </div>

          <div className="bg-[#fff] rounded-2xl space-y-3 p-4">
            <h2 className="text-[20px]">New Task Available</h2>
            <p>Take a photo of a public place</p>
            <button className="bg-blue-500 text-white w-[100%] font-semibold px-4 py-2 rounded-md">
              Start Task
            </button>
          </div>
          <div className="bg-[#fff] rounded-2xl space-y-3 p-4">
            <h2 className="text-[20px]">Daily Spin</h2>
            <p>You've not spun today!</p>
            <button className="bg-blue-500 text-white w-[100%] font-semibold px-4 py-2 rounded-md">
              Spin now
            </button>
          </div>
        </div>
        <div className="border border-[#ccc] mt-10 lg:w-[25%] mb-20 lg:mb-0 rounded-2xl space-y-3 p-4">
          <h2 className="text-[20px] font-semibold">Recent Activities</h2>

          <div className="flex flex-col space-y-3">
            {activities.map((item, idx) => (
              <p key={idx} className="text-sm">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Dashboard;
