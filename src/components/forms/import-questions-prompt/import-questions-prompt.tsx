import { FileUp } from "lucide-react";
import { PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { Prompt } from "@/components";
import { FileFormField } from "@/components/forms/form-parts";
import { Button } from "@/components/ui/button";
import { useImportQuestionsSchema } from "@/schemas";

import { useHandleSubmit } from "./hooks";

export function ImportQuestionsPrompt({
  children,
}: PropsWithChildren<unknown>) {
  const intl = useIntl();
  const importQuestionsSchema = useImportQuestionsSchema();
  const handleSubmit = useHandleSubmit();

  return (
    <Prompt
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
      onSubmit={handleSubmit}
      content={(form) => (
        <div className="flex space-x-2 flex-col">
          <FileFormField
            form={form}
            name="questions"
            label={
              <span className="inline-flex items-center gap-1">
                {intl.formatMessage({
                  id: "import-questions.file",
                  defaultMessage: "Questions file",
                })}
                <span className="text-xs">
                  (
                  <Link
                    to="https://github.com/vojtechsanda/prep-drill#question-format"
                    className="underline"
                    target="_blank"
                  >
                    {intl.formatMessage({
                      id: "import-questions.file-structure-example",
                      defaultMessage: "File structure example",
                    })}
                  </Link>
                  )
                </span>
              </span>
            }
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
      {children ?? (
        <Button>
          <FileUp />
          {intl.formatMessage({
            id: "import-questions.trigger",
            defaultMessage: "Import questions",
          })}
        </Button>
      )}
    </Prompt>
  );
}
