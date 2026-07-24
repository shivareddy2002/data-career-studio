import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Data Career Studio" },
      { name: "description", content: "Structured learning paths, courses, tutorials, and roadmaps for Data Engineering, Data Science, AI, ML, Analytics and Cloud." },
      { property: "og:title", content: "Learn — Data Career Studio" },
      { property: "og:description", content: "Learning paths, courses, tutorials, roadmaps." },
    ],
  }),
  component: LearnPage,
});

const PATHS = [
  "Data Analyst", "Data Engineer", "Data Scientist", "AI Engineer",
  "ML Engineer", "Analytics Engineer", "Cloud Engineer", "Generative AI Engineer", "LLM Engineer",
];

const SUBSECTIONS = [
  "Courses", "Tutorials", "Documentation", "Learning Roadmaps",
  "Video Library", "Notes", "Cheat Sheets", "Mind Maps", "Learning Calendar",
];

function LearnPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Learn"
        title="Master the skills employers actually hire for."
        description="Nine role-based learning paths, hundreds of hours of curated content, and adaptive roadmaps that grow with you."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Learning paths</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((p) => (
            <div key={p} className="group rounded-2xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/50 hover:shadow-elegant">
              <div className="text-xs uppercase tracking-wider text-primary">Role path</div>
              <h3 className="mt-2 text-lg font-semibold">{p}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Curriculum, projects, certifications and interview prep tailored for {p.toLowerCase()}s.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                View path <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">Explore Learn</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {SUBSECTIONS.map((s) => (
            <div key={s} className="rounded-xl border border-border bg-card/40 p-4 text-sm">{s}</div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-gradient-card p-8">
          <p className="text-sm text-muted-foreground">Coming next in Part 7 (Learning Platform)</p>
          <h3 className="mt-2 text-xl font-semibold">Full course player, module viewer, quizzes, playground, AI tutor.</h3>
          <Link to="/" className="mt-4 inline-flex text-sm text-primary">← Back to home</Link>
        </div>
      </section>
    </PageShell>
  );
}