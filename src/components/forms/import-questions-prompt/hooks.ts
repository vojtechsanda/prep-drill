import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { useQuestionsFileProcessing } from "@/hooks/import";
import { ImportQuestionsSchema } from "@/schemas";

export const useHandleSubmit = () => {
  const intl = useIntl();
  const { toast } = useToast();
  const processQuestionsFile = useQuestionsFileProcessing();

  return async (data: ImportQuestionsSchema) => {
    try {
      const questions = await processQuestionsFile(data.questions[0]);
      toast({
        title: intl.formatMessage({
          id: "import-questions.success-title",
          defaultMessage: "Questions imported",
        }),
        description: intl.formatMessage(
          {
            id: "import-questions.success",
            defaultMessage:
              "Successfully imported {count} questions, the old ones were replaced.",
          },
          {
            count: questions.length,
          },
        ),
        variant: "success",
      });

      console.log(questions);
    } catch (e) {
      toast({
        title: intl.formatMessage({
          id: "import-questions.error-title",
          defaultMessage: "Import failed",
        }),
        description: intl.formatMessage({
          id: "import-questions.error",
          defaultMessage: "An error occurred while importing questions.",
        }),
        variant: "destructive",
      });
      console.error(e);
    }
  };
};
