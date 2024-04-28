import { FileUp } from "lucide-react";
import { useIntl } from "react-intl";

import { Prompt } from "@/components";
import { FileFormField } from "@/components/forms/form-parts";
import { Button } from "@/components/ui/button";
import { useImportQuestionsSchema } from "@/schemas/import-questions-schema";

export function ImportQuestionsPrompt() {
  const intl = useIntl();

  const importQuestionsSchema = useImportQuestionsSchema();

  const defaultValues = {
    questions: undefined,
  };

  return (
    <Prompt
      defaultValues={defaultValues}
      schema={importQuestionsSchema}
      title={intl.formatMessage({
        id: "import-questions.title",
        defaultMessage: "Import questions",
      })}
      description={intl.formatMessage({
        id: "import-questions.description",
        defaultMessage:
          "When you import new questions, the existing ones will be replaced with the new ones.",
      })}
      onSubmit={console.log}
      content={(form) => (
        <div className="flex items-center w-full space-x-2">
          <FileFormField
            form={form}
            name="questions"
            label={intl.formatMessage({
              id: "import-questions.file",
              defaultMessage: "Questions file",
            })}
            className="w-full"
            accept=".txt"
          />
        </div>
      )}
      submitButtonContent={
        <>
          <FileUp />
          {intl.formatMessage({
            id: "import-questions.submit",
            defaultMessage: "Import",
          })}
        </>
      }
    >
      <Button>
        <FileUp />
        {intl.formatMessage({
          id: "import-questions.trigger",
          defaultMessage: "Import questions",
        })}
      </Button>
    </Prompt>
  );
}
