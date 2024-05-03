import { useSessionInfo } from "@/hooks/session";
import { ResponseInHistory } from "@/schemas/history-schema";

import { useSaveHistoryMutation } from "./use-save-history-mutation";
import { useSavedHistoryQuery } from "./use-saved-history-query";

export function useSaveHistoryResponse() {
  const historyQuery = useSavedHistoryQuery();
  const sessionInfo = useSessionInfo();
  const { mutate: saveHistory } = useSaveHistoryMutation();

  return (response: ResponseInHistory) => {
    if (historyQuery.isLoading || !sessionInfo) return;

    const history = historyQuery.data;

    if (!history) {
      console.error(
        `useSaveHistoryResponse[${sessionInfo.session.id}]: No history data found. Aborting save.`,
      );
      return;
    }

    if (!history.sessions[sessionInfo.session.id]) {
      console.error(
        `useSaveHistoryResponse[${sessionInfo.session.id}]: No session found in history data. Aborting save.`,
      );
      return;
    }

    const session = history.sessions[sessionInfo.session.id];
    session.responses.push(response);

    saveHistory(history);
  };
}
