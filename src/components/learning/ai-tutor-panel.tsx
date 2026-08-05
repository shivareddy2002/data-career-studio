import { useState } from "react";
import { Sparkles, RotateCw } from "lucide-react";
import type { Lesson } from "@/data/learning-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AiChat } from "@/components/ai/ai-chat";
import { getAiAgent } from "@/data/ai-agents";

type TutorAction = {
  id: string;
  label: string;
  render: (lesson: Lesson) => { title: string; body: string; items?: string[] };
};

const ACTIONS: TutorAction[] = [
  {
    id: "explain",
    label: "Explain this concept",
    render: (l) => ({ title: "In one paragraph", body: l.tutor.simplify }),
  },
  {
    id: "beginner",
    label: "Explain like a beginner",
    render: (l) => ({ title: "Beginner framing", body: l.tutor.beginner }),
  },
  {
    id: "interview",
    label: "Explain like an interview",
    render: (l) => ({ title: "How to answer in an interview", body: l.tutor.interview }),
  },
  {
    id: "analogy",
    label: "Give me an analogy",
    render: (l) => ({ title: "Analogy", body: l.tutor.analogy }),
  },
  {
    id: "examples",
    label: "Generate examples",
    render: (l) => ({
      title: "Worked examples",
      body: l.tutor.realWorld,
      items: l.examples.map((e) => `${e.title} — ${e.explanation}`),
    }),
  },
  {
    id: "summarise",
    label: "Summarise the lesson",
    render: (l) => ({ title: "Summary", body: l.intro, items: l.keyPoints }),
  },
  {
    id: "flashcards",
    label: "Generate flashcards",
    render: (l) => ({
      title: "Flashcards",
      body: "Review these until each answer is automatic.",
      items: l.flashcards.map((f) => `${f.q} → ${f.a}`),
    }),
  },
  {
    id: "mistakes",
    label: "Common mistakes",
    render: (l) => ({
      title: "What learners get wrong",
      body: "Check your own work against these before submitting.",
      items: l.lab?.mistakes ?? l.keyPoints,
    }),
  },
];

export function AiTutorPanel({ lesson }: { lesson: Lesson }) {
  const [activeId, setActiveId] = useState<string>("explain");
  const [chatOpen, setChatOpen] = useState(false);
  const active = ACTIONS.find((a) => a.id === activeId) ?? ACTIONS[0];
  const result = active.render(lesson);
  const tutor = getAiAgent("tutor")!;
  const lessonContext = [
    `Lesson: ${lesson.title}`,
    lesson.intro,
    `Key points: ${lesson.keyPoints.join("; ")}`,
    lesson.examples?.length
      ? `Examples: ${lesson.examples.map((e) => `${e.title} — ${e.explanation}`).join(" | ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-2xl border border-border bg-gradient-card p-6">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold">AI Tutor</h3>
          <p className="text-xs text-muted-foreground">Ask this lesson anything.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setActiveId(a.id)}
            className={cn(
              "rounded-full border border-border px-3 py-1.5 text-xs transition-colors",
              a.id === activeId
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-border/60 bg-card/50 p-5">
        <div className="text-xs font-medium uppercase tracking-widest text-primary">
          {result.title}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.body}</p>
        {result.items?.length ? (
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {result.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <RotateCw className="h-3 w-3" />
        Answers are grounded in this lesson's material.
      </div>

      <div className="mt-5">
        {chatOpen ? (
          <AiChat agent={tutor} context={lessonContext} heightClass="h-[520px]" />
        ) : (
          <Button variant="outline" className="w-full" onClick={() => setChatOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4" /> Ask the AI tutor about this lesson
          </Button>
        )}
      </div>
    </div>
  );
}