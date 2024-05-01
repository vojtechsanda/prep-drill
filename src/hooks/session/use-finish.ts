import { useQueryClient } from "@tanstack/react-query";

import { sessionQueryKey } from "@/hooks/storage/session/use-saved-session-query";

export function useFinish() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: sessionQueryKey,
    });
  };
}
