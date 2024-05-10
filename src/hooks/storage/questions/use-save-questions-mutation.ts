import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { useClearSessionMutation } from "@/hooks/storage/session";
import { Questions, useQuestionsSchema } from "@/schemas";

import { useClearHistoryMutation } from "../history";
import { allQuestionsQueryKey } from "./use-saved-questions-query";

export function useSaveQuestionsMutation(clearAppData = false) {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: clearSession } = useClearSessionMutation();
  const { mutateAsync: clearHistory } = useClearHistoryMutation();

  const questionsSchema = useQuestionsSchema();

  return useMutation({
    mutationFn: async (questions: Questions) => {
      const verifiedQuestions = questionsSchema.parse(questions);

      localStorage.setItem(
        `${STORAGE_PREFIX}/questions`,
        JSON.stringify(verifiedQuestions),
      );

      await queryClient.invalidateQueries({
        queryKey: allQuestionsQueryKey,
        refetchType: "all",
      });

      if (clearAppData) {
        await clearSession();
        await clearHistory();
      }
    },
    onError: (e) => {
      console.error(e);

      toast({
        title: intl.formatMessage({
          id: "save-questions.error-title",
          defaultMessage: "Error saving questions",
        }),
        description: intl.formatMessage({
          id: "save-questions.error",
          defaultMessage: "An error occurred while saving questions.",
        }),
        variant: "destructive",
      });
    },
  });
}
