import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { StatisticsUnit } from "@/components";
import { Form } from "@/components/forms";
import { CheckboxFormField } from "@/components/forms/form-parts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SessionInfo, useSessionInfo } from "@/hooks/session";
import { cn, shuffle } from "@/lib/utils";
import { Question } from "@/schemas";

import { FooterButtons } from "./footer-buttons";
import { useDefaultValues, useProcessAnswers, useSaveAnswers } from "./hooks";
import { QuestionCardAnswers, questionCardAnswersSchema } from "./schema";

type _QuestionCardProps = {
  question: Question;
  sessionInfo: SessionInfo;
};

export function QuestionCard() {
  const sessionInfo = useSessionInfo();

  if (!sessionInfo?.currentQuestion) return null;

  return (
    <_QuestionCard
      question={sessionInfo.currentQuestion}
      sessionInfo={sessionInfo}
    />
  );
}

function _QuestionCard({ question, sessionInfo }: _QuestionCardProps) {
  const intl = useIntl();
  const { toast } = useToast();

  const shuffledAnswers = useMemo(
    () =>
      sessionInfo.session.config.shuffleAnswers
        ? shuffle(question.answers)
        : question.answers,
    [question.answers, sessionInfo.session.config.shuffleAnswers],
  );

  const defaultValues = useDefaultValues(shuffledAnswers);

  const processAnswers = useProcessAnswers(question);
  const saveAnswers = useSaveAnswers();

  const [answersResult, setAnswersResult] = useState<
    Record<string, boolean | null>
  >({});

  const onSubmit = async (data: QuestionCardAnswers) => {
    const processedAnswers = processAnswers(data);
    setAnswersResult(processedAnswers);

    try {
      await saveAnswers(processedAnswers);
    } catch (error) {
      console.error(error);

      toast({
        title: intl.formatMessage({
          id: "question-card.error.saveAnswers",
          defaultMessage: "Failed to save answers",
        }),
        variant: "destructive",
      });
    }
  };

  const form = useForm({
    defaultValues,
    resolver: zodResolver(questionCardAnswersSchema),
  });

  return (
    <Form onSubmit={onSubmit} form={form} className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            {question.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {shuffledAnswers.map((answer, index) => (
              <CheckboxFormField
                form={form}
                name={`answers.${index}.checked`}
                key={answer.id}
                label={answer.text}
                disabled={form.formState.isSubmitted}
                className={cn({
                  "bg-red-400": answersResult[answer.id] === false,
                  "bg-green-400":
                    answersResult[answer.id] === true ||
                    answersResult[answer.id] === null,
                })}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap-reverse justify-center gap-x-16 gap-y-6 sm:justify-between">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base">
              {intl.formatMessage({
                id: "session.questionCard.stats",
                defaultMessage: "Statistics",
              })}
              :
            </span>

            <StatisticsUnit type="CORRECT" count={sessionInfo.stats.correct} />
            <StatisticsUnit
              type="PARTIALLY"
              count={sessionInfo.stats.partiallyCorrect}
            />
            <StatisticsUnit
              type="INCORRECT"
              count={sessionInfo.stats.incorrect}
            />
          </div>

          <FooterButtons onReset={() => setAnswersResult({})} form={form} />
        </CardFooter>
      </Card>
    </Form>
  );
}
