import { z } from "zod";

export const sessionConfigSchema = z.object({
  version: z.string(),
  shuffleQuestions: z.boolean(),
  shuffleAnswers: z.boolean(),
  repeatIncorrectQuestions: z.boolean(),
  practiceOnlyMistakes: z.boolean(),
});

export type SessionConfigSchema = z.infer<typeof sessionConfigSchema>;
