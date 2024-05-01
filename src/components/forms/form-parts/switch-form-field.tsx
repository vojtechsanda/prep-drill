import { FieldValues, Path, useForm } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch, SwitchProps } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type FormFieldInput<T extends FieldValues> = Omit<
  SwitchProps,
  "name" | "form" | "label"
> & {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>;
  label?: string;
};

export function SwitchFormField<T extends FieldValues>({
  form,
  name,
  label,
  className,
  ...props
}: FormFieldInput<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-0">
          <div className={cn("flex items-center gap-2", className)}>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
            </FormControl>
            {label && (
              <FormLabel className="!mt-0 text-base font-normal cursor-pointer">
                {label}
              </FormLabel>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
