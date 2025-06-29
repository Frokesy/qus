import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";
import MainContainer from "../../../components/containers/MainContainer";
import Spinner from "../../../components/defaults/Spinner";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useAuthStore } from "../../../stores/useAuthStore";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const QuizPage = () => {
  const { task_id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const { width, height } = useWindowSize();
  const { user, fetchSession } = useAuthStore();

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
        setTitle(data?.title || "");
        if (Array.isArray(data?.todo)) {
          setQuestions(data.todo);
          setAnswers(new Array(data.todo.length).fill(null));
        }
      }

      setLoading(false);
    };

    fetchQuiz();
  }, [task_id]);

  const handleAnswerSelect = (questionIndex: number, selected: string) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selected;
    setAnswers(newAnswers);
  };

  const playSound = () => {
    const audio = new Audio("/sounds/win.wav");
    audio.play().catch((err) => console.error("Sound failed:", err));
  };

  const handleSubmit = async () => {
    let correct = 0;
    answers.forEach((ans, i) => {
      if (ans === questions[i].answer) correct++;
    });

    const earned = parseFloat((correct * 0.3).toFixed(2));
    setCorrectCount(correct);
    setSubmitted(true);

    if (correct > 0) playSound();

    if (user && earned > 0) {
      const updatedTotal = (
        parseFloat(user.total_earnings || "0") + earned
      ).toFixed(2);

      const updatedTasks = Array.isArray(user.tasks)
        ? [...new Set([...user.tasks, task_id])]
        : [task_id];

      const { error } = await supabase
        .from("users")
        .update({
          total_earnings: updatedTotal,
          tasks: updatedTasks,
        })
        .eq("user_id", user.user_id);

      if (!error) {
        await fetchSession();
      } else {
        console.error("Error updating user data:", error.message);
      }
    }
  };

  return (
    <MainContainer>
      {submitted && correctCount > 0 && (
        <Confetti width={width} height={height} />
      )}

      <div className="max-w-3xl h-[80vh] overflow-y-auto mx-auto lg:py-10 space-y-6 pb-30">
        <h2 className="text-2xl font-bold">
          {loading
            ? "Loading..."
            : showReview
              ? "Review Your Answers"
              : submitted
                ? "Quiz Results"
                : title}
        </h2>

        {loading ? (
          <Spinner />
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500">No quiz available.</p>
        ) : submitted && !showReview ? (
          <div className="text-center space-y-4">
            <p className="text-xl font-semibold">
              ✅ You got {correctCount} out of {questions.length} correct!
            </p>
            <p className="text-lg text-green-700 font-bold">
              🎉 You earned ${(correctCount * 0.3).toFixed(2)}
            </p>
            <button
              onClick={() => setShowReview(true)}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Check Answers
            </button>
          </div>
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
                {q.options.map((opt, j) => {
                  const isCorrect = opt === q.answer;
                  const isSelected = answers[i] === opt;
                  const highlight =
                    showReview && isCorrect
                      ? "bg-green-100 border-green-500"
                      : isSelected && submitted
                        ? "bg-red-200 text-red-500 border-red-400"
                        : "";

                  return (
                    <button
                      key={j}
                      onClick={() => handleAnswerSelect(i, opt)}
                      className={`px-4 py-2 text-sm rounded-md border transition ${
                        isSelected
                          ? "bg-blue-600 text-[#000]"
                          : "bg-gray-100 hover:bg-blue-600 hover:text-white"
                      } ${highlight}`}
                      disabled={showReview || submitted}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {!loading && questions.length > 0 && !submitted && !showReview && (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition"
            >
              Submit Answers
            </button>
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default QuizPage;
