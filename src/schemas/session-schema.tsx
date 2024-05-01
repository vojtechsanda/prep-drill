import { z } from "zod";

import { sessionConfigSchema } from "./session-config-schema";

export const sessionStatusSchema = z.enum([
  "IN_PROGRESS",
  "FINISHED",
  "STOPPED",
]);

export type SessionStatus = z.infer<typeof sessionStatusSchema>;

export const sessionSchema = z.object({
  status: sessionStatusSchema,
  config: sessionConfigSchema,
  questionsIds: z.array(z.string()).min(1),
  correctQuestionsIds: z.array(z.string()),
  incorrectQuestionsIds: z.array(z.string()),
  currentQuestion: z.string().optional(),
});

export type Session = z.infer<typeof sessionSchema>;
