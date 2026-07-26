import PDFDocument from "pdfkit";

import type { ResumeAnalysis } from "../types";
import {
  FONT_REGULAR_B64,
  FONT_BOLD_B64,
  FONT_ITALIC_B64,
} from "../assets/fonts-data.generated";

// PDFKit's built-in "Helvetica" fonts read font-metric files via `__dirname`,
// which doesn't exist in the ESM serverless bundle Vercel deploys (causes a
// runtime "__dirname is not defined" crash). We sidestep this entirely by
// embedding our own TTF fonts as base64 directly in the JS bundle, so there's
// no separate asset file that could fail to be traced/copied during deploy.
const FONT_REGULAR = Buffer.from(FONT_REGULAR_B64, "base64");
const FONT_BOLD = Buffer.from(FONT_BOLD_B64, "base64");
const FONT_ITALIC = Buffer.from(FONT_ITALIC_B64, "base64");

export async function renderPdf(analysis: ResumeAnalysis): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 54, bottom: 54, left: 54, right: 54 },
      // Disable PDFKit's automatic default-font loading: it would otherwise
      // call the broken __dirname-based standard-font loader right here in
      // the constructor, before we get a chance to register our own fonts.
      font: false as unknown as string,
    });

    doc.registerFont("Helvetica", FONT_REGULAR);
    doc.registerFont("Helvetica-Bold", FONT_BOLD);
    doc.registerFont("Helvetica-Oblique", FONT_ITALIC);

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.font("Helvetica-Bold").fontSize(18).text(analysis.professional_title || "Professional Resume", {
      align: "center",
    });
    doc.moveDown(0.8);

    if (analysis.summary.trim()) {
      writeSection(doc, "Professional Summary");
      doc.font("Helvetica").fontSize(10).text(analysis.summary, { lineGap: 2 });
      doc.moveDown(0.6);
    }

    const skills = [
      analysis.technical_skills.length
        ? `Technical: ${analysis.technical_skills.join(", ")}`
        : "",
      analysis.soft_skills.length ? `Soft: ${analysis.soft_skills.join(", ")}` : "",
    ].filter(Boolean);

    if (skills.length) {
      writeSection(doc, "Skills");
      doc.font("Helvetica").fontSize(10);
      for (const line of skills) {
        doc.text(line, { lineGap: 2 });
      }
      doc.moveDown(0.6);
    }

    if (analysis.experience.length) {
      writeSection(doc, "Experience");
      for (const item of analysis.experience) {
        doc
          .font("Helvetica-Bold")
          .fontSize(11)
          .text(`${item.title} — ${item.company}`, { continued: true })
          .font("Helvetica")
          .text(`  ${item.dates}`, { align: "right" });
        if (item.location) {
          doc.font("Helvetica-Oblique").fontSize(9).text(item.location);
        }
        doc.font("Helvetica").fontSize(10);
        for (const bullet of item.bullets) {
          doc.text(`• ${bullet}`, { indent: 12, lineGap: 1 });
        }
        doc.moveDown(0.4);
      }
    }

    if (analysis.education.length) {
      writeSection(doc, "Education");
      for (const item of analysis.education) {
        doc
          .font("Helvetica-Bold")
          .fontSize(11)
          .text(`${item.degree} — ${item.institution}`, { continued: true })
          .font("Helvetica")
          .text(`  ${item.dates}`, { align: "right" });
        if (item.location) {
          doc.font("Helvetica-Oblique").fontSize(9).text(item.location);
        }
        doc.font("Helvetica").fontSize(10);
        for (const detail of item.details ?? []) {
          doc.text(detail, { lineGap: 1 });
        }
        doc.moveDown(0.4);
      }
    }

    if (analysis.projects.length) {
      writeSection(doc, "Projects");
      for (const project of analysis.projects) {
        doc.font("Helvetica-Bold").fontSize(11).text(project.name);
        if (project.description) {
          doc.font("Helvetica").fontSize(10).text(project.description, { lineGap: 1 });
        }
        if (project.technologies?.length) {
          doc
            .font("Helvetica-Oblique")
            .fontSize(9)
            .text(`Technologies: ${project.technologies.join(", ")}`);
        }
        doc.font("Helvetica").fontSize(10);
        for (const bullet of project.bullets ?? []) {
          doc.text(`• ${bullet}`, { indent: 12, lineGap: 1 });
        }
        doc.moveDown(0.4);
      }
    }

    doc.end();
  });
}

function writeSection(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown(0.2);
  doc.font("Helvetica-Bold").fontSize(12).text(title.toUpperCase());
  doc.moveDown(0.2);
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .strokeColor("#cccccc")
    .stroke();
  doc.moveDown(0.4);
}
