import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";

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
import { Question } from "@/schemas";

import { useDefaultValues } from "./hooks";
import { questionCardAnswersSchema } from "./schema";

type QuestionCardProps = {
  question: Question;
};

export function QuestionCard({ question }: QuestionCardProps) {
  const intl = useIntl();
  const defaultValues = useDefaultValues(question);

  const handleSubmit = console.log;

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
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            {intl.formatMessage({
              id: "session.question-card.buttons.previous",
              defaultMessage: "Previous question",
            })}
          </Button>

          {form.formState.isSubmitted ? (
            <Button type="button">
              {intl.formatMessage({
                id: "session.question-card.buttons.next",
                defaultMessage: "Next question",
              })}
            </Button>
          ) : (
            <Button type="submit">
              {intl.formatMessage({
                id: "session.question-card.buttons.submit",
                defaultMessage: "Check answers",
              })}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Form>
  );
}
