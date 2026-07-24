import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Data Career Studio" },
      { name: "description", content: "Tutorials, career advice, AI, ML, SQL, Python, Snowflake, Databricks, Spark, Power BI, industry news and original research." },
      { property: "og:title", content: "Blog — Data Career Studio" },
      { property: "og:description", content: "Fresh writing from working data & AI practitioners." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Blog"
        title="Writing from working data & AI practitioners."
        description="Tutorials, career playbooks, deep dives on the modern data stack and analysis of what's changing in AI."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted-foreground">
        Content coming online with Part 4 (Landing) and Part 7 (Learning Platform).
      </section>
    </PageShell>
  );
}