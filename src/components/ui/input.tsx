import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 border-2 border-[#0b0c0c] bg-white px-3 py-1 text-sm text-[#0b0c0c] outline-none placeholder:text-[#505a5f] transition-colors focus:border-[#1d70b8] disabled:cursor-not-allowed disabled:bg-[#f3f2f1] disabled:opacity-70 aria-invalid:border-[#d4351c] file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  );
}

export { Input };
