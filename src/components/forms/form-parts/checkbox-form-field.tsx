"use client";

import { FieldValues, Path, useForm } from "react-hook-form";

import { Checkbox, CheckboxProps } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type CheckboxFormField<T extends FieldValues> = Omit<
  CheckboxProps,
  "name" | "form" | "label"
> & {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>;
  label?: string;
};

export function CheckboxFormField<T extends FieldValues>({
  form,
  name,
  label,
  className,
  ...props
}: CheckboxFormField<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(
              "flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md",
              props.disabled ? "cursor-default" : "cursor-pointer",
              className,
            )}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
            </FormControl>
            <span>{label}</span>
          </FormLabel>
        </FormItem>
      )}
    />
  );
}
