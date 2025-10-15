"use client";

import { motion } from "framer-motion";
import { Question } from "@/context/QuizContext";
import Link from "next/link";

interface Props {
  questions: Question[];
  userAnswers: (string | null)[];
}

export default function ReportSummary({ questions, userAnswers }: Props) {
  // Calculate the score
  const score = userAnswers.reduce((acc, answer, index) => {
    return answer === questions[index].correct_answer ? acc + 1 : acc;
  }, 0);

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header and Score */}
      <div className="text-center bg-gray-900/50 border border-gray-700 p-8 rounded-2xl mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-gray-500">
          Quiz Report
        </h1>
        <p className="text-gray-400 mb-6">Here is your performance summary.</p>
        <p className="text-5xl font-bold text-white">{percentage}%</p>
        <p className="text-gray-400 mt-2">
          You answered <span className="text-white font-semibold">{score}</span> out of{" "}
          <span className="text-white font-semibold">{totalQuestions}</span> questions correctly.
        </p>
      </div>

      {/* Questions Breakdown */}
      <div className="space-y-4">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const correctAnswer = question.correct_answer;
          const isCorrect = userAnswer === correctAnswer;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg"
            >
              <p className="font-semibold text-gray-300 mb-4">
                {index + 1}. {question.question}
              </p>
              <div className={`p-3 rounded-md border ${
                  isCorrect
                    ? "bg-green-900/50 border-green-700"
                    : "bg-red-900/50 border-red-700"
                }`}
              >
                <p className="text-sm text-gray-400">Your answer:</p>
                <p>{userAnswer ?? "Not Answered"}</p>
              </div>
              {!isCorrect && (
                <div className="p-3 mt-2 rounded-md border bg-gray-800 border-gray-700">
                  <p className="text-sm text-gray-400">Correct answer:</p>
                  <p>{correctAnswer}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-8">
        <Link href="/" className="px-6 py-3 font-semibold text-gray-200 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            Take Another Quiz
        </Link>
      </div>
    </motion.div>
  );
}