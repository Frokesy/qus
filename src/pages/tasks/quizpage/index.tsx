import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";
import MainContainer from "../../../components/containers/MainContainer";
import Spinner from "../../../components/defaults/Spinner";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const QuizPage = () => {
  const { task_id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!task_id) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("tasks")
        .select("title, todo")
        .eq("task_id", task_id)
        .single();

      if (error) {
        console.error("Failed to fetch quiz:", error.message);
      } else {
        const todo = data?.todo;
        setTitle(data?.title || "");

        if (Array.isArray(todo)) {
          setQuestions(todo as Question[]);
        } else {
          console.warn("Invalid quiz data format:", todo);
        }
      }

      setLoading(false);
    };

    fetchQuiz();
  }, [task_id]);
  return (
    <MainContainer>
      <div className="max-w-3xl h-[80vh] overflow-y-auto mx-auto lg:py-10 space-y-6">
        <h2 className="text-2xl font-bold">
          {loading ? "Loading..." : title || "Quiz"}
        </h2>

        {loading ? (
          <Spinner />
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500">No quiz available.</p>
        ) : (
          questions.map((q, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold mb-2">
                {i + 1}. {q.question}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, j) => (
                  <button
                    key={j}
                    className="px-4 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-sm rounded-md border transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}

        {!loading && questions.length > 0 && (
          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition">
              Submit Answers
            </button>
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default QuizPage;
