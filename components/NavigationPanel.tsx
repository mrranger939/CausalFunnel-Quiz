"use client";

import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";

export default function NavigationPanel() {
  const {
    questions,
    userAnswers,
    visitedQuestions,
    currentQuestionIndex,
    goToQuestion,
  } = useQuiz();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl"
    >
      <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center">
        Question Navigator
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, index) => {
          const isCurrent = currentQuestionIndex === index;
          const isAnswered = userAnswers[index] !== null;
          const isVisited = visitedQuestions[index];

          let buttonClass = "bg-gray-800 border-gray-700 hover:bg-gray-700"; // Default (unvisited)

          if (isVisited) {
            buttonClass = "bg-gray-700/50 border-gray-600 hover:bg-gray-700"; // Visited
          }
          if (isAnswered) {
            buttonClass = "bg-green-800/60 border-green-700 hover:bg-green-700"; // Answered
          }
          if (isCurrent) {
            buttonClass = "border-gray-300 ring-2 ring-gray-300"; // Current
          }

          return (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`
                w-full h-10 rounded-md text-sm font-semibold transition-colors duration-200 border
                ${buttonClass}
              `}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}