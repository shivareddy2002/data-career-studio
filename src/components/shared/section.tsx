import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Standard page section: consistent max width, rhythm and heading structure. */
export function Section({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 py-16", className)}>
      {(eyebrow || title || description || actions) && (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <div className="text-xs font-medium uppercase tracking-widest text-primary">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}