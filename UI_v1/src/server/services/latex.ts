import type { ResumeAnalysis } from "../types";

export function escapeLatex(value: string): string {
  return value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

export function renderLatex(analysis: ResumeAnalysis): string {
  const lines: string[] = [
    "\\documentclass[11pt,letterpaper]{article}",
    "\\usepackage[margin=0.75in]{geometry}",
    "\\usepackage[T1]{fontenc}",
    "\\usepackage{lmodern}",
    "\\usepackage{enumitem}",
    "\\usepackage[hidelinks]{hyperref}",
    "\\pagestyle{empty}",
    "\\setlist[itemize]{leftmargin=*, nosep, topsep=2pt}",
    "",
    "\\begin{document}",
    "",
    "\\begin{center}",
    `{\\LARGE\\bfseries ${escapeLatex(analysis.professional_title || "Professional Resume")}}`,
    "\\end{center}",
    "",
  ];

  if (analysis.summary.trim()) {
    lines.push("\\section*{Professional Summary}", escapeLatex(analysis.summary), "");
  }

  if (analysis.technical_skills.length || analysis.soft_skills.length) {
    lines.push("\\section*{Skills}");
    if (analysis.technical_skills.length) {
      lines.push(`\\textbf{Technical:} ${escapeLatex(analysis.technical_skills.join(", "))}`);
    }
    if (analysis.soft_skills.length) {
      lines.push(`\\textbf{Soft:} ${escapeLatex(analysis.soft_skills.join(", "))}`);
    }
    lines.push("");
  }

  if (analysis.experience.length) {
    lines.push("\\section*{Experience}");
    for (const item of analysis.experience) {
      lines.push(
        `\\textbf{${escapeLatex(item.title)}} -- ${escapeLatex(item.company)} \\hfill ${escapeLatex(item.dates)}`,
      );
      if (item.location) {
        lines.push(escapeLatex(item.location));
      }
      if (item.bullets.length) {
        lines.push("\\begin{itemize}");
        for (const bullet of item.bullets) {
          lines.push(`\\item ${escapeLatex(bullet)}`);
        }
        lines.push("\\end{itemize}", "");
      }
    }
  }

  if (analysis.education.length) {
    lines.push("\\section*{Education}");
    for (const item of analysis.education) {
      lines.push(
        `\\textbf{${escapeLatex(item.degree)}} -- ${escapeLatex(item.institution)} \\hfill ${escapeLatex(item.dates)}`,
      );
      if (item.location) {
        lines.push(escapeLatex(item.location));
      }
      for (const detail of item.details ?? []) {
        lines.push(escapeLatex(detail));
      }
      lines.push("");
    }
  }

  if (analysis.projects.length) {
    lines.push("\\section*{Projects}");
    for (const project of analysis.projects) {
      lines.push(`\\textbf{${escapeLatex(project.name)}}`);
      if (project.description) {
        lines.push(escapeLatex(project.description));
      }
      if (project.technologies?.length) {
        lines.push(`\\textit{Technologies: ${escapeLatex(project.technologies.join(", "))}}`);
      }
      if (project.bullets?.length) {
        lines.push("\\begin{itemize}");
        for (const bullet of project.bullets ?? []) {
          lines.push(`\\item ${escapeLatex(bullet)}`);
        }
        lines.push("\\end{itemize}", "");
      }
    }
  }

  lines.push("\\end{document}");
  return lines.join("\n");
}
