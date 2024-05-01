import { Question } from "@/schemas";

import { QuestionCardAnswers } from "./schema";

export function useDefaultValues(question: Question): QuestionCardAnswers {
  return {
    answers: question.answers.map((answer) => ({
      id: answer.id,
      checked: false,
    })),
  };
}
