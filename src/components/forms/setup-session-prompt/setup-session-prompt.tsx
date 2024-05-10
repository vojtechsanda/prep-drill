import { GraduationCap } from "lucide-react";
import { PropsWithChildren } from "react";
import { useIntl } from "react-intl";

import { Prompt } from "@/components";
import { Button } from "@/components/ui/button";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import {
  useSavedSessionQuery,
  useSessionVersion,
} from "@/hooks/storage/session";
import { sessionConfigSchema } from "@/schemas";

import { SwitchFormField } from "../form-parts";
import { useHandleSubmit } from "./hooks";
import { OptionsSection } from "./options-section";

export function SetupSessionPrompt({ children }: PropsWithChildren<unknown>) {
  const intl = useIntl();
  const handleSubmit = useHandleSubmit();

  const questionsQuery = useSavedQuestionsQuery();
  const markedQuestionsCount =
    questionsQuery.data?.filter((question) => question.isMarked)?.length ?? 0;

  const sessionQuery = useSavedSessionQuery();
  const sessionVersion = useSessionVersion();
  const previousMistakesCount =
    (sessionQuery.data?.incorrectQuestionsIds.length ?? 0) +
    (sessionQuery.data?.partiallyCorrectQuestionsIds.length ?? 0);

  return (
    <Prompt
      defaultValues={{
        version: sessionVersion,
        shuffleQuestions: true,
        shuffleAnswers: true,
        practiceOnlyMarked: false,
        repeatIncorrectQuestions: false,
        practiceOnlyMistakes: false,
      }}
      schema={sessionConfigSchema}
      title={intl.formatMessage({
        id: "setup-session.title",
        defaultMessage: "Setup drill session",
      })}
      onSubmit={handleSubmit}
      content={(form) =>
        sessionQuery.isLoading ? null : (
          <div className="flex flex-col w-full gap-4">
            <OptionsSection
              label={intl.formatMessage({
                id: "setup-session.shuffling-options",
                defaultMessage: "Shuffling options",
              })}
            >
              <SwitchFormField
                form={form}
                name="shuffleQuestions"
                label={intl.formatMessage({
                  id: "setup-session.randomize-questions",
                  defaultMessage: "Randomize question order",
                })}
              />
              <SwitchFormField
                form={form}
                name="shuffleAnswers"
                label={intl.formatMessage({
                  id: "setup-session.randomize-answers",
                  defaultMessage: "Randomize answer order",
                })}
              />
            </OptionsSection>
            <OptionsSection
              label={intl.formatMessage({
                id: "setup-session.questions-management",
                defaultMessage: "Questions management",
              })}
            >
              <SwitchFormField
                disabled={!markedQuestionsCount}
                form={form}
                name="practiceOnlyMarked"
                label={intl.formatMessage(
                  {
                    id: "setup-session.practice-marked",
                    defaultMessage:
                      "Practice only marked questions ({count} marked)",
                  },
                  {
                    count: markedQuestionsCount,
                  },
                )}
              />
              <SwitchFormField
                // TODO: Enable when feature is ready
                disabled
                form={form}
                name="repeatIncorrectQuestions"
                label={intl.formatMessage({
                  id: "setup-session.repeat-incorrect",
                  defaultMessage: "Repeat incorrectly answered questions",
                })}
              />
              <SwitchFormField
                form={form}
                name="practiceOnlyMistakes"
                disabled={!previousMistakesCount}
                label={intl.formatMessage(
                  {
                    id: "setup-session.practice-previous-mistakes",
                    defaultMessage:
                      "Practice only previous mistakes ({count} mistakes)",
                  },
                  {
                    count: previousMistakesCount,
                  },
                )}
              />
            </OptionsSection>
          </div>
        )
      }
      submitButtonContent={
        <>
          <GraduationCap />
          {intl.formatMessage({
            id: "setup-session.submit",
            defaultMessage: "Start session",
          })}
        </>
      }
    >
      {children ?? (
        <Button>
          <GraduationCap />
          {intl.formatMessage({
            id: "homepage.buttons.start-drilling",
            defaultMessage: "Start drilling",
          })}
        </Button>
      )}
    </Prompt>
  );
}
