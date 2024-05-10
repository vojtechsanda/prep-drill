import { useMutation, useQueryClient } from "@tanstack/react-query";

import { STORAGE_PREFIX } from "@/env";
import { useClearSessionMutation } from "@/hooks/storage/session";

import { allQuestionsQueryKey } from "./use-saved-questions-query";

export function useClearQuestionsMutation(invalidate = true) {
  const queryClient = useQueryClient();

  const { mutateAsync: clearSession } = useClearSessionMutation(invalidate);

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(`${STORAGE_PREFIX}/questions`);

      await clearSession();

      if (!invalidate) return;

      await queryClient.invalidateQueries({
        queryKey: allQuestionsQueryKey,
        refetchType: "all",
      });
    },
  });
}
