import { useToast } from "@/components/ui/use-toast";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { Session } from "@/schemas";

export type SessionInfo = ReturnType<ReturnType<typeof useGetSessionInfo>>;

export const useGetSessionInfo = () => {
  const onPreviousQuestion = usePreviousQuestion();
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
        session.incorrectQuestionsIds.length,
      correct: session.correctQuestionsIds.length,
      incorrect: session.incorrectQuestionsIds.length,
    },
    onPreviousQuestion,
    onNextQuestion,
    onFinish,
  });
};

function usePreviousQuestion() {
  const { toast } = useToast();

  return () => {
    toast({
      title: "TODO: usePreviousQuestion",
      description: "Hook has not been implemented yet",
    });
  };
}

function useNextQuestion() {
  const { toast } = useToast();

  return () => {
    toast({
      title: "TODO: useNextQuestion",
      description: "Hook has not been implemented yet",
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
