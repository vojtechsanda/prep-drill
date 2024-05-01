import { useSavedSessionQuery } from "@/hooks/storage/session";

import { NoSession, QuestionCard } from "./_components";
import { useGetSessionInfo } from "./hooks";

export function Session() {
  const sessionQuery = useSavedSessionQuery();

  const getSessionInfo = useGetSessionInfo();

  if (sessionQuery.data === undefined || sessionQuery.isLoading) return null;
  if (sessionQuery.data === null) return <NoSession />;

  const sessionInfo = getSessionInfo(sessionQuery.data);

  return (
    sessionInfo.currentQuestion && (
      <QuestionCard question={sessionInfo.currentQuestion} />
    )
  );
}
