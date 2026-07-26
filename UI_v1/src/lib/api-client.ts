import type { ResumeAnalysis, TailorFiles } from "@/server/types";

export type TailorResponse = {
  success: true;
  analysis: ResumeAnalysis;
  files: TailorFiles;
};

export type TailorErrorResponse = {
  error: string;
};

export async function tailorResumeRequest(input: {
  resume: File;
  jobMode: "text" | "url" | "file";
  jobText?: string;
  jobUrl?: string;
  jobFile?: File | null;
}): Promise<TailorResponse> {
  const formData = new FormData();
  formData.append("resume", input.resume);
  formData.append("jobMode", input.jobMode);

  if (input.jobMode === "text") {
    formData.append("jobText", input.jobText ?? "");
  } else if (input.jobMode === "url") {
    formData.append("jobUrl", input.jobUrl ?? "");
  } else if (input.jobFile) {
    formData.append("jobFile", input.jobFile);
  }

  const response = await fetch("/api/tailor", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json()) as TailorResponse | TailorErrorResponse;
  if (!response.ok || "error" in payload) {
    throw new Error("error" in payload ? payload.error : "Tailoring failed.");
  }

  return payload;
}

export function downloadBase64File(base64: string, filename: string, mimeType: string) {
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseSuggestions(suggestions: string): string[] {
  return suggestions
    .split(/\n|•|·|-/)
    .map((item) => item.trim())
    .filter((item) => item.length > 3)
    .slice(0, 5);
}
