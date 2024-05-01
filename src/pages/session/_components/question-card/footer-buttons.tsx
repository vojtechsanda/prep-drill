import { Check, CheckCheck, StepBack, StepForward } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { Button } from "@/components/ui/button";

import { QuestionCardProps } from "./question-card";

type FooterButtonsProps<T extends FieldValues> = {
  form: ReturnType<typeof useForm<T>>;
} & QuestionCardProps;

export function FooterButtons<T extends FieldValues>({
  sessionInfo,
  question,
  form,
}: FooterButtonsProps<T>) {
  const intl = useIntl();

  const isFirstQuestion = sessionInfo.session.questionsIds[0] === question.id;
  const isLastQuestion =
    sessionInfo.session.questionsIds.slice(-1)[0] === question.id;

  const { onPreviousQuestion, onNextQuestion, onFinish } = sessionInfo;

  return (
    <>
      <Button
        variant="outline"
        type="button"
        className="gap-1"
        disabled={isFirstQuestion}
        onClick={onPreviousQuestion}
      >
        <StepBack size={20} />
        {intl.formatMessage({
          id: "session.question-card.buttons.previous",
          defaultMessage: "Previous question",
        })}
      </Button>

      {form.formState.isSubmitted && !isLastQuestion && (
        <Button type="button" className="gap-1" onClick={onNextQuestion}>
          {intl.formatMessage({
            id: "session.question-card.buttons.next",
            defaultMessage: "Next question",
          })}
          <StepForward size={20} />
        </Button>
      )}

      {form.formState.isSubmitted && isLastQuestion && (
        <Button type="button" className="gap-1" onClick={onFinish}>
          <CheckCheck size={20} />
          {intl.formatMessage({
            id: "session.question-card.buttons.finish",
            defaultMessage: "Finish session",
          })}
        </Button>
      )}

      {!form.formState.isSubmitted && (
        <Button type="submit" className="gap-1">
          <Check size={20} />
          {intl.formatMessage({
            id: "session.question-card.buttons.submit",
            defaultMessage: "Check answers",
          })}
        </Button>
      )}
    </>
  );
}
