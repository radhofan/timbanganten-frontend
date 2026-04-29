import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-16 border-2 border-[#0b0c0c] bg-white px-3 py-2 text-sm text-[#0b0c0c] outline-none placeholder:text-[#505a5f] transition-colors focus:border-[#1d70b8] disabled:cursor-not-allowed disabled:bg-[#f3f2f1] disabled:opacity-70 field-sizing-content aria-invalid:border-[#d4351c]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
