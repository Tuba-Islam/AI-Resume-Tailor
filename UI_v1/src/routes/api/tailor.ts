import { createFileRoute } from "@tanstack/react-router";

import type { JobInput } from "@/server/types";
import { checkRateLimit, getClientIp, tailorResume } from "@/server/services/tailor";
import { sanitizeText } from "@/server/services/validate";

export const Route = createFileRoute("/api/tailor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          checkRateLimit(getClientIp(request));

          const formData = await request.formData();
          const resume = formData.get("resume");
          const jobMode = String(formData.get("jobMode") ?? "text");

          if (!(resume instanceof File)) {
            return Response.json({ error: "Resume PDF is required." }, { status: 400 });
          }

          const resumeBuffer = Buffer.from(await resume.arrayBuffer());
          const jobInput = await parseJobInput(formData, jobMode);
          const result = await tailorResume(resumeBuffer, jobInput);

          return Response.json({
            success: true,
            analysis: result.analysis,
            files: result.files,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Tailoring failed.";
          const status = message.includes("Rate limit") ? 429 : 400;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});

async function parseJobInput(formData: FormData, jobMode: string): Promise<JobInput> {
  if (jobMode === "text") {
    const text = sanitizeText(String(formData.get("jobText") ?? ""));
    return { mode: "text", text };
  }

  if (jobMode === "url") {
    return { mode: "url", url: String(formData.get("jobUrl") ?? "") };
  }

  if (jobMode === "file") {
    const jobFile = formData.get("jobFile");
    if (!(jobFile instanceof File)) {
      throw new Error("Job PDF or image file is required.");
    }
    return {
      mode: "file",
      buffer: Buffer.from(await jobFile.arrayBuffer()),
      mimeType: jobFile.type || "application/octet-stream",
      filename: jobFile.name,
    };
  }

  throw new Error("Invalid job description mode.");
}
