import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build — Data Career Studio" },
      { name: "description", content: "Portfolio-ready data & AI projects with architecture, documentation, GitHub integration and deployment guides." },
      { property: "og:title", content: "Build — Data Career Studio" },
      { property: "og:description", content: "Real-world projects that get you hired." },
    ],
  }),
  component: BuildPage,
});

const CATS = [
  { t: "Beginner Projects", d: "Foundational projects to cement the basics." },
  { t: "Intermediate Projects", d: "End-to-end pipelines and dashboards." },
  { t: "Advanced Projects", d: "Production-grade systems with monitoring & tests." },
  { t: "Industry Projects", d: "Domain challenges from fintech, retail, healthcare." },
  { t: "Capstone Projects", d: "Multi-week showcases for your portfolio." },
  { t: "Portfolio Builder", d: "Convert projects into shareable case studies." },
  { t: "GitHub Integration", d: "Auto-scaffold repos with docs and CI." },
  { t: "Architecture Library", d: "Reference architectures across the data stack." },
];

function BuildPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Build"
        title="Ship real projects. Own a real portfolio."
        description="Every project ships with architecture, dataset, code, docs, deployment guide, interview questions and a résumé-ready summary."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Build" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CATS.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-gradient-card p-6">
              <h3 className="text-base font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}