import { useMutation, useQueryClient } from "@tanstack/react-query";

import { STORAGE_PREFIX } from "@/env";

import { sessionQueryKey } from "./use-saved-session-query";

export function useClearSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(`${STORAGE_PREFIX}/session`);

      await queryClient.invalidateQueries({
        queryKey: sessionQueryKey,
      });
    },
  });
}
