import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { useSaveSessionMutation } from "@/hooks/storage/session";

import { useSessionInfo } from "./use-session-info";

export function useNextQuestion() {
  const sessionInfo = useSessionInfo();
  const questionsQuery = useSavedQuestionsQuery();

  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async () => {
    const questions = questionsQuery.data;
    if (!sessionInfo || !questions?.length) return;

    const currentQuestionIndex = questions.findIndex(
      (question) => question.id === sessionInfo.currentQuestion?.id,
    );

    await saveSession({
      ...sessionInfo.session,
      currentQuestionId: currentQuestionIndex
        ? questions[currentQuestionIndex + 1]?.id
        : null,
    });
  };
}
