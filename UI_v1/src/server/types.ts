import { z } from "zod";

export const experienceEntrySchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string().optional().default(""),
  dates: z.string(),
  bullets: z.array(z.string()),
});

export const educationEntrySchema = z.object({
  degree: z.string(),
  institution: z.string(),
  location: z.string().optional().default(""),
  dates: z.string(),
  details: z.array(z.string()).optional().default([]),
});

export const projectEntrySchema = z.object({
  name: z.string(),
  description: z.string(),
  technologies: z.array(z.string()).optional().default([]),
  bullets: z.array(z.string()).optional().default([]),
});

export const resumeAnalysisSchema = z.object({
  summary: z.string(),
  professional_title: z.string(),
  technical_skills: z.array(z.string()),
  soft_skills: z.array(z.string()),
  experience: z.array(experienceEntrySchema),
  education: z.array(educationEntrySchema),
  projects: z.array(projectEntrySchema),
  keyword_matches: z.array(z.string()),
  keyword_missing: z.array(z.string()),
  suggestions: z.string(),
  warnings: z.string(),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

export type TailorFiles = {
  pdfBase64: string;
  texBase64: string;
  zipBase64: string;
  pdfFilename: string;
  texFilename: string;
  zipFilename: string;
};

export type TailorResult = {
  analysis: ResumeAnalysis;
  files: TailorFiles;
};

export type JobInput =
  | { mode: "text"; text: string }
  | { mode: "url"; url: string }
  | { mode: "file"; buffer: Buffer; mimeType: string; filename: string };
