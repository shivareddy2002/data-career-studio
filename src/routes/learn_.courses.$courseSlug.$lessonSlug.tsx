import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft } from "lucide-react";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/learning/code-block";
import { CodeLab } from "@/components/learning/code-lab";
import { Quiz } from "@/components/learning/quiz";
import { AiTutorPanel } from "@/components/learning/ai-tutor-panel";
import { findLesson } from "@/data/courses";
import { lessonKey, useProgressStore } from "@/stores/progress-store";

export const Route = createFileRoute("/learn_/courses/$courseSlug/$lessonSlug")({
  loader: ({ params }) => {
    const found = findLesson(params.courseSlug, params.lessonSlug);
    if (!found) throw notFound();
    return { title: found.lesson.title, intro: found.lesson.intro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Lesson not found — Data Career Studio" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.title} — Data Career Studio`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.intro },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.intro },
      ],
    };
  },
  notFoundComponent: () => (
    <MarketingLayout>
      <Section title="Lesson not found">
        <Link to="/learn" className="text-primary">← Back to Learn</Link>
      </Section>
    </MarketingLayout>
  ),
  component: LessonPage,
});

function LessonPage() {
  const { courseSlug, lessonSlug } = Route.useParams();
  const data = findLesson(courseSlug, lessonSlug)!;
  const { course, module, lesson, prev, next, index, total } = data;
  const key = lessonKey(course.slug, lesson.slug);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const completed = useProgressStore((s) => Boolean(s.completed[key]));
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const uncompleteLesson = useProgressStore((s) => s.uncompleteLesson);
  const recordQuiz = useProgressStore((s) => s.recordQuiz);
  const isDone = mounted && completed;

  return (
    <MarketingLayout>
      <div className="border-b border-border/60 bg-hero">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Breadcrumbs
            items={[
              { label: "Learn", to: "/learn" },
              { label: course.title },
              { label: module.title },
              { label: lesson.title },
            ]}
          />
          <div className="mt-6 text-xs uppercase tracking-widest text-primary">
            Lesson {index + 1} of {total} · {lesson.difficulty} · {lesson.minutes} min
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{lesson.title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{lesson.intro}</p>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="min-w-0 space-y-12">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Learning outcomes</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {lesson.outcomes.map((o) => (
                <li key={o} className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{o}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-8">
            {lesson.theory.map((t) => (
              <div key={t.heading}>
                <h3 className="text-xl font-semibold tracking-tight">{t.heading}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </section>

          {lesson.diagram ? (
            <section className="rounded-2xl border border-border bg-gradient-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">{lesson.diagram.title}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                {lesson.diagram.steps.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="rounded-lg border border-border bg-card/60 px-3 py-1.5">{s}</span>
                    {i < lesson.diagram!.steps.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <section className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Worked examples</h2>
            {lesson.examples.map((e) => (
              <div key={e.title}>
                <h3 className="font-medium">{e.title}</h3>
                <CodeBlock className="mt-3" code={e.code} language={e.language} />
                <p className="mt-3 text-sm text-muted-foreground">{e.explanation}</p>
              </div>
            ))}
          </section>

          {lesson.lab ? <CodeLab lab={lesson.lab} /> : null}

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Knowledge check</h2>
            <div className="mt-6">
              <Quiz questions={lesson.quiz} onSubmit={(c, t) => recordQuiz(key, c, t)} />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card/40 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Assignment</h2>
            <h3 className="mt-3 font-semibold">{lesson.assignment.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{lesson.assignment.brief}</p>
            <h4 className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">Rubric</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {lesson.assignment.rubric.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>

          <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Why this matters for your career</h2>
            <p className="mt-3 text-sm text-muted-foreground">{lesson.careerLink}</p>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            {prev ? (
              <Link
                to="/learn/courses/$courseSlug/$lessonSlug"
                params={{ courseSlug: course.slug, lessonSlug: prev.lesson.slug }}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> {prev.lesson.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to="/learn/courses/$courseSlug/$lessonSlug"
                params={{ courseSlug: course.slug, lessonSlug: next.lesson.slug }}
                className="inline-flex items-center gap-2 text-sm text-primary"
              >
                Next: {next.lesson.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/learn/courses/$courseSlug" params={{ courseSlug: course.slug }} className="text-sm text-primary">
                Finish with the capstone →
              </Link>
            )}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Button
            className="w-full"
            variant={isDone ? "secondary" : "default"}
            onClick={() => (isDone ? uncompleteLesson(key) : completeLesson(key))}
          >
            {isDone ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
            {isDone ? "Completed" : "Mark as complete (+50 XP)"}
          </Button>

          <AiTutorPanel lesson={lesson} />

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Key points</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {lesson.keyPoints.map((k) => <li key={k}>{k}</li>)}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Cheat sheet</h3>
            <dl className="mt-3 space-y-3 text-sm">
              {lesson.cheatsheet.map((c) => (
                <div key={c.term}>
                  <dt className="font-mono text-foreground">{c.term}</dt>
                  <dd className="text-muted-foreground">{c.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">In this module</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {module.lessons.map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/learn/courses/$courseSlug/$lessonSlug"
                    params={{ courseSlug: course.slug, lessonSlug: l.slug }}
                    className={l.slug === lesson.slug ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </MarketingLayout>
  );
}