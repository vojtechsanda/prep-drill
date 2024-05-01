import { useQueryClient } from "@tanstack/react-query";

import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { sessionQueryKey } from "@/hooks/storage/session/use-saved-session-query";
import { Session } from "@/schemas";

export type SessionInfo = ReturnType<ReturnType<typeof useGetSessionInfo>>;

export const useGetSessionInfo = () => {
  const onNextQuestion = useNextQuestion();
  const onFinish = useFinish();

  const questionsQuery = useSavedQuestionsQuery();

  return (session: Session) => ({
    session,
    allQuestions: questionsQuery.data ?? [],
    isFinished: session.status === "FINISHED",
    currentQuestion: questionsQuery.data?.find(
      (question) => question.id === session.currentQuestionId,
    ),
    stats: {
      total: session.questionsIds.length,
      answered:
        session.correctQuestionsIds.length +
        session.partiallyCorrectQuestionsIds.length +
        session.incorrectQuestionsIds.length,
      correct: session.correctQuestionsIds.length,
      partiallyCorrect: session.partiallyCorrectQuestionsIds.length,
      incorrect: session.incorrectQuestionsIds.length,
    },
    onNextQuestion,
    onFinish,
  });
};

function useNextQuestion() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: sessionQueryKey,
    });
  };
}

function useFinish() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: sessionQueryKey,
    });
  };
}
