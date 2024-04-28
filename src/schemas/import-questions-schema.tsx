import { useIntl } from "react-intl";
import { z } from "zod";

export function useImportQuestionsSchema() {
  const intl = useIntl();

  return z.object({
    questions: z
      .instanceof(FileList)
      .refine(
        (files) => files.length,
        intl.formatMessage({
          id: "import-questions.error.no-file",
          defaultMessage: "No file chosen",
        }),
      )
      .refine(
        (files) => files[0]?.type === "text/plain",
        intl.formatMessage({
          id: "import-questions.error.invalid-file-type",
          defaultMessage: "Invalid file type",
        }),
      ),
  });
}

export type ImportQuestionsSchema = ReturnType<typeof useImportQuestionsSchema>;
