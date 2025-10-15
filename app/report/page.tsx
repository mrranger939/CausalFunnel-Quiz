"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/context/QuizContext';
import ReportSummary from '@/components/ReportSummary'; // We will create this next

// Define the structure for the report data
interface ReportData {
  questions: Question[];
  userAnswers: (string | null)[];
}

export default function ReportPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the stored data from sessionStorage
    const storedReport = sessionStorage.getItem('quizReport');

    if (storedReport) {
      setReportData(JSON.parse(storedReport));
    } else {
      // If no report data is found, redirect to the homepage
      router.push('/');
    }
  }, [router]);

  // Display a loading message until the data is ready
  if (!reportData) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-gray-300">
        <p>Loading report...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ReportSummary
          questions={reportData.questions}
          userAnswers={reportData.userAnswers}
        />
      </div>
    </main>
  );
}