import { PropsWithChildren } from "react";

export function OptionsSection({
  children,
  label,
}: PropsWithChildren<{ label: string }>) {
  return (
    <div className="space-x-2">
      <h2 className="mb-2 text-base font-semibold">{label}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
