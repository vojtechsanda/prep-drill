import { FieldValues, Path, useForm } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";

type FileFormField<T extends FieldValues> = Omit<
  InputProps,
  "name" | "form" | "label"
> & {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>;
  label?: string;
};

export function FileFormField<T extends FieldValues>({
  form,
  name,
  label,
  className,
  ...props
}: FileFormField<T>) {
  const fileRef = form.register(name, { required: true });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type="file" {...props} {...fileRef} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
