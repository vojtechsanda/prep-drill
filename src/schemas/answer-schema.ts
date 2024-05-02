import { useIntl } from "react-intl";
import { z } from "zod";

export const useAnswerSchema = () => {
  const intl = useIntl();

  return z.object({
    id: z.string().min(1),
    text: z.string().min(
      1,
      intl.formatMessage({
        id: "answer.error.empty",
        defaultMessage: "Answer text is required",
      }),
    ),
    isCorrect: z.boolean().optional(),
  });
};

export type Answer = z.infer<ReturnType<typeof useAnswerSchema>>;
