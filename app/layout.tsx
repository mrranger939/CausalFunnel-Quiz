
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext"; 

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
        {/* providing the context */}
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}