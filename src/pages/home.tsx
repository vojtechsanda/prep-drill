import { GraduationCap } from "lucide-react";
import { useIntl } from "react-intl";

import { ImportQuestionsPrompt } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useSavedQuestionsQuery } from "@/hooks/storage";

export function Home() {
  const intl = useIntl();

  const questionsQuery = useSavedQuestionsQuery();
  const questions = questionsQuery.data ?? [];

  if (questionsQuery.isLoading) {
    return null;
  }

  return (
    <>
      <div className="grid items-center h-full justify-items-center">
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
              defaultMessage:
                "Simple application for drilling the questions for exams",
            })}
          </h2>

          <div className="flex flex-col items-center gap-2">
            {!!questions.length && (
              <div className="flex items-center gap-4">
                <Button>
                  <GraduationCap />
                  {intl.formatMessage({
                    id: "homepage.buttons.start-drilling",
                    defaultMessage: "Start drilling",
                  })}
                </Button>
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
      </div>
    </>
  );
}
