

# CausalFunnel Quiz Application

This is a simple, modern, and fully responsive quiz application built as part of the hiring process for the Software Engineer Intern position at CausalFunnel. The application fetches questions from an external API and provides an interactive quiz experience with a timer, question navigation, and a detailed final report.

**Live Demo:** `https://causal-funnel-quiz-xi.vercel.app/`

-----

## Key Features

  * **Email Submission**: A sleek, animated start page to collect the user's email.
  * **Timed Quiz**: A 30-minute countdown timer that automatically submits the quiz when the time runs out. 
  * **15 Questions**: Fetches 15 multiple-choice questions from the Open Trivia Database API. 
  * **Question Navigation Panel**: An interactive panel that shows all question numbers. It visually indicates:
      * Which questions have been visited. 
      * Which questions have been attempted. 
      * Allows users to jump to any specific question. 
  * **Detailed Report**: After submission, a report page displays each question, the user's answer, and the correct answer side-by-side for easy comparison. 
  * **Modern & Responsive Design**: A dark-themed, mobile-first design that looks great on all devices, from phones to desktops. 
  * **Smooth Animations**: Polished animations using Framer Motion for a better user experience when navigating between questions or loading pages. 

-----

## Tech Stack

  * **Framework**: Next.js (with App Router)
  * **Language**: TypeScript
  * **Styling**: Tailwind CSS
  * **Animations**: Framer Motion
  * **Deployment**: Vercel / Netlify

-----

## Project Structure

The project follows a feature-oriented structure, keeping related logic, components, and pages organized.

```
causal-funnel-quiz/
├── app/                      # Next.js App Router for routing
│   ├── page.tsx              # Start Page (Email Submission)
│   ├── quiz/page.tsx         # Main Quiz Page Layout
│   └── report/page.tsx       # Final Report Page
│   └── layout.tsx            # Root Layout (with Context Provider)
│   └── globals.css           # Global Tailwind CSS styles
│
├── components/               # Reusable React UI components
│   ├── QuizClient.tsx        # Main component assembling the quiz interface
│   ├── QuestionCard.tsx      # Displays a single question and its choices
│   ├── Timer.tsx             # Countdown timer logic and UI
│   ├── NavigationPanel.tsx   # Panel for question navigation
│   ├── ReportSummary.tsx     # Displays the final score and results
│   └── ConfirmationModal.tsx # Modal for confirming quiz submission
│
├── context/                  # Global state management
│   └── QuizContext.tsx       # React Context for all shared quiz state
│
├── lib/                      # Utility and data-fetching functions
│   └── data.ts               # Fetches and processes questions from the API
│
├── public/                   # Static assets
│
└── README.md                 # This file
```

### File Responsibilities

  * **`app/`**: Handles all the routing for the application. Each folder inside represents a URL segment.
  * **`components/`**: Contains all the "building blocks" of the UI. Each component has a single responsibility, making the code clean and reusable.
  * **`context/QuizContext.tsx`**: The "brain" of the application. It holds all the global state like the user's answers, current question, and timer status, making it accessible to any component without prop drilling.
  * **`lib/data.ts`**: Responsible for all communication with the external API. It fetches the questions, shuffles the answers, and decodes any special characters.

-----

## Methodology & Approach

My approach was to build a robust, scalable, and maintainable application by leveraging modern web development practices.

1.  **Centralized State Management**: Instead of passing props down through many layers of components (prop drilling), I used **React's Context API**. `QuizContext.tsx` provides a single source of truth for the entire application state. This makes managing data like user answers, current question index, and quiz status much cleaner and less error-prone.

2.  **Component-Based Architecture**: The UI is broken down into small, reusable components. For example, `Timer.tsx` only handles the countdown logic, and `QuestionCard.tsx` only handles displaying a question. This separation of concerns makes the code easier to read, test, and debug.

3.  **Robust Route Protection**: To ensure a smooth and logical user flow, the application's routes are protected.

      * The `/quiz` page is inaccessible unless a quiz has been started via the homepage.
      * After submission, the `/quiz` page becomes inaccessible again to prevent re-taking a completed test.
      * This was achieved using `useEffect` hooks on the pages, which check the application state and `sessionStorage` to authorize access or redirect the user.

4.  **Data Handling & Sanitization**: The API data is fetched and processed in a dedicated `lib/data.ts` file. This includes a crucial step to decode HTML entities (like `&quot;`) into readable characters (`"`) to ensure questions and answers are displayed correctly.

-----

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mrranger939/CausalFunnel-Quiz.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd CausalFunnel-Quiz
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application.

-----

## Challenges Faced and Solutions

  * **Challenge**: The API returned questions and answers with HTML entity codes (e.g., `&quot;`, `&#039;`), which rendered incorrectly on the page.

      * **Solution**: I created a helper function `decodeHtmlEntities` in `lib/data.ts` that uses the browser's built-in parser to convert these codes into their actual characters. This function was applied to all incoming text from the API, ensuring clean data throughout the app.

  * **Challenge**: After submitting the quiz, a tricky race condition caused the app to redirect to the homepage (`/`) instead of the report page (`/report`).

      * **Solution**: The initial approach of using React state to track quiz completion was flawed. The fix was to simplify the logic and use `sessionStorage` as the single source of truth for a "finished" quiz. The `/quiz` page now checks `sessionStorage` directly, which completely eliminated the race condition and made the redirection logic robust.

-----

## Assumptions Made

  * The Open Trivia Database API is always available and will return 15 multiple-choice questions as requested.
  * The user has JavaScript enabled in their browser, as the application is built entirely with Next.js.