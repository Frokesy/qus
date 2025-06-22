import MainContainer from "../../../components/containers/MainContainer";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const sampleQuiz: Question[] = [
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "120°C"],
    answer: "100°C",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Mars",
  },
];

const QuizPage = () => {
  return (
    <MainContainer>
      <div className="max-w-3xl mx-auto py-10 space-y-6">
        <h2 className="text-2xl font-bold">Science & Nature Quiz</h2>

        {sampleQuiz.map((q, i) => (
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
        ))}

        <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition">
          Submit Answers
        </button>
      </div>
    </MainContainer>
  );
};

export default QuizPage;
