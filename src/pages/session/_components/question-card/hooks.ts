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

export function useCheckAnswers(question: Question) {
  return (data: QuestionCardAnswers) => {
    const checkedAnswers = {} as Record<string, boolean>;

    data.answers.forEach((answer) => {
      const shouldBeChecked = !!question.answers.find(
        (_answer) => answer.id === _answer.id,
      )?.isCorrect;

      checkedAnswers[answer.id] = shouldBeChecked === answer.checked;
    });

    return checkedAnswers;
  };
}
