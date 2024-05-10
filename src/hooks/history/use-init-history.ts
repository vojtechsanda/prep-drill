import { useSaveHistoryMutation } from "@/hooks/storage/history/use-save-history-mutation";
import { useSavedHistoryQuery } from "@/hooks/storage/history/use-saved-history-query";
import { History, SessionInHistory } from "@/schemas/history-schema";

export function useInitHistory() {
  const historyQuery = useSavedHistoryQuery();
  const { mutate: saveHistory } = useSaveHistoryMutation();

  return async (session: SessionInHistory) => {
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
    saveHistory(history);
  };
}
