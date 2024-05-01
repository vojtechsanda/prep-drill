import { useSessionInfo } from "@/hooks/session";
import { useSavedSessionQuery } from "@/hooks/storage/session";

import { FinishedSession, NoSession, QuestionCard } from "./_components";

export function Session() {
  const sessionQuery = useSavedSessionQuery();

  const sessionInfo = useSessionInfo();

  if (sessionQuery.data === undefined || sessionQuery.isLoading) return null;

  if (sessionInfo === null) return <NoSession />;

  if (sessionInfo.isFinished) return <FinishedSession />;

  return sessionInfo.currentQuestion && <QuestionCard />;
}
