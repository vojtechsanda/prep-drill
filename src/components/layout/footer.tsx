import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-center", className)}>
      Made with 💖 in Czech Republic
    </p>
  );
}
