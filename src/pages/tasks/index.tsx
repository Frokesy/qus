import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import SpinnerWheel from "../../components/sections/tasks/SpinnerWheel";

const Tasks = () => {
  const taskItems = [
    {
      title: "Science & Nature Quiz",
      desc: "Test your knowledge of the natural world.",
      bg: "bg-green-50",
      cta: "Take Quiz",
      icon: "🧪",
    },
    {
      title: "Photo Hunt",
      desc: "Take a photo of a nearby market.",
      bg: "bg-orange-50",
      cta: "Start Task",
      icon: "📷",
      link: "/taskspage",
    },
    {
      title: "Tech & Innovation Quiz",
      desc: "Identify modern breakthroughs in tech.",
      bg: "bg-indigo-50",
      cta: "Take Quiz",
      icon: "💻",
    },
    {
      title: "Transcribe Handwritten Note",
      desc: "Type out content from an uploaded image.",
      bg: "bg-yellow-50",
      cta: "Start Task",
      icon: "⌨️",
      link: "/taskspage",
    },
    {
      title: "Geography Quiz",
      desc: "Answer questions on world landmarks.",
      bg: "bg-blue-50",
      cta: "Take Quiz",
      icon: "🌍",
    },
    {
      title: "Spin Challenge",
      desc: "Get lucky and win up to $50.",
      bg: "bg-pink-50",
      cta: "Spin Now",
      icon: "🎯",
    },
    {
      title: "Local Language Quiz",
      desc: "Translate these common Yoruba phrases.",
      bg: "bg-purple-50",
      cta: "Take Quiz",
      icon: "🗣️",
    },
    {
      title: "Short Video Task",
      desc: "Record a short 10-sec video about your workspace.",
      bg: "bg-rose-50",
      cta: "Start Task",
      icon: "🎥",
      link: "/taskspage",
    },
    {
      title: "Math & Logic Quiz",
      desc: "Solve logic problems to earn points.",
      bg: "bg-cyan-50",
      cta: "Take Quiz",
      icon: "🧠",
    },
    {
      title: "Feedback Survey",
      desc: "Fill a quick form to share your opinion.",
      bg: "bg-lime-50",
      cta: "Start Task",
      icon: "📝",
      link: "/taskspage",
    },
    {
      title: "Landmark Photo Quest",
      desc: "Snap a picture of a major local landmark.",
      bg: "bg-amber-50",
      cta: "Start Task",
      icon: "🏛️",
      link: "/taskspage",
    },
    {
      title: "Spin & Win Bonus Round",
      desc: "Bonus spin unlocked — try your luck!",
      bg: "bg-red-50",
      cta: "Spin Now",
      icon: "🎰",
    },
  ];

  return (
    <MainContainer>
      <div className="flex justify-between lg:flex-row flex-col-reverse space-x-10 h-[85vh] overflow-y-auto">
        <div className="space-y-4 w-full max-w-5xl">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] font-semibold">Available Tasks</h2>
            <span className="text-blue-500 cursor-pointer hover:underline">
              See all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {taskItems.map((item, idx) => (
              <div
                key={idx}
                className={`${item.bg} p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300`}
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                <NavLink
                  to={item.link}
                  className="mt-4 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold text-sm"
                >
                  {item.cta}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Spinner wheel */}
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-[20px] font-semibold">
            Use your free spin for today
          </h2>
          <SpinnerWheel />
        </div>
      </div>
    </MainContainer>
  );
};

export default Tasks;
