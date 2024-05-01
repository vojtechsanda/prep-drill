import { GraduationCap } from "lucide-react";
import { useIntl } from "react-intl";

import { SetupSessionPrompt } from "@/components/forms/setup-session-prompt";
import { Button } from "@/components/ui/button";

export function NoSession() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-semibold text-center">
        {intl.formatMessage({
          id: "session.no-session",
          defaultMessage: "No session found",
        })}
      </h1>

      <SetupSessionPrompt>
        <Button>
          <GraduationCap />
          {intl.formatMessage({
            id: "session.setup-session",
            defaultMessage: "Start new session",
          })}
        </Button>
      </SetupSessionPrompt>
    </div>
  );
}
