const MAX_FILE_BYTES = 10 * 1024 * 1024;

export function getEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function requireEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const appConfig = {
  maxFileBytes: MAX_FILE_BYTES,
  geminiModel: getEnv("GEMINI_MODEL") ?? "gemini-2.0-flash",
  groqModel: getEnv("GROQ_MODEL") ?? "llama-3.3-70b-versatile",
  rateLimitWindowMs: 60_000,
  rateLimitMaxRequests: 10,
};
