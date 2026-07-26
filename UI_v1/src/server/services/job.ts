import * as cheerio from "cheerio";

import type { JobInput } from "../types";
import { sanitizeText, sanitizeUrl } from "./validate";
import { extractPdfText } from "./pdf";
import { extractTextFromImage } from "./ai";

export async function resolveJobDescription(input: JobInput): Promise<string> {
  if (input.mode === "text") {
    const text = sanitizeText(input.text);
    if (text.length < 20) {
      throw new Error("Job description text is too short.");
    }
    return text;
  }

  if (input.mode === "url") {
    return scrapeJobUrl(sanitizeUrl(input.url));
  }

  if (input.mimeType === "application/pdf") {
    return extractPdfText(input.buffer);
  }

  return extractTextFromImage(input.buffer, input.mimeType);
}

async function scrapeJobUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AIResumeTailor/1.0; +https://github.com)",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(
      `Could not fetch the job URL (${response.status}). Paste the job description text instead.`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("pdf")) {
    const buffer = Buffer.from(await response.arrayBuffer());
    return extractPdfText(buffer);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, noscript, iframe").remove();

  const candidates = [
    $("main").text(),
    $('[class*="job"], [class*="description"], [id*="job"], [id*="description"]').text(),
    $("article").text(),
    $("body").text(),
  ];

  const text = sanitizeText(
    candidates
      .map((value) => value.replace(/\s+/g, " ").trim())
      .sort((a, b) => b.length - a.length)[0] ?? "",
  );

  if (text.length < 40) {
    throw new Error(
      "Could not extract enough text from the job URL. Paste the job description manually.",
    );
  }

  return text;
}
