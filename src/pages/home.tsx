import { ArrowBigDownDash, GraduationCap } from "lucide-react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ImportQuestionsPrompt } from "@/components/forms";
import { SetupSessionPrompt } from "@/components/forms/setup-session-prompt";
import { Button } from "@/components/ui/button";
import { useSessionInfo } from "@/hooks/session";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";

export function Home() {
  const intl = useIntl();

  const questionsQuery = useSavedQuestionsQuery();
  const questions = questionsQuery.data ?? [];

  const sessionInfo = useSessionInfo();

  if (questionsQuery.isLoading) {
    return null;
  }

  const sessionIsRunning = sessionInfo && !sessionInfo.isFinished;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl text-center">
        {intl.formatMessage({
          id: "homepage.title.welcome-to",
          defaultMessage: "Welcome to",
        })}{" "}
        <span className="font-bold">PrepDrill</span>
      </h1>

      <h2 className="text-2xl text-center">
        {intl.formatMessage({
          id: "homepage.subtitle",
          defaultMessage: "Simple application for drilling questions for exams",
        })}
      </h2>

      <div className="flex flex-col items-center gap-2">
        {!!questions.length && (
          <div className="flex items-center gap-4">
            <SetupSessionPrompt>
              {sessionIsRunning ? (
                <Button>
                  <GraduationCap />
                  {intl.formatMessage({
                    id: "homepage.setup-session",
                    defaultMessage: "Start new drill",
                  })}
                </Button>
              ) : null}
            </SetupSessionPrompt>

            {sessionIsRunning && (
              <Button asChild>
                <Link to="/session">
                  <ArrowBigDownDash />
                  {intl.formatMessage({
                    id: "homepage.back-to-session",
                    defaultMessage: "Back to session",
                  })}
                </Link>
              </Button>
            )}
          </div>
        )}
        <ImportQuestionsPrompt>
          {questions.length ? (
            <Button variant="link">
              {intl.formatMessage({
                id: "homepage.import.import-new-questions",
                defaultMessage: "Import new questions",
              })}
            </Button>
          ) : null}
        </ImportQuestionsPrompt>
      </div>
    </div>
  );
}
