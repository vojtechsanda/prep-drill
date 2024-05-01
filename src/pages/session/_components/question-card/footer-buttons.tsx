import { Check, CheckCheck, StepForward } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { Button } from "@/components/ui/button";
import { useSessionInfo } from "@/hooks/session";

type FooterButtonsProps<T extends FieldValues> = {
  form: ReturnType<typeof useForm<T>>;
  onReset: () => void;
};

export function FooterButtons<T extends FieldValues>({
  onReset,
  form,
}: FooterButtonsProps<T>) {
  const intl = useIntl();

  const sessionInfo = useSessionInfo();
  const question = sessionInfo?.currentQuestion;

  const isLastQuestion =
    question && sessionInfo?.session.questionsIds.slice(-1)[0] === question.id;

  const { onNextQuestion, onFinish } = sessionInfo ?? {};

  const handleNextQuestion = async () => {
    onReset();
    form.reset();
    await onNextQuestion?.();
  };

  return (
    <>
      {form.formState.isSubmitted && !isLastQuestion && (
        <Button type="button" className="gap-1" onClick={handleNextQuestion}>
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
