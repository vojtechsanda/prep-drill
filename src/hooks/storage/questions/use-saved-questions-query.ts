import { useQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { useQuestionsSchema } from "@/schemas";

import { useClearQuestionsMutation } from "./use-clear-questions-mutation";

export const allQuestionsQueryKey = ["questions"];

export function useSavedQuestionsQuery() {
  const intl = useIntl();
  const questionsSchema = useQuestionsSchema();
  const { toast } = useToast();

  const { mutateAsync: clearQuestions } = useClearQuestionsMutation(false);

  return useQuery({
    queryKey: allQuestionsQueryKey,
    queryFn: async () => {
      try {
        const valueFromStorage =
          localStorage.getItem(`${STORAGE_PREFIX}/questions`) ?? "[]";

        const questionsRaw = JSON.parse(valueFromStorage);
        return questionsSchema.parse(questionsRaw);
      } catch (error) {
        console.log(error);

        toast({
          title: intl.formatMessage({
            id: "questions-query.error.title",
            defaultMessage: "Error loading questions",
          }),
          description: intl.formatMessage({
            id: "questions-query.error.description",
            defaultMessage: "Failed to load saved questions",
          }),
          variant: "destructive",
        });

        await clearQuestions();

        return [];
      }
    },
  });
}
