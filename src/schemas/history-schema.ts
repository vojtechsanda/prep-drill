import { z } from "zod";

import { sessionConfigSchema } from "./session-config-schema";

const resultSchema = z.record(z.string(), z.boolean().nullable());

function useResponseInHistorySchema() {
  return z.object({
    questionId: z.string(),
    result: resultSchema,
  });
}

function useSessionInHistorySchema() {
  return z.object({
    id: z.string(),
    config: sessionConfigSchema,
    createdAt: z.string(),
    responses: z.array(useResponseInHistorySchema()),
    totalQuestions: z.number(),
  });
}

export function useHistorySchema() {
  return z.object({
    sessions: z.record(z.string(), useSessionInHistorySchema()),
  });
}

export type Result = z.infer<typeof resultSchema>;

export type ResponseInHistory = z.infer<
  ReturnType<typeof useResponseInHistorySchema>
>;

export type SessionInHistory = z.infer<
  ReturnType<typeof useSessionInHistorySchema>
>;

export type History = z.infer<ReturnType<typeof useHistorySchema>>;
