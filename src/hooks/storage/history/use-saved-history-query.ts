import { useQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { STORAGE_PREFIX } from "@/env";
import { useHistorySchema } from "@/schemas/history-schema";

import { useClearHistoryMutation } from "./use-clear-history-mutation";

export const historyQueryKey = ["history"];

export function useSavedHistoryQuery() {
  const intl = useIntl();
  const historySchema = useHistorySchema();
  const { toast } = useToast();

  const { mutateAsync: clearHistory } = useClearHistoryMutation(false);

  return useQuery({
    queryKey: historyQueryKey,
    queryFn: async () => {
      try {
        const valueFromStorage = localStorage.getItem(
          `${STORAGE_PREFIX}/history`,
        );

        if (!valueFromStorage) return null;

        const historyRaw = JSON.parse(valueFromStorage);
        return historySchema.parse(historyRaw);
      } catch (error) {
        console.log(error);

        toast({
          title: intl.formatMessage({
            id: "history-query.error.title",
            defaultMessage: "Error loading history",
          }),
          description: intl.formatMessage({
            id: "history-query.error.description",
            defaultMessage: "Failed to load history data",
          }),
          variant: "destructive",
        });

        await clearHistory();

        return null;
      }
    },
  });
}
