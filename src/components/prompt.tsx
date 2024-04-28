import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, ReactNode, useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { z } from "zod";

import {
  Dialog,
  DialogContentPrompt,
  DialogContentPromptProps,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

type PromptProps<T extends FieldValues> = PropsWithChildren<{
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  defaultValues?: DefaultValues<T>;
  schema: z.ZodSchema<T>;
  content: (form: ReturnType<typeof useForm<T>>) => ReactNode;
  submitButtonContent?: ReactNode;
}> &
  Omit<DialogContentPromptProps<T>, "form" | "content">;

export function Prompt<T extends FieldValues>({
  content,
  title,
  description,
  actions,
  children,
  className,
  defaultValues,
  schema,
  onSubmit,
  submitButtonContent,
  ...props
}: PromptProps<T>) {
  const intl = useIntl();

  const form = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const [state, setState] = useState({
    open: false,
    loading: false,
  });

  const handleSubmit = async (data: T) => {
    setState((prev) => ({ ...prev, loading: true }));
    await onSubmit(data);
    setState((prev) => ({ ...prev, open: false, loading: false }));
  };

  return (
    <Dialog
      open={state.open}
      onOpenChange={(val) => {
        form.reset();
        setState((prev) => ({ ...prev, open: val }));
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentPrompt
        className={cn("sm:max-w-md max-w-xs", className)}
        form={form}
        onSubmit={handleSubmit}
        {...props}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {content(form)}

        <DialogFooter>
          {actions}
          <Button type="submit" disabled={state.loading}>
            {submitButtonContent ||
              intl.formatMessage({
                id: "prompt.submit",
                defaultMessage: "Submit",
              })}
          </Button>
        </DialogFooter>
      </DialogContentPrompt>
    </Dialog>
  );
}
