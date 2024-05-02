import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { Session } from "@/schemas";
import { sessionSchema } from "@/schemas/session-schema";

import { sessionQueryKey } from "./use-saved-session-query";

export function useSaveSessionMutation() {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (session: Session) => {
      const verifiedSession = sessionSchema.parse(session);

      localStorage.setItem(
        `${STORAGE_PREFIX}/session`,
        JSON.stringify(verifiedSession),
      );

      await queryClient.invalidateQueries({
        queryKey: sessionQueryKey,
      });
    },
    onError: (e) => {
      console.error(e);

      toast({
        title: intl.formatMessage({
          id: "save-session.error-title",
          defaultMessage: "Error saving session",
        }),
        description: intl.formatMessage({
          id: "save-session.error",
          defaultMessage: "An error occurred while saving session.",
        }),
        variant: "destructive",
      });
    },
  });
}
