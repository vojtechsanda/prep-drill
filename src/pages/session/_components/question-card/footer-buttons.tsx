import { Check, CheckCheck, StepForward } from "lucide-react";
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

  const isLastQuestion =
    sessionInfo.session.questionsIds.slice(-1)[0] === question.id;

  const { onNextQuestion, onFinish } = sessionInfo;

  return (
    <>
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
