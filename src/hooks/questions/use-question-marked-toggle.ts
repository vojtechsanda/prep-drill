import { useSavedQuestionsQuery } from "@/hooks/storage/questions/use-saved-questions-query";

import { useSaveQuestionsMutation } from "../storage/questions";

export function useQuestionMarkedToggle() {
  const questionsQuery = useSavedQuestionsQuery();
  const { mutateAsync: saveQuestions } = useSaveQuestionsMutation();

  return async (questionId: string) => {
    const question = questionsQuery.data?.find((q) => q.id === questionId);
    if (!questionsQuery.data || !question) return;

    question.isMarked = !question.isMarked;

    await saveQuestions(questionsQuery.data);
  };
}
