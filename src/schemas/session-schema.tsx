import { z } from "zod";

import { sessionConfigSchema } from "./session-config-schema";

export const sessionStatusSchema = z.enum(["IN_PROGRESS", "FINISHED"]);

export type SessionStatus = z.infer<typeof sessionStatusSchema>;

export const sessionSchema = z
  .object({
    status: sessionStatusSchema,
    config: sessionConfigSchema,
    questionsIds: z.array(z.string()).min(1),
    correctQuestionsIds: z.array(z.string()),
    partiallyCorrectQuestionsIds: z.array(z.string()),
    incorrectQuestionsIds: z.array(z.string()),
    currentQuestionId: z.string().nullish(),
  })
  .refine(
    (data) =>
      !data.currentQuestionId ||
      data.questionsIds.includes(data.currentQuestionId),
  );

export type Session = z.infer<typeof sessionSchema>;
