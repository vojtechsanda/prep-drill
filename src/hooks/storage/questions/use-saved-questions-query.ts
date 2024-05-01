import { useQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { useQuestionsSchema } from "@/schemas";

export const allQuestionsQueryKey = ["questions"];

export function useSavedQuestionsQuery() {
  const intl = useIntl();
  const questionsSchema = useQuestionsSchema();
  const { toast } = useToast();

  return useQuery({
    queryKey: allQuestionsQueryKey,
    queryFn: () => {
      const valueFromStorage =
        localStorage.getItem(`${STORAGE_PREFIX}/questions`) ?? "[]";

      const questionsUnsafe = JSON.parse(valueFromStorage);
      const result = questionsSchema.safeParse(questionsUnsafe);

      if (result.success) {
        return result.data;
      }

      console.log(result.error);

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

      return [];
    },
  });
}
