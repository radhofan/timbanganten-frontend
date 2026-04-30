import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none relative active:top-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-[#1d70b8] text-white shadow-[0_2px_0_#003078] hover:bg-[#003078] hover:shadow-[0_2px_0_#001f55]",
        destructive: "bg-[#d4351c] text-white shadow-[0_2px_0_#55130b] hover:bg-[#aa2a13] hover:shadow-[0_2px_0_#3d0e08]",
        outline: "bg-[#f3f2f1] text-[#0b0c0c] shadow-[0_2px_0_#929191] hover:bg-[#dbdad9] hover:shadow-[0_2px_0_#6f6f6f]",
        secondary: "bg-[#f3f2f1] text-[#0b0c0c] shadow-[0_2px_0_#929191] hover:bg-[#dbdad9]",
        ghost: "bg-transparent text-[#0b0c0c] shadow-none hover:bg-[#f3f2f1]",
        link: "text-[#1d70b8] underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "px-4 pt-2 pb-1.5 has-[>svg]:px-3",
        sm: "gap-1.5 px-3 pt-1.5 pb-1 has-[>svg]:px-2.5 text-xs",
        lg: "px-6 pt-2.5 pb-2 has-[>svg]:px-4 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
