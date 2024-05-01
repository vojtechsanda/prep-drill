import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/forms";
import { CheckboxFormField } from "@/components/forms/form-parts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Question } from "@/schemas";

import { SessionInfo } from "../../hooks";
import { FooterButtons } from "./footer-buttons";
import { useCheckAnswers, useDefaultValues } from "./hooks";
import { QuestionCardAnswers, questionCardAnswersSchema } from "./schema";

export type QuestionCardProps = {
  sessionInfo: Omit<SessionInfo, "currentQuestion">;
  question: Question;
};

export function QuestionCard({ sessionInfo, question }: QuestionCardProps) {
  const defaultValues = useDefaultValues(question);
  const checkAnswers = useCheckAnswers(question);

  const [checkedResult, setCheckedResult] = useState<Record<string, boolean>>(
    {},
  );

  const handleSubmit = async (data: QuestionCardAnswers) => {
    const checkedAnswers = checkAnswers(data);
    setCheckedResult(checkedAnswers);
  };

  const form = useForm({
    defaultValues,
    resolver: zodResolver(questionCardAnswersSchema),
  });

  return (
    <Form onSubmit={handleSubmit} form={form} className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            {question.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {question.answers.map((answer, index) => (
              <CheckboxFormField
                form={form}
                name={`answers.${index}.checked`}
                key={answer.id}
                label={answer.text}
                disabled={form.formState.isSubmitted}
                className={cn({
                  "bg-red-400": checkedResult[answer.id] === false,
                  "bg-green-400": checkedResult[answer.id] === true,
                })}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap-reverse justify-center gap-x-12 gap-y-4 sm:justify-between">
          <FooterButtons
            sessionInfo={sessionInfo}
            question={question}
            form={form}
          />
        </CardFooter>
      </Card>
    </Form>
  );
}
