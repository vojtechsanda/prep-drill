import { AnswerInHistory } from "@/schemas/history-schema";

import { useSaveHistoryMutation } from "./use-save-history-mutation";
import { useSavedHistoryQuery } from "./use-saved-history-query";

type SaveHistoryProps = {
  sessionId: string;
  answer: AnswerInHistory;
};

export function useSaveHistoryAnswer() {
  const historyQuery = useSavedHistoryQuery();
  const { mutate: saveHistory } = useSaveHistoryMutation();

  return ({ sessionId, answer }: SaveHistoryProps) => {
    if (historyQuery.isLoading) return;

    const history = historyQuery.data;

    if (!history) {
      console.error(
        `useSaveHistoryAnswer[${sessionId}]: No history data found. Aborting save.`,
      );
      return;
    }

    if (!history.sessions[sessionId]) {
      console.error(
        `useSaveHistoryAnswer[${sessionId}]: No session found in history data. Aborting save.`,
      );
      return;
    }

    const session = history.sessions[sessionId];
    session.answers.push(answer);

    saveHistory(history);
  };
}
