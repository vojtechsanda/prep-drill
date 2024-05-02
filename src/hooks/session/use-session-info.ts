import { useFinish } from "@/hooks/session/use-finish";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { useSavedSessionQuery } from "@/hooks/storage/session";

export type SessionInfo = Exclude<ReturnType<typeof useSessionInfo>, null>;

export function useSessionInfo() {
  const sessionQuery = useSavedSessionQuery();
  const questionsQuery = useSavedQuestionsQuery();

  const onFinish = useFinish();

  const session = sessionQuery.data;

  if (!session) return null;

  return {
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
    onFinish,
  };
}
