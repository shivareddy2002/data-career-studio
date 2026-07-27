import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";

/** @deprecated Use <MarketingLayout /> directly in new code. */
export const PageShell = MarketingLayout;

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
        <Breadcrumbs items={breadcrumbs} />
        <Reveal>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}