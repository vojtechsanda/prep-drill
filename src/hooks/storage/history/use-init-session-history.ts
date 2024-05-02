import { STORAGE_PREFIX } from "@/env";
import { History, SessionInHistory } from "@/schemas/history-schema";

import { useSavedHistoryQuery } from "./use-saved-history-query";

export function useInitSessionHistory() {
  const historyQuery = useSavedHistoryQuery();

  return (session: SessionInHistory) => {
    if (historyQuery.isLoading) return;

    const history: History = historyQuery.data ?? {
      sessions: {},
    };

    if (history.sessions[session.id]) {
      console.error(
        "[useInitSessionHistory]: Session already exists in history",
      );
      return;
    }

    history.sessions[session.id] = session;

    localStorage.setItem(`${STORAGE_PREFIX}/history`, JSON.stringify(history));
  };
}
