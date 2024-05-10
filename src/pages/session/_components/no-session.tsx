import { GraduationCap } from "lucide-react";
import { useIntl } from "react-intl";

import { ImportQuestionsPrompt } from "@/components/forms";
import { SetupSessionPrompt } from "@/components/forms/setup-session-prompt";
import { Button } from "@/components/ui/button";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";

export function NoSession() {
  const intl = useIntl();
  const questionsQuery = useSavedQuestionsQuery();

  if (questionsQuery.isLoading) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-semibold text-center">
        {questionsQuery.data?.length
          ? intl.formatMessage({
              id: "session.no-session",
              defaultMessage: "No session found",
            })
          : intl.formatMessage({
              id: "session.no-questions",
              defaultMessage: "No questions imported ",
            })}
      </h1>

      {questionsQuery.data?.length ? (
        <SetupSessionPrompt>
          <Button>
            <GraduationCap />
            {intl.formatMessage({
              id: "session.setup-session",
              defaultMessage: "Start new session",
            })}
          </Button>
        </SetupSessionPrompt>
      ) : (
        <ImportQuestionsPrompt />
      )}
    </div>
  );
}
