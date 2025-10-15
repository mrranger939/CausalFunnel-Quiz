
interface ApiQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface AppQuestion {
  question: string;
  correct_answer: string;
  choices: string[];
}

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  
  if (typeof window === "undefined") {
    return text;
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const fetchQuizQuestions = async (): Promise<AppQuestion[]> => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=15&type=multiple");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data.results.map((apiQuestion: ApiQuestion) => {
      // Clean up all text fields using the new decoder function
      const choices = shuffleArray([
        ...apiQuestion.incorrect_answers.map(decodeHtmlEntities), // Decode incorrect answers
        decodeHtmlEntities(apiQuestion.correct_answer),           // Decode the correct answer
      ]);

      return {
        question: decodeHtmlEntities(apiQuestion.question), // Decode the question
        correct_answer: decodeHtmlEntities(apiQuestion.correct_answer), // Decode correct answer again for comparison
        choices: choices,
      };
    });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return [];
  }
};