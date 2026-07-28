import { useState } from "react";
import { Lightbulb, FlaskConical, AlertTriangle } from "lucide-react";
import type { Lesson } from "@/data/learning-types";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./code-block";

type Lab = NonNullable<Lesson["lab"]>;

export function CodeLab({ lab }: { lab: Lab }) {
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6">
      <div className="flex items-center gap-2">
        <FlaskConical className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
          Interactive lab
        </h3>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{lab.instructions}</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Starter code
          </div>
          <CodeBlock code={lab.starter} language={lab.language} />
        </div>
        <div>
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Checks that must pass
          </div>
          <ul className="space-y-2 rounded-xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
            {lab.tests.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={hintsShown >= lab.hints.length}
          onClick={() => setHintsShown((n) => n + 1)}
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          {hintsShown === 0 ? "Show a hint" : `Next hint (${hintsShown}/${lab.hints.length})`}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setShowSolution((s) => !s)}>
          {showSolution ? "Hide solution" : "Reveal solution"}
        </Button>
      </div>

      {hintsShown > 0 ? (
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {lab.hints.slice(0, hintsShown).map((h, i) => (
            <li key={h} className="rounded-lg border border-border/60 bg-secondary/30 px-4 py-2">
              <span className="mr-2 text-primary">Hint {i + 1}</span>
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      {showSolution ? (
        <div className="mt-6">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Reference solution
          </div>
          <CodeBlock code={lab.solution} language={lab.language} />
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-border/60 bg-secondary/20 p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5" /> Common mistakes
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {lab.mistakes.map((m) => (
            <li key={m} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-destructive/70" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}