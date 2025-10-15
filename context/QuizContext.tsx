"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface Question {
  question: string;
  correct_answer: string;
  choices: string[];
}

// REMOVED isQuizFinished from here
interface QuizContextType {
  email: string;
  questions: Question[];
  userAnswers: (string | null)[];
  currentQuestionIndex: number;
  visitedQuestions: boolean[];
  isQuizStarted: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startQuiz: (email: string, questions: Question[]) => void;
  selectAnswer: (questionIndex: number, answer: string) => void;
  goToQuestion: (questionIndex: number) => void;
  submitQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [visitedQuestions, setVisitedQuestions] = useState<boolean[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // REMOVED isQuizFinished state

  const startQuiz = (userEmail: string, fetchedQuestions: Question[]) => {
    // NEW: Clear any previous report to allow a new quiz
    sessionStorage.removeItem('quizReport');

    setEmail(userEmail);
    setQuestions(fetchedQuestions);
    setUserAnswers(Array(fetchedQuestions.length).fill(null));
    const initialVisited = Array(fetchedQuestions.length).fill(false);
    initialVisited[0] = true;
    setVisitedQuestions(initialVisited);
    setCurrentQuestionIndex(0);
    setIsQuizStarted(true);
    router.push('/quiz');
  };

  const selectAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const goToQuestion = (questionIndex: number) => {
    const newVisited = [...visitedQuestions];
    newVisited[questionIndex] = true;
    setVisitedQuestions(newVisited);
    setCurrentQuestionIndex(questionIndex);
  };

  const submitQuiz = () => {
    const reportData = { questions, userAnswers };
    sessionStorage.setItem('quizReport', JSON.stringify(reportData));
    // REMOVED setIsQuizFinished(true)
    router.push('/report');
  };

  const value = {
    email,
    questions,
    userAnswers,
    currentQuestionIndex,
    visitedQuestions,
    isQuizStarted,
    isModalOpen,
    setIsModalOpen,
    startQuiz,
    selectAnswer,
    goToQuestion,
    submitQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};