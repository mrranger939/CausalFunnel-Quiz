// app/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { fetchQuizQuestions } from "@/lib/data";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { startQuiz } = useQuiz();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    setError("");

    const questions = await fetchQuizQuestions();

    if (questions.length > 0) {
      startQuiz(email, questions);
    } else {
      setError("Failed to load quiz questions. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-gray-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 border border-gray-700 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-sm"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-gray-500">
            Quiz Challenge
          </h1>
          <p className="text-gray-500">Enter your email address to begin.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 font-semibold text-gray-200 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Start Quiz"}
            </button>
          </div>
          {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
        </form>
      </motion.div>
    </main>
  );
}