import { useQuery } from "@tanstack/react-query";

import { STORAGE_PREFIX } from "@/env";
import { sessionSchema } from "@/schemas";

import { useClearSessionMutation } from "./use-clear-session-mutation";
import { useSessionVersion } from "./use-session-version";

export const sessionQueryKey = ["session"];

export function useSavedSessionQuery() {
  const currentSessionVersion = useSessionVersion();
  const { mutateAsync: clearSession } = useClearSessionMutation(false);

  return useQuery({
    queryKey: sessionQueryKey,
    queryFn: async () => {
      try {
        const valueFromStorage = localStorage.getItem(
          `${STORAGE_PREFIX}/session`,
        );

        if (!valueFromStorage) return null;

        const sessionRaw = JSON.parse(valueFromStorage ?? "{}");
        const session = sessionSchema.parse(sessionRaw);

        if (session.config.version !== currentSessionVersion) {
          throw new Error("Session version mismatch");
        }

        return session;
      } catch (error) {
        await clearSession();

        return null;
      }
    },
  });
}
