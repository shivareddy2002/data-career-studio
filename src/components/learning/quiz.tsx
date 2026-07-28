import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/data/learning-types";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./code-block";
import { cn } from "@/lib/utils";

type Answer = number[] | boolean | undefined;

function isCorrect(q: QuizQuestion, a: Answer): boolean {
  if (q.kind === "boolean") return a === q.answer;
  if (q.kind === "multi") {
    if (!Array.isArray(a)) return false;
    const sorted = [...a].sort().join(",");
    return sorted === [...q.answers].sort().join(",");
  }
  return Array.isArray(a) && a.length === 1 && a[0] === q.answer;
}

export function Quiz({
  questions,
  onSubmit,
}: {
  questions: QuizQuestion[];
  onSubmit?: (correct: number, total: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = questions.filter((q) => isCorrect(q, answers[q.id])).length;
  const answeredAll = questions.every((q) => answers[q.id] !== undefined);

  const toggle = (q: QuizQuestion, index: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      if (q.kind === "multi") {
        const current = Array.isArray(prev[q.id]) ? (prev[q.id] as number[]) : [];
        return {
          ...prev,
          [q.id]: current.includes(index)
            ? current.filter((i) => i !== index)
            : [...current, index],
        };
      }
      return { ...prev, [q.id]: [index] };
    });
  };

  return (
    <div className="space-y-8">
      {questions.map((q, qi) => {
        const answer = answers[q.id];
        const right = isCorrect(q, answer);
        return (
          <div key={q.id} className="rounded-2xl border border-border bg-card/40 p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="font-medium">
                <span className="mr-2 text-muted-foreground">{qi + 1}.</span>
                {q.prompt}
              </p>
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                {q.kind === "multi" ? "multi select" : q.kind === "boolean" ? "true / false" : q.kind}
              </span>
            </div>

            {q.code ? <CodeBlock className="mt-4" code={q.code} /> : null}

            <div className="mt-4 space-y-2">
              {q.kind === "boolean"
                ? [true, false].map((val) => {
                    const selected = answer === val;
                    const showRight = submitted && val === q.answer;
                    const showWrong = submitted && selected && val !== q.answer;
                    return (
                      <button
                        key={String(val)}
                        type="button"
                        disabled={submitted}
                        onClick={() => setAnswers((p) => ({ ...p, [q.id]: val }))}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors",
                          selected && !submitted && "border-primary/60 bg-primary/10",
                          showRight && "border-primary bg-primary/10",
                          showWrong && "border-destructive/60 bg-destructive/10",
                          !submitted && "hover:border-primary/40",
                        )}
                      >
                        {showRight ? <Check className="h-4 w-4 text-primary" /> : null}
                        {showWrong ? <X className="h-4 w-4 text-destructive" /> : null}
                        {val ? "True" : "False"}
                      </button>
                    );
                  })
                : q.options.map((opt, i) => {
                    const selected = Array.isArray(answer) && answer.includes(i);
                    const correctIndex =
                      q.kind === "multi" ? q.answers.includes(i) : q.answer === i;
                    const showRight = submitted && correctIndex;
                    const showWrong = submitted && selected && !correctIndex;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={submitted}
                        onClick={() => toggle(q, i)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors",
                          selected && !submitted && "border-primary/60 bg-primary/10",
                          showRight && "border-primary bg-primary/10",
                          showWrong && "border-destructive/60 bg-destructive/10",
                          !submitted && "hover:border-primary/40",
                        )}
                      >
                        {showRight ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : null}
                        {showWrong ? <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> : null}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
            </div>

            {submitted ? (
              <p
                className={cn(
                  "mt-4 rounded-lg border px-4 py-3 text-sm",
                  right ? "border-primary/40 bg-primary/5" : "border-destructive/40 bg-destructive/5",
                )}
              >
                <span className="font-medium">{right ? "Correct. " : "Not quite. "}</span>
                {q.explanation}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-4">
        {submitted ? (
          <>
            <div className="text-sm">
              Score:{" "}
              <span className="font-semibold text-primary">
                {correctCount}/{questions.length}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Retake
            </Button>
          </>
        ) : (
          <Button
            disabled={!answeredAll}
            onClick={() => {
              setSubmitted(true);
              onSubmit?.(correctCount, questions.length);
            }}
          >
            Submit answers
          </Button>
        )}
        {!submitted && !answeredAll ? (
          <span className="text-xs text-muted-foreground">Answer every question to submit.</span>
        ) : null}
      </div>
    </div>
  );
}