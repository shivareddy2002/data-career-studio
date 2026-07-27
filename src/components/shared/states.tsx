import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Reusable empty state — every list/route should use this instead of ad-hoc markup. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-4 text-muted-foreground">{icon}</div> : null}
      <h3 className="text-base font-medium">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/** Route/section level error UI with a recovery action. */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this section. Try again in a moment.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="rounded-xl border border-destructive/40 bg-card/40 p-8 text-center">
      <h3 className="text-base font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button className="mt-6" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

/** Skeleton grid used as the default loading UI for card lists. */
export function LoadingGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)} aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-gradient-card p-5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}