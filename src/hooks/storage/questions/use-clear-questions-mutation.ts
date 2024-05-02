import { useMutation, useQueryClient } from "@tanstack/react-query";

import { STORAGE_PREFIX } from "@/env";

import { allQuestionsQueryKey } from "./use-saved-questions-query";

export function useClearQuestionsMutation(invalidate = true) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(`${STORAGE_PREFIX}/questions`);

      if (!invalidate) return;

      await queryClient.invalidateQueries({
        queryKey: allQuestionsQueryKey,
        refetchType: "all",
      });
    },
  });
}
