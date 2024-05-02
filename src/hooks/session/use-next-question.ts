import { useSaveSessionMutation } from "@/hooks/storage/session";

import { useSessionInfo } from "./use-session-info";

export function useNextQuestion() {
  const sessionInfo = useSessionInfo();

  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async () => {
    if (!sessionInfo) return;

    const currentQuestionIndex = sessionInfo.session.questionsIds.indexOf(
      sessionInfo.session.currentQuestionId ?? "",
    );

    await saveSession({
      ...sessionInfo.session,
      currentQuestionId:
        sessionInfo.session.questionsIds[currentQuestionIndex + 1] ?? null,
    });
  };
}
