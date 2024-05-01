import { useSavedSessionQuery } from "@/hooks/storage/session";

import { NoSession } from "./_components";
import { useGetSessionInfo } from "./hooks";

export function Session() {
  const sessionQuery = useSavedSessionQuery();

  const getSessionInfo = useGetSessionInfo();

  if (sessionQuery.data === undefined || sessionQuery.isLoading) return null;
  if (sessionQuery.data === null) return <NoSession />;

  const sessionInfo = getSessionInfo(sessionQuery.data);

  return <h1>Session</h1>;
}
