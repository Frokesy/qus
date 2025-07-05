import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import MainContainer from "../../components/containers/MainContainer";
import SpinnerWheel from "../../components/sections/tasks/SpinnerWheel";
import Spinner from "../../components/defaults/Spinner";
import { AnimatePresence } from "framer-motion";
import TaskDescriptionModal from "../../components/modals/TaskDescriptionModa";

type TaskItem = {
  id: string;
  task_id: string;
  title: string;
  desc: string;
  icon: string;
  cta: string;
  link: string;
  bg: string;
};

const Tasks = () => {
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      console.log(data);

      if (error) {
        console.error("Failed to fetch tasks:", error.message);
      } else {
        setTaskItems(data as TaskItem[]);
      }

      setLoading(false);
    };

    fetchTasks();
  }, []);

  return (
    <MainContainer>
      <div className="flex justify-between lg:flex-row flex-col-reverse space-x-10 h-[80vh] overflow-x-hidden pb-20 lg:pb-0 pt-4 lg:pt-0">
        <div className="space-y-4 w-full max-w-5xl">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] text-[#fff] font-semibold">
              Available Tasks
            </h2>
            <span className="text-blue-500 cursor-pointer hover:underline">
              See all
            </span>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {taskItems.map((item) => (
                <div
                  key={item.id}
                  className={`${item.bg} p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300`}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  <NavLink
                    to={`/quiz/${item.task_id}`}
                    className="mt-4 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold text-sm"
                  >
                    {item.cta}
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spinner wheel */}
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-[20px] text-[#fff] font-semibold">
            Use your free spin for today
          </h2>
          <SpinnerWheel />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && <TaskDescriptionModal closeModal={closeModal} />}
      </AnimatePresence>
    </MainContainer>
  );
};

export default Tasks;
