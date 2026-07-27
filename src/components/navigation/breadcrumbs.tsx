import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

/** Accessible breadcrumb trail used by every non-landing layout. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label + i} className="flex items-center gap-1.5">
              {i > 0 ? <ChevronRight className="h-3 w-3 opacity-60" aria-hidden /> : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}