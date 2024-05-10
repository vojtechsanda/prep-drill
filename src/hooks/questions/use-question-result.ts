import { useSessionInfo } from "@/hooks/session";

import { useSavedHistoryQuery } from "../storage/history/use-saved-history-query";

export function useQuestionResult() {
  const historyQuery = useSavedHistoryQuery();
  const sessionInfo = useSessionInfo();

  if (!historyQuery.data || !sessionInfo) return null;

  const historySession = historyQuery.data.sessions[sessionInfo.session.id];
  if (!historySession) {
    console.error(
      `useQuestionResult[${sessionInfo.session.id}]: History session not found`,
    );
    return null;
  }

  const question = historySession.responses.find(
    (response) => response.questionId === sessionInfo.currentQuestion?.id,
  );

  return question ? question.result : null;
}
