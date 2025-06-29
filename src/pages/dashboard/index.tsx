import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import Spinner from "../../components/defaults/Spinner";
import { useAuthStore } from "../../stores/useAuthStore";
const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="space-y-1">
    <span className={`text-lg font-semibold text-${color}-600`}>{value}</span>
    <p className="text-gray-500">{label}</p>
  </div>
);

const Dashboard = () => {
  const activities = [
    "✅ You completed Task 18 — $2 added to wallet.",
    "🎉 You spun the wheel and won $5!",
    "🔒 ID verification pending. $100 frozen.",
    "🧠 Scored 8/10 in “Tech Quiz” — earned $15.",
    "💰 Earned $20 from referrals.",
    "💰 Earned $50 from referrals.",
    "💰 Earned $100 from referrals.",
  ];

  const { user, loading } = useAuthStore();

  if (loading) return <Spinner />;

  return (
    <MainContainer>
      <div className="space-y-2 mb-8">
        <h2 className="lg:text-3xl text-2xl font-bold">
          Welcome back, {user?.username ? user.username : user?.name}!
        </h2>
        <p className="lg:text-lg text-base text-gray-500 italic">
          Let's crush those tasks and earn more!
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <span className="text-4xl font-bold text-green-600">
            ${user?.total_earnings || 0}
          </span>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks</h3>
          <div className="flex justify-between text-center text-sm">
            <Stat label="Total" value={10} color="blue" />
            <Stat label="Completed" value={5} color="green" />
            <Stat label="Avg. Rating" value={4.5} color="yellow" />
            <Stat label="Feedbacks" value={0} color="cyan" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Free Spins Today</h3>
          <span className="text-5xl font-bold text-purple-600">
            {user?.free_spins}
          </span>
        </div>
      </div>

      {/* CTA & Recent Activity */}
      <h2 className="lg:text-[20px] italic font-semibold mb-3">
        Quick Actions
      </h2>
      <div className="flex lg:flex-row flex-col gap-6 pb-30">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 w-full items-baseline">
          {[
            {
              title: "Wallet Summary",
              description: `$${user?.total_earnings || 0} available. Next payout: Friday`,
              action: "View Wallet",
              link: "/wallet",
            },
            {
              title: "Continue Tasks",
              description:
                "Get back to crushing those tasks! Start a new task or continue an existing one.",
              action: "Start Task",
              link: "/tasks",
            },
            {
              title: "Daily Spin",
              description: "You've not spun today!",
              action: "Spin now",
              link: "/tasks",
            },
            {
              title: "Update Profile",
              description: "Update your profile information",
              action: "Update now",
              link: "/profile",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 space-y-3"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <NavLink to={item.link}>
                <button className="w-[100%] bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  {item.action}
                </button>
              </NavLink>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-xl p-6 lg:w-[25%]">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {activities.map((item, idx) => (
              <p key={idx}>• {item}</p>
            ))}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Dashboard;
