"use client";

import { useState, useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const { submitQuiz } = useQuiz();

  useEffect(() => {
    // Exit early if there's no time left
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component unmounts or timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft, submitQuiz]);

  // Format the time into MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center">
      <p className="text-lg font-mono tracking-widest">
        Time Left:
        {/* Add a red color warning when time is low */}
        <span className={`ml-2 ${timeLeft <= 60 ? 'text-red-500' : 'text-gray-300'}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </p>
    </div>
  );
}