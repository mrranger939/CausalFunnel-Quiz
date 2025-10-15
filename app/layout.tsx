// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext"; // Import our provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CausalFunnel Quiz",
  description: "A quiz application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        {/* Wrap the children with QuizProvider */}
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}