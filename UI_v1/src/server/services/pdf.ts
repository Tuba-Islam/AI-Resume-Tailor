import { extractText, getDocumentProxy } from "unpdf";

import { sanitizeText } from "./validate";

export async function extractPdfText(buffer: Buffer): Promise<string> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  const cleaned = sanitizeText(Array.isArray(text) ? text.join("\n") : String(text ?? ""));

  if (cleaned.length < 40) {
    throw new Error(
      "Could not extract enough text from the resume PDF. Try a text-based PDF rather than a scanned image.",
    );
  }

  return cleaned;
}
