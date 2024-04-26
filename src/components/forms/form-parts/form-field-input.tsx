"use client";

import { FieldValues, Path, useForm } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";

type FormFieldInput<T extends FieldValues> = Omit<
  InputProps,
  "name" | "form" | "label"
> & {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>;
  label?: string;
};

export function FormFieldInput<T extends FieldValues>({
  form,
  name,
  label,
  ...props
}: FormFieldInput<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
