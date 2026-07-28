import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PillarHero } from "@/components/site/page-shell";
import { Section } from "@/components/shared/section";
import { getCourse } from "@/data/courses";

export const Route = createFileRoute("/learn_/courses/$courseSlug")({
  loader: ({ params }) => {
    const course = getCourse(params.courseSlug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Course not found — Data Career Studio" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.course.title} — Data Career Studio`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.course.subtitle },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.course.subtitle },
      ],
    };
  },
  notFoundComponent: () => (
    <MarketingLayout>
      <Section title="Course not found">
        <Link to="/learn" className="text-primary">← Back to Learn</Link>
      </Section>
    </MarketingLayout>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { courseSlug } = Route.useParams();
  const course = getCourse(courseSlug)!;

  return (
    <MarketingLayout>
      <PillarHero
        eyebrow={`Course · ${course.level} · ${course.hours} hours`}
        title={course.title}
        description={course.subtitle}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn", to: "/learn" }, { label: course.title }]}
      />

      <Section title="Overview" description={course.overview}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Learning objectives</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {course.objectives.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Prerequisites</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {course.prerequisites.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Curriculum">
        <div className="space-y-4">
          {course.modules.map((m, mi) => (
            <div key={m.slug} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary">
                    Module {mi + 1} · {m.difficulty}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.objectives.map((o) => (
                  <span key={o} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{o}</span>
                ))}
              </div>
              <ul className="mt-5 divide-y divide-border/60 border-t border-border/60">
                {m.lessons.map((l) => (
                  <li key={l.slug}>
                    <Link
                      to="/learn/courses/$courseSlug/$lessonSlug"
                      params={{ courseSlug: course.slug, lessonSlug: l.slug }}
                      className="flex items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-primary"
                    >
                      <span>{l.title}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{l.minutes} min</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Capstone project" description={course.capstone.problem}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="font-semibold">{course.capstone.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{course.capstone.dataset}</p>
            <h4 className="mt-5 text-xs uppercase tracking-widest text-primary">Requirements</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {course.capstone.requirements.map((r) => <li key={r}>{r}</li>)}
            </ul>
            <h4 className="mt-5 text-xs uppercase tracking-widest text-primary">Architecture</h4>
            <p className="mt-2 text-sm text-muted-foreground">{course.capstone.architecture.join(" → ")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h4 className="text-xs uppercase tracking-widest text-primary">Deliverables</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {course.capstone.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <h4 className="mt-5 text-xs uppercase tracking-widest text-primary">Resume bullet points</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {course.capstone.resumeBullets.map((b) => <li key={b}>“{b}”</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Interview questions">
        <div className="grid gap-4 md:grid-cols-2">
          {course.interviewQuestions.map((q) => (
            <div key={q.q} className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="font-medium">{q.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{q.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certificate">
        <div className="rounded-2xl border border-border bg-gradient-card p-6">
          <h3 className="font-semibold">{course.certificate.title}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {course.certificate.criteria.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </Section>
    </MarketingLayout>
  );
}