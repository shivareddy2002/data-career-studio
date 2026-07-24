import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";
import { Bot } from "lucide-react";

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

const TOOLS = [
  "AI Tutor", "AI Resume Reviewer", "AI Mock Interview", "AI Career Coach",
  "AI Learning Planner", "AI Roadmap Generator", "AI Code Reviewer",
  "AI Documentation Writer", "AI Project Generator", "AI Quiz Generator",
  "AI Flashcard Generator", "AI Blog Assistant", "AI Study Planner", "AI Learning Analytics",
];

function AIStudioPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="AI Studio"
        title="An AI mentor for every step of your career."
        description="A suite of AI tools that adapt to you: tutor when you learn, reviewer when you build, coach when you interview."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "AI Studio" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <div key={t} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="mt-4 text-base font-semibold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">Powered by Lovable AI Gateway.</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}