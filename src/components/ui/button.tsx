import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  asChild?: boolean;
  static?: boolean;
};

export function Button({
  className,
  variant = "primary",
  asChild,
  static: isStatic,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium",
        "transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        !isStatic && "active:not-disabled:scale-[0.96]",
        variant === "primary" && "bg-primary text-primary-fg",
        variant === "ghost" && "bg-transparent text-muted hover:text-fg",
        variant === "outline" && "border border-border bg-surface text-fg",
        className,
      )}
      {...props}
    />
  );
}
