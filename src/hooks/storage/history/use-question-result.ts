import { useSessionInfo } from "@/hooks/session";

import { useSavedHistoryQuery } from "./use-saved-history-query";

// TODO: It should be history result, not answer - redo this naming in the whole app
export function useQuestionResult() {
  const historyQuery = useSavedHistoryQuery();
  const sessionInfo = useSessionInfo();

  if (!historyQuery.data || !sessionInfo) return null;

  const session = historyQuery.data.sessions[sessionInfo.session.id];
  if (!session) {
    console.error(
      `useGetHistoryAnswer[${sessionInfo.session.id}]: Session not found`,
    );
    return null;
  }

  const question = session.answers.find(
    (answer) => answer.questionId === sessionInfo.currentQuestion?.id,
  );

  return question ? question.answers : null;
}
