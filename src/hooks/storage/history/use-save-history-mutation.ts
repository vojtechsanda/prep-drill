import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { useClearSessionMutation } from "@/hooks/storage/session";
import { History } from "@/schemas/history-schema";

import { historyQueryKey } from "./use-saved-history-query";

export function useSaveHistoryMutation() {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: clearSession } = useClearSessionMutation();

  return useMutation({
    mutationFn: async (history: History) => {
      localStorage.setItem(
        `${STORAGE_PREFIX}/history`,
        JSON.stringify(history),
      );

      await queryClient.invalidateQueries({
        queryKey: historyQueryKey,
        refetchType: "all",
      });

      await clearSession();
    },
    onError: (e) => {
      console.error(e);

      toast({
        title: intl.formatMessage({
          id: "save-history.error-title",
          defaultMessage: "Error saving data to history",
        }),
        description: intl.formatMessage({
          id: "save-history.error",
          defaultMessage: "An error occurred while saving history data.",
        }),
        variant: "destructive",
      });
    },
  });
}
