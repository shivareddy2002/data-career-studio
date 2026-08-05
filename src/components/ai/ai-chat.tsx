import { useMemo, useRef, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, Sparkles, Square, RotateCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AiAgent } from "@/data/ai-agents";

function messageText(parts: readonly { type: string; text?: string }[]) {
  return parts.map((part) => (part.type === "text" ? (part.text ?? "") : "")).join("");
}

function reasoningText(parts: readonly { type: string; text?: string }[]) {
  return parts.map((part) => (part.type === "reasoning" ? (part.text ?? "") : "")).join("");
}

export function AiChat({
  agent,
  context,
  className,
  heightClass = "h-[560px]",
}: {
  agent: AiAgent;
  context?: string;
  className?: string;
  heightClass?: string;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { agentId: agent.id, context },
      }),
    [agent.id, context],
  );

  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    id: `agent-${agent.id}`,
    transport,
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || isBusy) return;
    setInput("");
    void sendMessage({ text: value });
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card",
        heightClass,
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{agent.name}</div>
          <div className="truncate text-xs text-muted-foreground">{agent.tagline}</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{agent.description}</p>
            <div className="flex flex-wrap gap-2">
              {agent.starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => submit(starter)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((message) => {
          const text = messageText(message.parts as never);
          const thinking = reasoningText(message.parts as never);
          const isUser = message.role === "user";
          return (
            <div key={message.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                  isUser
                    ? "bg-primary/12 text-foreground"
                    : "border border-border/60 bg-card/60 text-foreground",
                )}
              >
                {!isUser && thinking && !text ? (
                  <div className="mb-2 whitespace-pre-wrap text-xs italic text-muted-foreground">
                    {thinking}
                  </div>
                ) : null}
                {isUser ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <div className="space-y-3 [&_a]:text-primary [&_a]:underline [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.8em] [&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-sm [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_ol_li]:list-decimal [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border/60 [&_pre]:bg-secondary [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:w-full [&_table]:text-left [&_td]:border-t [&_td]:border-border/60 [&_td]:py-1.5 [&_td]:pr-4 [&_th]:pb-1.5 [&_th]:pr-4 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_ul]:space-y-1">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {status === "submitted" ? (
          <div className="flex gap-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
          </div>
        ) : null}

        {error ? (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-foreground">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-destructive" />
            <div className="space-y-2">
              <p>{error.message || "Something went wrong talking to the AI."}</p>
              <Button size="sm" variant="outline" onClick={() => void regenerate()}>
                <RotateCw className="mr-1.5 h-3 w-3" /> Retry
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
        className="flex items-end gap-2 border-t border-border/60 p-3"
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit(input);
            }
          }}
          rows={2}
          placeholder={agent.placeholder}
          aria-label={`Message ${agent.name}`}
          className="min-h-[52px] flex-1 resize-none rounded-xl border border-border bg-card/50 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary/50"
        />
        {isBusy ? (
          <Button type="button" variant="outline" size="icon" onClick={() => void stop()} aria-label="Stop generating">
            <Square className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send message">
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  );
}