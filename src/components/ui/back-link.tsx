import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function BackLink({
  to,
  label,
  params,
}: {
  to: "/";
  label: string;
  params?: never;
} | {
  to: "/protocolos";
  label: string;
  params?: never;
} | {
  to: "/meridiano/$id";
  label: string;
  params: { id: string };
}) {
  return (
    <Link
      to={to}
      params={params}
      className="mb-2 inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors duration-150 ease-out hover:text-fg"
    >
      <ChevronLeft className="size-4" strokeWidth={1.75} />
      {label}
    </Link>
  );
}
