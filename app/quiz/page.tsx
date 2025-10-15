"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import QuizClient from '@/components/QuizClient';

export default function QuizPage() {
  const { isQuizStarted } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    // Check if a report already exists in storage
    const finishedQuiz = sessionStorage.getItem('quizReport');

    // Redirect if quiz hasn't started OR if it's already finished
    if (!isQuizStarted || finishedQuiz) {
      router.push('/');
    }
  }, [isQuizStarted, router]);

  // We also check here to prevent rendering before redirect
  if (!isQuizStarted || sessionStorage.getItem('quizReport')) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <QuizClient />
      </div>
    </main>
  );
}