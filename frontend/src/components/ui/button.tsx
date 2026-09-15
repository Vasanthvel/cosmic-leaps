import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variantClasses = {
  primary:
    "bg-[#1E2A5A] text-white shadow-sm ring-1 ring-[#1E2A5A]/10 transition-all duration-300 hover:bg-[#43A047] hover:shadow-md focus-visible:ring-[#1E2A5A]",

  secondary:
    "bg-[#111827] text-white hover:bg-[#1E2A5A] focus-visible:ring-[#1E2A5A]",

  outline:
    "border border-[#E5E7EB] bg-white text-[#1E2A5A] hover:bg-[#F8FAFC] hover:border-[#D1D5DB] focus-visible:ring-[#1E2A5A]",

  ghost:
    "bg-transparent text-[#1E2A5A] hover:bg-[#F8FAFC] focus-visible:ring-[#1E2A5A]",
};

const sizeClasses = {
  sm: "h-9 px-4 text-sm",

  md: "h-11 px-6 text-sm",

  lg: "h-12 px-8 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...(!asChild && { type })}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";