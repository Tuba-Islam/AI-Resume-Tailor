import { appConfig } from "../config";
import type { JobInput, TailorResult } from "../types";
import { analyzeResume } from "./ai";
import { resolveJobDescription } from "./job";
import { renderLatex } from "./latex";
import { extractPdfText } from "./pdf";
import { renderPdf } from "./pdf-generate";
import { assertPdfBuffer } from "./validate";
import { createZipBundle } from "./zip";

export async function tailorResume(
  resumeBuffer: Buffer,
  jobInput: JobInput,
): Promise<TailorResult> {
  assertPdfBuffer(resumeBuffer, "Resume");

  const [resumeText, jobDescription] = await Promise.all([
    extractPdfText(resumeBuffer),
    resolveJobDescription(jobInput),
  ]);

  const analysis = await analyzeResume(resumeText, jobDescription);
  const latex = renderLatex(analysis);
  const texBuffer = Buffer.from(latex, "utf8");
  const pdfBuffer = await renderPdf(analysis);
  const zipBuffer = await createZipBundle({
    "tailored-resume.pdf": pdfBuffer,
    "tailored-resume.tex": texBuffer,
  });

  return {
    analysis,
    files: {
      pdfBase64: pdfBuffer.toString("base64"),
      texBase64: texBuffer.toString("base64"),
      zipBase64: zipBuffer.toString("base64"),
      pdfFilename: "tailored-resume.pdf",
      texFilename: "tailored-resume.tex",
      zipFilename: "tailored-resume.zip",
    },
  };
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string): void {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + appConfig.rateLimitWindowMs });
    return;
  }

  if (entry.count >= appConfig.rateLimitMaxRequests) {
    throw new Error("Rate limit exceeded. Please wait a minute and try again.");
  }

  entry.count += 1;
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
