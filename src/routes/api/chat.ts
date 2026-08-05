import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  DEFAULT_CHAT_MODEL,
  createLovableResponsesProvider,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";
import { getAiAgent } from "@/data/ai-agents";

type ChatRequestBody = {
  messages?: unknown;
  agentId?: unknown;
  context?: unknown;
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        const messages = body.messages;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const agent = typeof body.agentId === "string" ? getAiAgent(body.agentId) : undefined;
        if (!agent) {
          return new Response("Unknown agent", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("AI is not configured for this project.", { status: 500 });
        }

        const context = typeof body.context === "string" ? body.context.slice(0, 12000) : "";
        const system = context
          ? `${agent.system}\n\n--- Context from the page the learner is on (ground your answer in this) ---\n${context}`
          : agent.system;

        const initialRunId = getLovableAiGatewayRunId(request);
        const { provider, runIdFetch } = createLovableResponsesProvider(key, initialRunId);

        const result = streamText({
          model: provider.responses(DEFAULT_CHAT_MODEL),
          system,
          messages: convertToModelMessages(messages as UIMessage[]),
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });

        const response = result.toUIMessageStreamResponse({
          sendReasoning: true,
          originalMessages: messages as UIMessage[],
          onError: (error) => {
            const message = error instanceof Error ? error.message : String(error);
            if (message.includes("429")) return "AI is rate limited right now. Please retry in a moment.";
            if (message.includes("402")) return "AI credits are exhausted for this workspace.";
            return message;
          },
          headers: getLovableAiGatewayResponseHeaders(undefined, {
            ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
          }),
        });

        return withLovableAiGatewayRunIdHeader(response, runIdFetch);
      },
    },
  },
});