import { useSaveSessionMutation } from "../storage/session";
import { useSessionInfo } from "./use-session-info";

export function useFinish() {
  const sessionInfo = useSessionInfo();

  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async () => {
    if (!sessionInfo) return;

    await saveSession({
      ...sessionInfo.session,
      status: "FINISHED",
    });
  };
}
