import { useIntl } from "react-intl";
import { z } from "zod";

import { useAnswerSchema } from "./answer-schema";

export function useQuestionSchema() {
  const intl = useIntl();
  const answerSchema = useAnswerSchema();

  return z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    isMarked: z.boolean(),
    answers: z
      .array(answerSchema)
      .refine(
        (answers) => {
          const ids = answers.map((answer) => answer.id);
          return new Set(ids).size === ids.length;
        },
        intl.formatMessage({
          id: "question.error.duplicate-answer-ids",
          defaultMessage: "Answers must have unique IDs",
        }),
      )
      .refine(
        (answers) => answers.some((answer) => answer.isCorrect),
        intl.formatMessage({
          id: "question.error.no-correct-answer",
          defaultMessage: "Question must have at least one correct answer",
        }),
      ),
  });
}

export function useQuestionsSchema() {
  const intl = useIntl();
  const questionSchema = useQuestionSchema();

  return z.array(questionSchema).refine(
    (questions) => {
      const ids = questions.map((question) => question.id);
      return new Set(ids).size === ids.length;
    },
    intl.formatMessage({
      id: "questions.error.duplicate-ids",
      defaultMessage: "Questions must have unique IDs",
    }),
  );
}

export type Question = z.infer<ReturnType<typeof useQuestionSchema>>;
export type Questions = z.infer<ReturnType<typeof useQuestionsSchema>>;
