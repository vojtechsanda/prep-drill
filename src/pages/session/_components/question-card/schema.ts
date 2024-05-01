import { z } from "zod";

export const questionCardAnswersSchema = z.object({
  answers: z.array(
    z.object({
      id: z.string(),
      checked: z.boolean(),
    }),
  ),
});

export type QuestionCardAnswers = z.infer<typeof questionCardAnswersSchema>;
