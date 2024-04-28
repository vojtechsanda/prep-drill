import { useIntl } from "react-intl";

import { ImportQuestionsPrompt } from "@/components/forms";

export function Home() {
  const intl = useIntl();

  return (
    <>
      <div className="grid items-center h-full justify-items-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl">
            {intl.formatMessage({
              id: "homepage.title.welcome-to",
              defaultMessage: "Welcome to",
            })}{" "}
            <span className="font-bold">PrepDrill</span>
          </h1>

          <h2 className="text-2xl">
            {intl.formatMessage({
              id: "homepage.subtitle",
              defaultMessage:
                "Simple application for drilling the questions for exams",
            })}
          </h2>

          <ImportQuestionsPrompt />
        </div>
      </div>
    </>
  );
}
