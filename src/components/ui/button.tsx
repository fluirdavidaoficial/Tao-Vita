import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition",
        variant === "primary" && "bg-primary text-primary-fg",
        variant === "ghost" && "bg-transparent text-muted",
        variant === "outline" && "border border-border bg-surface text-fg",
        className,
      )}
      {...props}
    />
  );
}
