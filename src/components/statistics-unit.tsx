import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";

type StatisticsUnitProps = {
  type: "CORRECT" | "PARTIALLY" | "INCORRECT" | "OTHER";
  label?: string;
  count: number;
  className?: string;
};

export function StatisticsUnit({
  type,
  label,
  count,
  className,
}: StatisticsUnitProps) {
  return (
    <div className="flex items-center gap-3">
      <Badge
        variant="unset"
        className={cn(
          "w-10 flex justify-center",
          {
            "bg-success text-success-foreground": type === "CORRECT",
            "bg-warning text-warning-foreground": type === "PARTIALLY",
            "bg-destructive text-destructive-foreground": type === "INCORRECT",
            "bg-gray-200 text-black": type === "OTHER",
          },
          className,
        )}
      >
        {count}
      </Badge>
      {label && <span>{label}</span>}
    </div>
  );
}
