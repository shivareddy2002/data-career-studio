import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Data Career Studio" },
      { name: "description", content: "PDF notes, cheat sheets, mind maps, datasets, SQL/Python scripts, notebooks, Power BI files, templates and architecture diagrams." },
      { property: "og:title", content: "Resources — Data Career Studio" },
      { property: "og:description", content: "A curated library of downloadable resources." },
    ],
  }),
  component: ResourcesPage,
});

const CATS = ["PDF Notes", "Cheat Sheets", "Mind Maps", "Datasets", "SQL Scripts", "Python Scripts", "Snowflake Scripts", "Databricks Notebooks", "Power BI Files", "Templates", "Presentations", "Architecture Diagrams", "Whitepapers"];

function ResourcesPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Resources"
        title="The reference library you'll actually use."
        description="Downloadable notes, cheat sheets, datasets, scripts and templates — curated for practitioners, not lurkers."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATS.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-gradient-card p-5 text-sm">{c}</div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}