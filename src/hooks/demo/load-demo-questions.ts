import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { useSaveQuestionsMutation } from "@/hooks/storage/questions";

import { useDemoQuestions } from "./demo-questions";

export const useLoadDemoQuestionsFn = () => {
  const intl = useIntl();
  const { toast } = useToast();

  const { mutateAsync: saveQuestions } = useSaveQuestionsMutation(true);

  const questions = useDemoQuestions();

  return async () => {
    toast({
      title: intl.formatMessage({
        id: "demo.load-demo-questions.success-title",
        defaultMessage: "Questions loaded",
      }),
      description: intl.formatMessage(
        {
          id: "demo.load-demo-questions.success",
          defaultMessage:
            "Successfully loaded {count} demo questions. You can now start a new drill.",
        },
        {
          count: questions.length,
        },
      ),
      variant: "success",
    });

    await saveQuestions(questions);
  };
};
