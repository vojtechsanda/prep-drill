import { GraduationCap } from "lucide-react";
import { useIntl } from "react-intl";

import { StatisticsUnit } from "@/components";
import { SetupSessionPrompt } from "@/components/forms/setup-session-prompt";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSessionInfo } from "@/hooks/session";

export function FinishedSession() {
  const intl = useIntl();

  const sessionInfo = useSessionInfo();
  if (!sessionInfo) return null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">
          {intl.formatMessage({
            id: "finished-session.title",
            defaultMessage: "Good job! You just finished the drill session!",
          })}
        </CardTitle>
        <CardDescription>
          {intl.formatMessage({
            id: "finished-session.description",
            defaultMessage:
              "Here are some statistics about your performance in this session.",
          })}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <StatisticsUnit
          type="OTHER"
          label={intl.formatMessage({
            id: "finished-session.total-questions",
            defaultMessage: "Questions in total",
          })}
          count={sessionInfo.stats.answered}
        />

        {/* TODO: Add not answered questions */}

        <StatisticsUnit
          type="CORRECT"
          label={intl.formatMessage({
            id: "finished-session.correct-questions",
            defaultMessage: "Correctly answered",
          })}
          count={sessionInfo.stats.correct}
        />

        <StatisticsUnit
          type="PARTIALLY"
          label={intl.formatMessage({
            id: "finished-session.partially-questions",
            defaultMessage: "Partially answered",
          })}
          count={sessionInfo.stats.partiallyCorrect}
        />

        <StatisticsUnit
          type="INCORRECT"
          label={intl.formatMessage({
            id: "finished-session.incorrect-questions",
            defaultMessage: "Wrongly answered",
          })}
          count={sessionInfo.stats.incorrect}
        />
      </CardContent>

      <CardFooter className="flex justify-center">
        <SetupSessionPrompt>
          <Button>
            <GraduationCap />
            {intl.formatMessage({
              id: "finished-session.setup-new-session",
              defaultMessage: "Start new session",
            })}
          </Button>
        </SetupSessionPrompt>
      </CardFooter>
    </Card>
  );
}
