import { appConfig } from "../config";

const PDF_MAGIC = "%PDF";

export function assertPdfBuffer(buffer: Buffer, label: string): void {
  if (buffer.byteLength === 0) {
    throw new Error(`${label} is empty.`);
  }
  if (buffer.byteLength > appConfig.maxFileBytes) {
    throw new Error(`${label} exceeds the 10MB limit.`);
  }
  if (!buffer.subarray(0, 4).toString("utf8").startsWith(PDF_MAGIC)) {
    throw new Error(`${label} must be a valid PDF file.`);
  }
}

export function assertJobFile(buffer: Buffer, mimeType: string, label: string): void {
  if (buffer.byteLength === 0) {
    throw new Error(`${label} is empty.`);
  }
  if (buffer.byteLength > appConfig.maxFileBytes) {
    throw new Error(`${label} exceeds the 10MB limit.`);
  }

  const allowed = new Set([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ]);
  if (!allowed.has(mimeType)) {
    throw new Error(`${label} must be a PDF, PNG, or JPG file.`);
  }
}

export function sanitizeText(input: string, maxLength = 50_000): string {
  return input
    .replace(/\0/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeUrl(input: string): string {
  const url = input.trim();
  if (!/^https?:\/\/.+/i.test(url)) {
    throw new Error("Job URL must start with http:// or https://");
  }
  return url.slice(0, 2048);
}
