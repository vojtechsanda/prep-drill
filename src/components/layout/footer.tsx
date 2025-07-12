import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-center", className)}>
      Made with 💖 by{" "}
      <Link to="https://vojtechsanda.cz" className="underline" target="_blank">
        Vojtěch Šanda
      </Link>
    </p>
  );
}
