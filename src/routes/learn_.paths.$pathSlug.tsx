import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PillarHero } from "@/components/site/page-shell";
import { Section } from "@/components/shared/section";
import { getPath } from "@/data/learning-paths";
import { coursesForPath } from "@/data/courses";

export const Route = createFileRoute("/learn_/paths/$pathSlug")({
  loader: ({ params }) => {
    const path = getPath(params.pathSlug);
    if (!path) throw notFound();
    return { path };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Path not found — Data Career Studio" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.path.title} learning path — Data Career Studio`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.path.tagline },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.path.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <MarketingLayout>
      <Section title="Learning path not found" description="Browse all paths instead.">
        <Link to="/learn" className="text-primary">← All learning paths</Link>
      </Section>
    </MarketingLayout>
  ),
  component: PathPage,
});

function PathPage() {
  const { pathSlug } = Route.useParams();
  const path = getPath(pathSlug)!;
  const courses = coursesForPath(path.slug);

  return (
    <MarketingLayout>
      <PillarHero
        eyebrow={`${path.difficulty} · ${path.duration}`}
        title={path.title}
        description={path.tagline}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn", to: "/learn" }, { label: path.title }]}
      />

      <Section title="Roadmap" description={path.audience}>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {path.roadmap.map((stage, i) => (
            <li key={stage.stage} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="text-xs uppercase tracking-widest text-primary">
                {String(i + 1).padStart(2, "0")} · {stage.stage}
              </div>
              <h3 className="mt-3 font-semibold">{stage.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {stage.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Courses in this path">
        {courses.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((c) => (
              <Link
                key={c.slug}
                to="/learn/courses/$courseSlug"
                params={{ courseSlug: c.slug }}
                className="rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-primary/50 hover:shadow-elegant"
              >
                <div className="text-xs uppercase tracking-widest text-primary">{c.level} · {c.hours}h</div>
                <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Courses for this path are being authored.</p>
        )}
      </Section>

      <Section title="What you graduate with">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Skills", items: path.skills },
            { title: "Projects", items: path.projects },
            { title: "Certifications", items: path.certifications },
            { title: "Interview preparation", items: path.interviewPrep },
            { title: "Career outcomes", items: path.outcomes },
            { title: "Hiring companies", items: path.companies },
          ].map((block) => (
            <div key={block.title} className="rounded-2xl border border-border bg-card/40 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">{block.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {block.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-gradient-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Salary insights</h3>
          <p className="mt-2 text-xs text-muted-foreground">{path.salary.region}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["Entry", path.salary.entry],
              ["Mid", path.salary.mid],
              ["Senior", path.salary.senior],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                <div className="mt-1 text-xl font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}