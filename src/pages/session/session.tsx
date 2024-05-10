import { useIntl } from "react-intl";

import { useSessionInfo } from "@/hooks/session";
import { useSavedSessionQuery } from "@/hooks/storage/session";
import { useTitle } from "@/lib/utils";

import { FinishedSession, NoSession, QuestionCard } from "./_components";

export function Session() {
  const sessionQuery = useSavedSessionQuery();
  const intl = useIntl();

  const sessionInfo = useSessionInfo();

  useTitle(
    intl.formatMessage({
      id: "session.browser-title.session",
      defaultMessage: "Session",
    }),
  );

  if (sessionQuery.data === undefined || sessionQuery.isLoading) return null;

  if (sessionInfo === null) return <NoSession />;

  if (sessionInfo.isFinished) return <FinishedSession />;

  return sessionInfo.currentQuestion && <QuestionCard />;
}
