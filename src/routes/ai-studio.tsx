import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PillarHero } from "@/components/site/page-shell";
import { AiChat } from "@/components/ai/ai-chat";
import { AI_AGENTS, getAiAgent } from "@/data/ai-agents";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ai-studio")({
  head: () => ({
    meta: [
      { title: "AI Studio — Data Career Studio" },
      { name: "description", content: "AI tutor, resume reviewer, mock interviewer, career coach, code reviewer, quiz generator and learning analytics — all in one AI-first studio." },
      { property: "og:title", content: "AI Studio — Data Career Studio" },
      { property: "og:description", content: "Your AI mentor across learning, building and hiring." },
    ],
  }),
  component: AIStudioPage,
});

const CATEGORIES = ["Learning", "Career", "Building", "Intelligence"] as const;

function AIStudioPage() {
  const search = getAiAgent("concept-search")!;
  return (
    <MarketingLayout>
      <PillarHero
        eyebrow="AI Studio"
        title="An AI mentor for every step of your career."
        description="A suite of AI tools that adapt to you: tutor when you learn, reviewer when you build, coach when you interview."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "AI Studio" }]}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ask AI anything</h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Start here for orientation: what to learn, in what order, and which proof of skill
              matters for the role you want. Every agent below is specialised for one job.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {AI_AGENTS.slice(0, 4).map((agent) => (
                <Link
                  key={agent.id}
                  to="/ai-studio/$agentId"
                  params={{ agentId: agent.id }}
                  className="group rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="text-sm font-semibold">{agent.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{agent.tagline}</div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                    Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <AiChat agent={search} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {CATEGORIES.map((category) => (
          <div key={category} className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-lg font-semibold tracking-tight">{category}</h2>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {AI_AGENTS.filter((agent) => agent.category === category).map((agent) => (
                <Reveal key={agent.id}>
                  <Link
                    to="/ai-studio/$agentId"
                    params={{ agentId: agent.id }}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/40"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="mt-4 text-base font-semibold">{agent.name}</div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{agent.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary">
                      Launch agent{" "}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </MarketingLayout>
  );
}