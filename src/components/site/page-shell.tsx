import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PillarHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-hero">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>›</span>}
              <span className={i === breadcrumbs.length - 1 ? "text-foreground" : ""}>{b.label}</span>
            </span>
          ))}
        </nav>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </div>
        <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}