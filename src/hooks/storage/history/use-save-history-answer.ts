import { useSessionInfo } from "@/hooks/session";
import { AnswerInHistory } from "@/schemas/history-schema";

import { useSaveHistoryMutation } from "./use-save-history-mutation";
import { useSavedHistoryQuery } from "./use-saved-history-query";

export function useSaveHistoryAnswer() {
  const historyQuery = useSavedHistoryQuery();
  const sessionInfo = useSessionInfo();
  const { mutate: saveHistory } = useSaveHistoryMutation();

  return (answer: AnswerInHistory) => {
    if (historyQuery.isLoading || !sessionInfo) return;

    const history = historyQuery.data;

    if (!history) {
      console.error(
        `useSaveHistoryAnswer[${sessionInfo.session.id}]: No history data found. Aborting save.`,
      );
      return;
    }

    if (!history.sessions[sessionInfo.session.id]) {
      console.error(
        `useSaveHistoryAnswer[${sessionInfo.session.id}]: No session found in history data. Aborting save.`,
      );
      return;
    }

    const session = history.sessions[sessionInfo.session.id];
    session.answers.push(answer);

    saveHistory(history);
  };
}
