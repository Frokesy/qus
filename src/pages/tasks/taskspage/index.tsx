import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../components/containers/MainContainer";
import { taskItems } from "../../../components/data";
import { useAuthStore } from "../../../stores/useAuthStore";
import { supabase } from "../../../utils/supabaseClient";
import { useState } from "react";
import SelfClosingModal from "../../../components/modals/SelfclosingModal";
import { Star } from "lucide-react";

const TaskPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const task = taskItems.find((item) => item.task_id === id);

  const handleCompleteTask = async (taskId: string, reward: number) => {
    const { user, fetchSession } = useAuthStore.getState();
    if (!user) return;

    const hasAlreadyCompleted =
      Array.isArray(user.tasks) && user.tasks.includes(taskId);
    if (hasAlreadyCompleted) {
      setModalMessage(
        "⚠️ You've already completed this task. Please select a new one.",
      );
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setIsReadyToSubmit(false);
        navigate("/tasks");
      }, 2500);
      return;
    }

    setLoading(true);

    const frozen = reward > 10 ? parseFloat((reward * 0.6).toFixed(2)) : 0;
    const immediateReward = reward - frozen;

    const updatedTotal = (
      parseFloat(user.total_earnings || "0") + immediateReward
    ).toFixed(2);

    const updatedFrozen = (
      parseFloat(user.frozen_balance || "0") + frozen
    ).toFixed(2);

    const updatedToday = (
      parseFloat(user.todays_earnings || "0") + reward
    ).toFixed(2);

    const updatedTasks = Array.isArray(user.tasks)
      ? [...new Set([...user.tasks, taskId])]
      : [taskId];

    const updatedDailyTasks = Array.isArray(user.tasks)
      ? [...new Set([...user.tasks, taskId])]
      : [taskId];

    const { error } = await supabase
      .from("users")
      .update({
        total_earnings: updatedTotal,
        frozen_balance: updatedFrozen,
        todays_earnings: updatedToday,
        tasks: updatedTasks,
        daily_tasks: updatedDailyTasks,
      })
      .eq("user_id", user.user_id);

    if (error) {
      console.error("❌ Failed to update user:", error.message);
      setLoading(false);
      return;
    }

    await fetchSession();

    setTimeout(() => {
      setModalMessage("🎉 Task completed! Your reward has been added.");
      setShowModal(true);
      setLoading(false);

      setTimeout(() => {
        setShowModal(false);
        navigate("/tasks");
      }, 2500);
    }, 1000);
  };

  if (!task) {
    return (
      <MainContainer>
        <div className="h-[80vh] flex items-center justify-center text-center text-white">
          <div>
            <h2 className="text-2xl font-bold mb-4">Task not found</h2>
            <p className="text-gray-400">
              Please try again or pick another task.
            </p>
          </div>
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className="max-w-3xl h-[80vh] overflow-y-auto mx-auto lg:py-10 space-y-6 text-white">
        <img
          src="/assets/start-task.png"
          alt="Start Task"
          className="h-60 w-[100%] object-contain"
        />

        <h2 className="text-2xl font-bold">{task.title}</h2>

        <p className="text-sm text-yellow-400 font-medium">
          🎁 Reward: <span className="font-bold">${task.reward}</span>
        </p>

        <p className="text-gray-400">{task.desc}</p>
        <div className="flex items-center space-x-3">
          <p className="text-gray-100">Review:</p>
          <div className="flex items-center">
            <Star fill="blue" stroke="none" size={20} />
            <Star fill="blue" stroke="none" size={20} />
            <Star fill="blue" stroke="none" size={20} />
            <Star fill="blue" stroke="none" size={20} />
            <Star fill="blue" stroke="none" size={20} />
          </div>
        </div>

        <button
          onClick={() => {
            if (isReadyToSubmit) {
              handleCompleteTask(task.id.toString(), task.reward);
            } else {
              setIsReadyToSubmit(true);
            }
          }}
          disabled={loading}
          className={`bg-green-600 text-white px-6 w-full flex items-center justify-center py-3 rounded-md font-medium hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : isReadyToSubmit ? (
            "✅ Complete Task"
          ) : (
            "🚀 Submit Task"
          )}
        </button>
      </div>
      <SelfClosingModal
        message={modalMessage}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </MainContainer>
  );
};

export default TaskPage;
