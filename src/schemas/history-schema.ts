import { z } from "zod";

import { sessionConfigSchema } from "./session-config-schema";

function useAnswerInHistorySchema() {
  return z.object({
    questionId: z.string(),
    answers: z.record(z.string(), z.boolean().nullable()),
  });
}

function useSessionInHistorySchema() {
  return z.object({
    id: z.string(),
    config: sessionConfigSchema,
    createdAt: z.string(),
    answers: z.array(useAnswerInHistorySchema()),
    totalQuestions: z.number(),
  });
}

export function useHistorySchema() {
  return z.object({
    sessions: z.record(z.string(), useSessionInHistorySchema()),
  });
}

export type AnswerInHistory = z.infer<
  ReturnType<typeof useAnswerInHistorySchema>
>;

export type SessionInHistory = z.infer<
  ReturnType<typeof useSessionInHistorySchema>
>;

export type History = z.infer<ReturnType<typeof useHistorySchema>>;
