import { useToast } from "@/components/ui/use-toast";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { Session } from "@/schemas";

export const useGetSessionInfo = () => {
  const onQuestionSubmit = useQuestionSubmit();
  const onNextQuestion = useNextQuestion();
  const questionsQuery = useSavedQuestionsQuery();

  return (session: Session) => ({
    session,
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
    onQuestionSubmit,
    onNextQuestion,
  });
};

function useQuestionSubmit() {
  const { toast } = useToast();

  return () => {
    toast({
      title: "TODO: useQuestionSubmit",
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
