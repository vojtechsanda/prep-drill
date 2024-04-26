import React, { HTMLProps, PropsWithChildren } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Form as _Form } from "@/components/ui/form";

type FormProps<T extends FieldValues> = PropsWithChildren<{
  form: ReturnType<typeof useForm<T>>;
  onSubmit: (values: T) => void;
}> &
  Omit<HTMLProps<HTMLFormElement>, "onSubmit" | "form">;

function FormRefForwardable<T extends FieldValues>(
  { form, onSubmit, children, ...props }: FormProps<T>,
  ref: React.Ref<HTMLFormElement>,
) {
  return (
    <_Form {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)} ref={ref}>
        {children}
      </form>
    </_Form>
  );
}

export const Form = React.forwardRef(FormRefForwardable) as <
  T extends FieldValues,
>(
  props: FormProps<T> & { ref?: React.Ref<HTMLFormElement> },
) => JSX.Element;
