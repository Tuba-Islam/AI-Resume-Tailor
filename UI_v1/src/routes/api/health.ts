import { createFileRoute } from "@tanstack/react-router";

import { getEnv } from "@/server/config";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const hasGemini = Boolean(getEnv("GEMINI_API_KEY"));
        const hasGroq = Boolean(getEnv("GROQ_API_KEY"));

        return Response.json({
          status: "ok",
          service: "ai-resume-tailor",
          ai: {
            gemini: hasGemini,
            groq: hasGroq,
            ready: hasGemini || hasGroq,
          },
          timestamp: new Date().toISOString(),
        });
      },
    },
  },
});
