import { useMutation, useQueryClient } from "@tanstack/react-query";

import { STORAGE_PREFIX } from "@/env";

import { historyQueryKey } from "./use-saved-history-query";

export function useClearHistoryMutation(invalidate = true) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(`${STORAGE_PREFIX}/history`);

      if (!invalidate) return;

      await queryClient.invalidateQueries({
        queryKey: historyQueryKey,
        refetchType: "all",
      });
    },
  });
}
