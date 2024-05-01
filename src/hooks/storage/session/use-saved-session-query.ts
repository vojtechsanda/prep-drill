import { useQuery } from "@tanstack/react-query";

import { STORAGE_PREFIX } from "@/env";
import { sessionSchema } from "@/schemas";

export const sessionQueryKey = ["session"];

export function useSavedSessionQuery() {
  return useQuery({
    queryKey: sessionQueryKey,
    queryFn: () => {
      try {
        const valueFromStorage =
          localStorage.getItem(`${STORAGE_PREFIX}/session`) ?? "{}";

        const sessionRaw = JSON.parse(valueFromStorage);
        return sessionSchema.parse(sessionRaw);
      } catch (error) {
        console.log(error);

        return null;
      }
    },
  });
}
