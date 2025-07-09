import { useParams } from "react-router-dom";
import MainContainer from "../../../components/containers/MainContainer";
import { taskItems } from "../../../components/data";

const TaskPage = () => {
  const { id } = useParams();
  const task = taskItems.find((item) => item.task_id === id);

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

  const isUploadTask = task.category === "upload";

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

        {isUploadTask ? (
          <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="mb-4 text-sm text-white"
            />
            <button className="bg-blue-600 w-[100%] text-center text-white px-5 py-2 rounded-md hover:bg-blue-700">
              Upload Evidence
            </button>
          </div>
        ) : (
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-center w-[100%] hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-medium"
          >
            🔗 {task.cta}
          </a>
        )}

        <button className="bg-green-600 text-white px-6 w-[100%] py-3 rounded-md font-medium hover:bg-green-700 transition">
          ✅ Complete Task
        </button>
      </div>
    </MainContainer>
  );
};

export default TaskPage;
