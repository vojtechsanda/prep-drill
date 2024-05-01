import { useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
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
    onNextQuestion: async () => onNextQuestion(session),
    onFinish,
  });
};

function useNextQuestion() {
  const queryClient = useQueryClient();

  return async (session: Session) => {
    if (!session.currentQuestionId) return;

    await queryClient.invalidateQueries({
      queryKey: sessionQueryKey,
    });
  };
}

function useFinish() {
  const { toast } = useToast();

  return () => {
    toast({
      title: "TODO: useFinish",
      description: "Hook has not been implemented yet",
    });
  };
}
