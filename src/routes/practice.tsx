import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Data Career Studio" },
      { name: "description", content: "SQL, Python, Spark, Snowflake, Databricks and Power BI practice. Labs, daily challenges, mock tests and playgrounds." },
      { property: "og:title", content: "Practice — Data Career Studio" },
      { property: "og:description", content: "Labs, challenges, mock tests and coding arena." },
    ],
  }),
  component: PracticePage,
});

const CATS = [
  "SQL", "Python", "Spark", "Snowflake", "Databricks", "Power BI",
  "AI Challenges", "Daily Challenges", "Weekly Challenges", "Mock Tests",
  "Coding Arena", "Labs", "Playground", "Flashcards", "Assessments", "Leaderboard",
];

function PracticePage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Practice"
        title="Reps that turn tutorials into muscle memory."
        description="Hands-on labs, daily coding challenges, mock tests and a live playground across every tool in the modern data stack."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Practice" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CATS.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-gradient-card p-5 transition-all hover:border-primary/50">
              <div className="text-sm font-medium">{c}</div>
              <div className="mt-1 text-xs text-muted-foreground">Interactive · Adaptive · Graded</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}