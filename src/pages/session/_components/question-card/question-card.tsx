import { zodResolver } from "@hookform/resolvers/zod";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { StatisticsUnit } from "@/components";
import { Form } from "@/components/forms";
import { CheckboxFormField } from "@/components/forms/form-parts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuestionMarkedToggle, useQuestionResult } from "@/hooks/questions";
import { useSessionInfo } from "@/hooks/session";
import { cn, shuffle } from "@/lib/utils";
import { Question, SessionConfigSchema } from "@/schemas";

import { FooterButtons } from "./footer-buttons";
import { useDefaultValues, useHandleSubmit } from "./hooks";
import { questionCardAnswersSchema } from "./schema";

type _QuestionCardProps = {
  question: Question;
  sessionConfig: SessionConfigSchema;
};

export function QuestionCard() {
  const sessionInfo = useSessionInfo();

  if (!sessionInfo?.currentQuestion) return null;

  return (
    <_QuestionCard
      question={sessionInfo.currentQuestion}
      sessionConfig={sessionInfo.session.config}
    />
  );
}

function _QuestionCard({ question, sessionConfig }: _QuestionCardProps) {
  const intl = useIntl();

  const sessionInfo = useSessionInfo();

  const shuffledAnswers = useMemo(
    () =>
      sessionConfig.shuffleAnswers
        ? shuffle(question.answers)
        : question.answers,
    [question.answers, sessionConfig.shuffleAnswers],
  );

  const defaultValues = useDefaultValues(shuffledAnswers);

  const answersResult = useQuestionResult();

  const toggleMarked = useQuestionMarkedToggle();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(questionCardAnswersSchema),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleSubmit = useHandleSubmit();

  if (!sessionInfo) return null;

  return (
    <Form onSubmit={handleSubmit} form={form} className="w-full max-w-2xl">
      <Card>
        <CardHeader className="relative">
          <CardTitle className="text-base sm:text-lg">
            {question.title}
          </CardTitle>
          <Button
            size="icon"
            type="button"
            className="absolute cursor-pointer right-3 -top-5"
            onClick={() => toggleMarked(question.id)}
          >
            {question.isMarked ? <BookmarkCheck /> : <Bookmark />}
          </Button>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {shuffledAnswers.map((answer, index) => (
              <CheckboxFormField
                form={form}
                name={`answers.${index}.checked`}
                key={answer.id}
                label={answer.text}
                disabled={answersResult !== null}
                className={cn({
                  "bg-red-400": answersResult?.[answer.id] === false,
                  "bg-green-400":
                    answersResult?.[answer.id] === true ||
                    answersResult?.[answer.id] === null,
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

          <FooterButtons form={form} />
        </CardFooter>
      </Card>
    </Form>
  );
}
