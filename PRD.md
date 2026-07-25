# PRD — AI Resume Tailor (Refined)

> **Status:** v2.0  
> **Owner:** [Your Name]  
> **Purpose:** End-to-end AI-powered resume tailoring web application.

## Product Vision

AI Resume Tailor is a privacy-first web application that helps job seekers customize an ATS-friendly resume for every application in under 30 seconds. Users upload their resume and provide a job posting, and the application returns a professionally tailored PDF and editable LaTeX source without fabricating experience or storing personal data.

## Problem Statement

Job seekers often send the same resume to every employer because tailoring takes time. Existing tools require accounts, subscriptions, or permanently store personal information. Many AI tools also invent qualifications or generate resumes that fail ATS screening.

AI Resume Tailor solves this by providing:
- No login
- No persistent storage
- Truthful AI-assisted tailoring
- ATS-safe resume generation
- Free usage

## Target Users

### University Students
- Internship applicants
- First-time job seekers

### Early Career Professionals
- 1–5 years of experience
- Frequent applicants wanting ATS optimization

## Competitive Advantages

- No signup
- No database
- Privacy-first
- ATS-safe LaTeX output
- Truthful AI (never invents experience)
- Free

## User Journey

1. Upload Resume PDF.
2. Paste Job URL, upload Job PDF, or paste Job Description.
3. Click **Tailor Resume**.
4. Text extraction.
5. AI analyzes both documents.
6. Structured JSON returned.
7. Resume rendered into ATS-safe LaTeX.
8. PDF compiled.
9. ZIP (.pdf + .tex) downloaded.
10. Temporary files deleted immediately.

## Functional Requirements

### Resume Upload
- Drag & Drop
- Click Upload
- PDF validation
- Max 10MB
- Upload progress

Acceptance Criteria:
- Valid PDFs accepted.
- Invalid PDFs rejected.
- Oversized files rejected.

### Job Description Input
- URL
- PDF
- Plain text fallback

### AI Analysis
- Gemini Flash (Primary)
- Groq (Fallback)
- JSON-only responses
- Never fabricate skills, dates, employers, education, certifications, or projects.

### Resume Generation
- Fixed ATS-safe LaTeX template
- Escape all LaTeX characters
- Compile with Tectonic
- ZIP output (.pdf + .tex)

## AI Pipeline

Resume → Text Extraction → Cleaning → Job Analysis → Keyword Matching → Gap Analysis → Resume Optimization → JSON Validation → LaTeX Rendering → PDF

## AI System Prompt (Core)

You are an ATS resume optimization assistant.

Rules:
1. Never invent experience.
2. Never invent employers.
3. Never invent education.
4. Never invent certifications.
5. Never invent skills.
6. Rewrite only using existing facts.
7. Preserve chronology.
8. Optimize for ATS keywords.
9. Return valid JSON only.

## JSON Schema

```json
{
  "summary":"",
  "professional_title":"",
  "technical_skills":[],
  "soft_skills":[],
  "experience":[],
  "education":[],
  "projects":[],
  "keyword_matches":[],
  "keyword_missing":[],
  "suggestions":"",
  "warnings":""
}
```

## UI Pages

- Landing Page
- Resume Upload
- Job Description Input
- Processing Screen
- Results Screen

## API Endpoints

POST /upload-resume

POST /upload-job

POST /analyze

POST /generate

GET /download

GET /health

## Technical Architecture

Browser

↓

React + Tailwind

↓

Rust Backend

↓

PDF Extraction

↓

Gemini / Groq

↓

Structured JSON

↓

LaTeX Engine

↓

PDF

↓

ZIP

↓

Browser

## Folder Structure

```text
frontend/
backend/
components/
services/
ai/
latex/
pdf/
utils/
```

## Security

- HTTPS only
- Input sanitization
- Rate limiting
- Resource limits
- Prompt injection defense
- LaTeX escaping
- JSON validation

### Environment Variable Policy (Critical)

**API keys (for Gemini and Groq) must never be written directly into any code file. They must be read from a `.env` file, and `.env` must be added to `.gitignore` before the first commit, so it's never uploaded to GitHub.**

This is a mandatory security requirement.

## Privacy

- No database
- No persistent storage
- Delete all uploads after response
- Send only extracted text to AI providers

**API keys (for Gemini and Groq) must never be written directly into any code file. They must be read from a `.env` file, and `.env` must be added to `.gitignore` before the first commit, so it's never uploaded to GitHub.**

## Performance

- Target <30 seconds
- Rust backend
- Free-tier hosting compatible

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| AI hallucination | Strict prompt + schema validation |
| Malformed PDF | Sandboxed Rust parser |
| API rate limits | Gemini → Groq fallback |
| Job scraping blocked | Manual paste fallback |

## Deployment

Frontend:
- Vercel

Backend:
- Render / Railway / Fly.io

Secrets:
- Environment variables only

### Deployment Checklist

- Public GitHub repository
- Live deployment
- README completed
- Screenshots added
- Environment variables configured

**API keys (for Gemini and Groq) must never be written directly into any code file. They must be read from a `.env` file, and `.env` must be added to `.gitignore` before the first commit, so it's never uploaded to GitHub.**

## Future Roadmap

V1
- Resume Tailoring

V1.1
- Cover Letter Generator

V1.2
- Multiple Templates

V2
- Interview Preparation
- Resume Scoring
- Application Tracker
