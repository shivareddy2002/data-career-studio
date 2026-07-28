import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";
import { ArrowRight } from "lucide-react";
import { LEARNING_PATHS } from "@/data/learning-paths";
import { COURSES } from "@/data/courses";

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
          {LEARNING_PATHS.map((p) => (
            <Link
              key={p.slug}
              to="/learn/paths/$pathSlug"
              params={{ pathSlug: p.slug }}
              className="group rounded-2xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/50 hover:shadow-elegant"
            >
              <div className="text-xs uppercase tracking-wider text-primary">
                {p.difficulty} · {p.duration}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                View path <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">Courses</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {COURSES.map((c) => (
            <Link
              key={c.slug}
              to="/learn/courses/$courseSlug"
              params={{ courseSlug: c.slug }}
              className="rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-primary/50 hover:shadow-elegant"
            >
              <div className="text-xs uppercase tracking-wider text-primary">
                {c.level} · {c.hours} hours · {c.modules.length} modules
              </div>
              <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">Explore Learn</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {SUBSECTIONS.map((s) => (
            <div key={s} className="rounded-xl border border-border bg-card/40 p-4 text-sm">{s}</div>
          ))}
        </div>

      </section>
    </PageShell>
  );
}