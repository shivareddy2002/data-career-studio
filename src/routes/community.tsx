import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Flame, Sparkles, Trophy } from "lucide-react";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PillarHero } from "@/components/site/page-shell";
import { Reveal } from "@/components/motion/reveal";
import {
  AI_ASSISTANT_ACTIONS,
  COMMUNITY_SECTIONS,
  COMMUNITY_STATS,
  GROWTH_JOURNEY,
  TOP_CONTRIBUTORS,
  TRENDING_DISCUSSIONS,
  UPCOMING_EVENTS,
} from "@/data/community";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Forums, Mentors & Hackathons" },
      { name: "description", content: "An AI-powered professional network for data pros: forums, Q&A, study groups, live rooms, mentors, creators, events, hackathons and a shared knowledge base." },
      { property: "og:title", content: "Community — Data Career Studio" },
      { property: "og:description", content: "Learn together, build together, mentor others and grow your professional reputation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <MarketingLayout>
      <PillarHero
        eyebrow="Community"
        title="Learn together. Grow faster."
        description="A professional network built around learning: forums and Q&A, study groups and live rooms, mentors, creators, hackathons and a community knowledge base — all AI-assisted."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Community" }]}
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs text-primary">{s.delta}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-2xl font-semibold tracking-tight">Explore the community</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_SECTIONS.map((s) => (
            <Link
              key={s.slug}
              to="/community/$sectionSlug"
              params={{ sectionSlug: s.slug }}
              className="group rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-primary/50 hover:shadow-elegant"
            >
              <div className="text-xs uppercase tracking-wider text-primary">{s.eyebrow}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <Flame className="h-5 w-5 text-primary" /> Trending discussions
          </h2>
          <ul className="mt-6 space-y-3">
            {TRENDING_DISCUSSIONS.map((d) => (
              <li key={d.title} className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border px-2 py-0.5 uppercase tracking-widest text-primary">
                    {d.tag}
                  </span>
                  <span>{d.author}</span>
                  <span>{d.replies} replies</span>
                  <span>{d.votes} votes</span>
                </div>
                <p className="mt-3 font-medium leading-snug">{d.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-gradient-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <Trophy className="h-4 w-4" /> Top contributors
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {TOP_CONTRIBUTORS.map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs text-primary">{c.badge}</div>
                    <div className="text-xs text-muted-foreground">{c.reputation.toLocaleString()} rep</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <CalendarDays className="h-4 w-4" /> Upcoming
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {UPCOMING_EVENTS.map((e) => (
                <li key={e.title}>
                  <div className="font-medium leading-snug">{e.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {e.type} · {e.when} · {e.seats}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Reveal>
          <div className="rounded-2xl border border-border bg-gradient-card p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <Sparkles className="h-5 w-5 text-primary" /> AI community assistant
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              The assistant works quietly across every surface — summarising threads, routing questions to
              the right experts and keeping the knowledge base current.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {AI_ASSISTANT_ACTIONS.map((a) => (
                <div key={a} className="rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-sm text-muted-foreground">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-2xl font-semibold tracking-tight">Professional growth journey</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Reputation, badges and visibility compound at every stage — from first answer to thought leader.
        </p>
        <ol className="mt-8 flex flex-wrap gap-3">
          {GROWTH_JOURNEY.map((stage, i) => (
            <li
              key={stage}
              className="flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm"
            >
              <span className="text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              {stage}
            </li>
          ))}
        </ol>
      </section>
    </MarketingLayout>
  );
}