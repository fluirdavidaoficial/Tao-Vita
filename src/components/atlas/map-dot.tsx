import { cn } from "@/lib/utils";

export function MapDot({
  x,
  y,
  label,
  tone = "primary",
  onClick,
  active,
}: {
  x: number;
  y: number;
  label: string;
  tone?: "primary" | "ear" | "ynsa";
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute z-10 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
    >
      <span
        className={cn(
          "size-4 rounded-full border-2 border-primary-fg shadow",
          tone === "primary" && "bg-primary",
          tone === "ear" && "bg-ear",
          tone === "ynsa" && "bg-ynsa",
          active && "size-5 ring-2 ring-fg",
        )}
      />
      {active && (
        <span className="mt-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-fg">
          {label}
        </span>
      )}
    </button>
  );
}
