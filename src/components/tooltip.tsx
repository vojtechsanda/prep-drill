import { PropsWithChildren } from "react";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as _Tooltip,
} from "@/components/ui/tooltip";

type TooltipProp = PropsWithChildren<{
  content: string;
}>;

export function Tooltip({ content, children }: TooltipProp) {
  return (
    <TooltipProvider delayDuration={200}>
      <_Tooltip>
        <TooltipTrigger tabIndex={0} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </_Tooltip>
    </TooltipProvider>
  );
}
