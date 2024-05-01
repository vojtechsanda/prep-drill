import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { Questions } from "@/schemas";

import { allQuestionsQueryKey } from "./use-saved-questions-query";

export function useSaveQuestionsMutation() {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (questions: Questions) => {
      localStorage.setItem(
        `${STORAGE_PREFIX}/questions`,
        JSON.stringify(questions),
      );

      queryClient.invalidateQueries({
        queryKey: allQuestionsQueryKey,
        refetchType: "all",
      });
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
