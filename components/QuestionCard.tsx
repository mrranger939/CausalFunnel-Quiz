"use client";

import { motion } from "framer-motion";
import { useQuiz, Question } from "@/context/QuizContext";

// Define the props the component will receive
interface Props {
  question: Question;
  questionIndex: number;
}

export default function QuestionCard({ question, questionIndex }: Props) {
  const { userAnswers, selectAnswer } = useQuiz();
  const selectedAnswer = userAnswers[questionIndex];

  return (
    <motion.div
      // Animate the card fading in
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 border border-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg"
    >
      {/* Question Text */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-6">
        <span className="text-gray-500 mr-2">{questionIndex + 1}.</span>
        {question.question}
      </h2>

      {/* Answer Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.choices.map((choice) => {
          const isSelected = selectedAnswer === choice;

          return (
            <button
              key={choice}
              onClick={() => selectAnswer(questionIndex, choice)}
              className={`
                w-full p-4 rounded-lg text-left transition-colors duration-300
                border
                ${
                  isSelected
                    ? "bg-gray-600 border-gray-400 ring-2 ring-gray-400"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }
              `}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}