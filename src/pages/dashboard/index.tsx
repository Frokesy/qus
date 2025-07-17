import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import Spinner from "../../components/defaults/Spinner";
import { useAuthStore } from "../../stores/useAuthStore";
import { useEffect, useState } from "react";
import TrcNoticeModal from "../../components/modals/TrxNoticeModal";
import { AnimatePresence } from "framer-motion";
import AnnouncementModal from "../../components/modals/AnnouncementModal";
import NewUserBonusModal from "../../components/modals/NewUserBonusModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const [showNewUserModal, setShowNewUserModal] = useState(false);

  // const activities = [
  //   "✅ You completed Task 18 — $2 added to wallet.",
  //   "🎉 You spun the wheel and won $5!",
  //   "🔒 ID verification pending. $100 frozen.",
  //   "🧠 Scored 8/10 in “Tech Quiz” — earned $15.",
  //   "💰 Earned $20 from referrals.",
  //   "💰 Earned $50 from referrals.",
  //   "💰 Earned $100 from referrals.",
  // ];

  const { user, loading } = useAuthStore();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hideModal = () => setShowAnnouncementModal(false);
  const hideModal2 = () => setShowNewUserModal(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("dashboardModalShown");

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowAnnouncementModal(true);
        sessionStorage.setItem("dashboardModalShown", "true");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const existingUsers = JSON.parse(
      localStorage.getItem("knownUsers") || "[]",
    );
    const isNewUser = !existingUsers.includes(user?.user_id);

    if (isNewUser) {
      localStorage.setItem("isNewUser", "true");

      existingUsers.push(user?.user_id);
      localStorage.setItem("knownUsers", JSON.stringify(existingUsers));
      setTimeout(() => {
        setShowNewUserModal(true);
      }, 5000);
    } else {
      localStorage.setItem("knownUsers", JSON.stringify(existingUsers));
    }
  }, []);

  if (loading) return <Spinner />;

  const handleCardClick = (label: string) => {
    if (label === "Transaction Notice") {
      setIsModalOpen(true);
    }
  };

  return (
    <MainContainer>
      <div className="space-y-2 mb-8 text-[#ffffff]">
        <h2 className="lg:text-3xl text-2xl font-bold">
          Welcome back, {user?.username ? user.username : user?.name}!
        </h2>
        <p className="lg:text-lg text-base text-gray-500 italic">
          Let's crush those tasks and earn more!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-12">
        <div className="bg-[#1B1B2F] text-[#fff] shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <span className="text-4xl font-bold text-green-600">
            ${" "}
            {parseFloat(user?.total_earnings as unknown as string) +
              parseFloat(user?.frozen_balance as unknown as string) ||
              0 + parseFloat(user?.special_bonus as unknown as string) ||
              0}
          </span>
        </div>

        <div className="bg-[#1B1B2F] text-[#fff] shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks</h3>
          <div className="flex justify-between text-center text-sm">
            <Stat label="Total" value={30} color="blue" />
            <Stat
              label="Completed"
              value={user?.tasks.length || 0}
              color="green"
            />
            <Stat
              label="Avg. Rating"
              value={user?.tasks.length ? 4.5 : 0}
              color="yellow"
            />
            <Stat label="Feedbacks" value={0} color="cyan" />
          </div>
        </div>

        <div className="bg-[#1B1B2F] text-[#fff] shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Free Spins Today</h3>
          <span className="text-5xl font-bold text-purple-600">
            {user?.free_spins}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          {
            label: "Online Users",
            value: 12071,
            color: "green",
            img: "/assets/undraw-one.svg",
          },
          {
            label: "Task Quality Score",
            value: 87,
            color: "blue",
            img: "/assets/undraw-two.svg",
          },
          {
            label: "Tasks Completed",
            value: 1537,
            color: "indigo",
            img: "/assets/undraw-three.svg",
          },
          {
            label: "Total Earned by Users",
            value: 452200,
            color: "emerald",
            img: "/assets/undraw-four.svg",
            prefix: "$",
          },
          {
            label: "Transaction Notice",
            value: "",
            color: "yellow",
            img: "/assets/undraw-five.svg",
          },
        ].map((stat, i) => {
          const isClickable = stat.label === "Transaction Notice";
          return (
            <div
              key={i}
              onClick={() => isClickable && handleCardClick(stat.label)}
              className={`bg-[#1B1B2F] text-white flex flex-col justify-between shadow-sm border border-gray-100 rounded-xl p-3 sm:p-5 space-y-2 sm:space-y-3 hover:shadow-md transition group ${
                isClickable ? "cursor-pointer hover:bg-[#252542]" : ""
              }`}
            >
              <h4 className="text-xs sm:text-sm font-medium text-gray-100">
                {stat.label}
              </h4>
              {stat.value !== undefined && (
                <p
                  className={`text-xl sm:text-3xl font-bold text-${stat.color}-600`}
                >
                  {stat.prefix || ""}
                  {stat.value}
                </p>
              )}
              <img
                src={stat.img}
                alt={`${stat.label} illustration`}
                className="w-full h-[60px] sm:h-[100px] object-contain rounded-md mb-1 sm:mb-2 group-hover:scale-105 transition-transform"
              />
            </div>
          );
        })}
        <AnimatePresence>
          {isModalOpen && <TrcNoticeModal closeModal={closeModal} />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showAnnouncementModal && <AnnouncementModal closeModal={hideModal} />}
      </AnimatePresence>
      <AnimatePresence>
        {showNewUserModal && <NewUserBonusModal closeModal={hideModal2} />}
      </AnimatePresence>

      <h2 className="lg:text-[20px] text-[#fff] italic font-semibold mb-3">
        Quick Actions
      </h2>
      <div className="flex lg:flex-row flex-col gap-6 pb-30 items-baseline">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full items-baseline">
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
              link: "/settings/edit-profile",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#1B1B2F] text-[#fff] shadow-md rounded-xl p-6 space-y-3"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.description}</p>
              <NavLink to={item.link}>
                <button className="w-[100%] bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  {item.action}
                </button>
              </NavLink>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        {/* <div className="bg-[#1B1B2F] text-[#fff] shadow-md rounded-xl p-6 lg:w-[25%]">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-2 text-sm text-gray-300">
            {activities.map((item, idx) => (
              <p key={idx}>• {item}</p>
            ))}
          </div>
        </div> */}
      </div>
    </MainContainer>
  );
};

export default Dashboard;
