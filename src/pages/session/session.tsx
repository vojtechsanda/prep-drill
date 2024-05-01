import { useSavedSessionQuery } from "@/hooks/storage/session";

import { FinishedSession, NoSession, QuestionCard } from "./_components";
import { useGetSessionInfo } from "./hooks";

export function Session() {
  const sessionQuery = useSavedSessionQuery();

  const getSessionInfo = useGetSessionInfo();

  if (sessionQuery.data === undefined || sessionQuery.isLoading) return null;
  if (sessionQuery.data === null) return <NoSession />;

  const sessionInfo = getSessionInfo(sessionQuery.data);

  if (sessionInfo.isFinished) {
    return <FinishedSession sessionInfo={sessionInfo} />;
  }

  return (
    sessionInfo.currentQuestion && (
      <QuestionCard
        sessionInfo={sessionInfo}
        question={sessionInfo.currentQuestion}
      />
    )
  );
}
