import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { AiChat } from "@/components/ai/ai-chat";
import { AI_AGENTS, getAiAgent } from "@/data/ai-agents";

export const Route = createFileRoute("/ai-studio_/$agentId")({
  loader: ({ params }) => {
    const agent = getAiAgent(params.agentId);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.agent.name ?? "AI Agent";
    const description = loaderData?.agent.description ?? "AI agents for data professionals.";
    return {
      meta: [
        { title: `${name} — AI Studio | Data Career Studio` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — AI Studio` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AgentPage,
});

function AgentPage() {
  const { agent } = Route.useLoaderData();
  const related = AI_AGENTS.filter((a) => a.id !== agent.id && a.category === agent.category);

  return (
    <MarketingLayout>
      <section className="border-b border-border/60 bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "AI Studio", to: "/ai-studio" },
              { label: agent.name },
            ]}
          />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {agent.category} · {agent.stage}
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{agent.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{agent.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <AiChat agent={agent} heightClass="h-[660px]" />

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <h2 className="text-sm font-semibold">How to get the best answers</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  Give context: your level, target role and timeline.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  Paste real material — code, bullets, job descriptions.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  Ask follow-ups; the agent keeps the whole conversation.
                </li>
              </ul>
            </div>

            {related.length ? (
              <div className="rounded-2xl border border-border bg-gradient-card p-6">
                <h2 className="text-sm font-semibold">Related agents</h2>
                <div className="mt-4 space-y-3">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      to="/ai-studio/$agentId"
                      params={{ agentId: item.id }}
                      className="block rounded-xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/40"
                    >
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{item.tagline}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </MarketingLayout>
  );
}