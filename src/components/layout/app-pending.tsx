import { Skeleton } from "@/components/ui/skeleton";

export function AppPendingComponent() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando</span>
      <Skeleton className="h-9 w-44 rounded-lg" />
      <Skeleton className="h-4 w-64 max-w-full rounded-md" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    </div>
  );
}
