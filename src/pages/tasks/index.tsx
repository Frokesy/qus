import MainContainer from "../../components/containers/MainContainer";
import SpinnerWheel from "../../components/sections/tasks/SpinnerWheel";
import Spinner from "../../components/defaults/Spinner";
import { useAuthStore } from "../../stores/useAuthStore";
import { taskItems } from "../../components/data";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  // const closeModal = () => setIsModalOpen(false);

  const hasCompletedAll =
    user?.daily_tasks && user?.daily_tasks?.length >= taskItems.length;

  const handleStartNewTask = () => {
    if (!taskItems || taskItems.length === 0 || hasCompletedAll) return;

    const uncompletedTasks = taskItems.filter(
      (task) => !user?.tasks.includes(task.id.toString()),
    );

    const randomIndex = Math.floor(Math.random() * uncompletedTasks.length);
    const randomTaskId = uncompletedTasks[randomIndex].id;

    navigate(`/tasks/${randomTaskId}`);
  };

  if (loading) return <Spinner />;

  return (
    <MainContainer>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 h-[80vh] overflow-y-auto pb-20 pt-6 text-white">
        <div className="flex flex-col items-center justify-start w-full max-w-xl mx-auto bg-[#121828] rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-white">Task Overview</h2>

          <>
            <img
              src="/assets/start-task.png"
              alt="Start Task"
              className="h-60 object-contain"
            />

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#1F2A40] p-4 rounded-lg text-center shadow-sm">
                <h3 className="text-sm text-gray-400 font-medium">
                  Wallet Balance
                </h3>
                <p className="text-lg font-semibold text-green-400">
                  $
                  {parseFloat(user?.total_earnings || "0") +
                    parseFloat(user?.frozen_balance || "0")}
                </p>
              </div>
              <div className="bg-[#1F2A40] p-4 rounded-lg text-center shadow-sm">
                <h3 className="text-sm text-gray-400 font-medium">
                  Today's Reward
                </h3>
                <p className="text-lg font-semibold text-yellow-400">
                  ${user?.todays_earnings}
                </p>
              </div>
              <div className="bg-[#1F2A40] p-4 rounded-lg text-center shadow-sm">
                <h3 className="text-sm text-gray-400 font-medium">
                  Available Tasks
                </h3>
                <p className="text-lg font-semibold">{taskItems.length}</p>
              </div>
              <div className="bg-[#1F2A40] p-4 rounded-lg text-center shadow-sm">
                <h3 className="text-sm text-gray-400 font-medium">
                  Tasks Completed
                </h3>
                <p className="text-lg font-semibold text-blue-400">
                  {user?.daily_tasks?.length || 0}
                </p>
              </div>
            </div>

            {hasCompletedAll ? (
              <div className="w-full mt-6 bg-green-700 text-white text-center font-semibold py-3 rounded-lg shadow text-lg">
                🎉 All tasks completed!
              </div>
            ) : (
              <button
                onClick={handleStartNewTask}
                className="w-full cursor-pointer mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-white font-semibold py-3 rounded-lg shadow-lg text-lg"
              >
                🚀 Start New Task
              </button>
            )}
          </>
        </div>

        <div className="flex flex-col justify-center items-center bg-[#121828] rounded-xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Use Your Free Daily Spin
          </h2>
          <SpinnerWheel />
        </div>
      </div>

      {/* <AnimatePresence>
        {isModalOpen && <TaskDescriptionModal closeModal={closeModal} />}
      </AnimatePresence> */}
    </MainContainer>
  );
};

export default Tasks;
