"use client";

import { useQuiz } from "@/context/QuizContext";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import NavigationPanel from "./NavigationPanel";
import ConfirmationModal from "./ConfirmationModal"; 

export default function QuizClient() {
  const {
    questions,
    userAnswers,
    currentQuestionIndex,
    isModalOpen,
    setIsModalOpen,
    goToQuestion,
    submitQuiz
  } = useQuiz();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Calculate stats for the modal
  const attemptedCount = userAnswers.filter(answer => answer !== null).length;
  const unattemptedCount = questions.length - attemptedCount;

  const handleConfirmSubmit = () => {
    setIsModalOpen(false); // Close the modal
    submitQuiz(); // Call the actual submit function
  };

  return (
    // Use a fragment to render the modal as a sibling to the layout
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        attempted={attemptedCount}
        unattempted={unattemptedCount}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Main Column: Question Card and Navigation Buttons */}
        <div className="lg:col-span-2 space-y-8">
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
          />
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className="px-6 py-3 font-semibold text-gray-200 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isLastQuestion}
              className="px-6 py-3 font-semibold text-gray-200 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right/Sidebar Column: Timer, Navigator, and Submit Button */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-2xl text-center">
            <Timer />
          </div>
          <NavigationPanel />
          <div>
            <button
              onClick={() => setIsModalOpen(true)} // This now opens the modal
              className="w-full py-3 font-semibold text-white bg-green-700/80 border border-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
}