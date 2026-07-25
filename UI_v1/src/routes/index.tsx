import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Moon,
  Sun,
  Github,
  Upload,
  FileText,
  X,
  RefreshCw,
  Check,
  Link as LinkIcon,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Download,
  FileArchive,
  FileCode,
  FileDown,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Resume Tailor — Craft resumes that match any job" },
      {
        name: "description",
        content:
          "Upload your resume, add a job description, and download a tailored, ATS-ready resume in seconds.",
      },
      { property: "og:title", content: "AI Resume Tailor" },
      {
        property: "og:description",
        content:
          "Upload your resume, add a job description, and download a tailored, ATS-ready resume in seconds.",
      },
    ],
  }),
  component: Home,
});

type Stage = "input" | "processing" | "results";
type JDMode = "text" | "url" | "file";
type UploadedFile = { name: string; size: number };

const STEPS = [
  "Uploading",
  "Extracting Text",
  "AI Analysis",
  "Resume Generation",
  "Preparing Download",
] as const;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function Home() {
  const { theme, toggle } = useTheme();
  const [stage, setStage] = useState<Stage>("input");
  const [resume, setResume] = useState<UploadedFile | null>(null);
  const [jdMode, setJdMode] = useState<JDMode>("text");
  const [jdText, setJdText] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [jdFile, setJdFile] = useState<UploadedFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  const jdReady = useMemo(() => {
    if (jdMode === "text") return jdText.trim().length > 20;
    if (jdMode === "url") return /^https?:\/\/.+/.test(jdUrl.trim());
    return !!jdFile;
  }, [jdMode, jdText, jdUrl, jdFile]);

  const canTailor = !!resume && jdReady;

  const handleResumeFile = (file: File) => {
    if (file.type !== "application/pdf") return;
    if (file.size > 10 * 1024 * 1024) return;
    setResume({ name: file.name, size: file.size });
  };

  const startTailor = () => {
    setStage("processing");
    setStep(0);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i >= STEPS.length) {
        setStep(STEPS.length);
        setTimeout(() => setStage("results"), 500);
      } else {
        setStep(i);
        setTimeout(tick, 900);
      }
    };
    setTimeout(tick, 900);
  };

  const reset = () => {
    setStage("input");
    setResume(null);
    setJdText("");
    setJdUrl("");
    setJdFile(null);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">AI Resume Tailor</span>
          </a>
          <nav className="flex items-center gap-1 text-sm">
            <a
              href="#how"
              className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <button
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:pt-24">
        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            AI-powered resume tailoring
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Craft a resume that matches
            <br />
            <span className="text-primary">any job description.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Upload your resume, paste the role you want, and download a tailored,
            ATS-friendly version in seconds.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#tailor"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-neu-sm transition-all hover:-translate-y-0.5 hover:shadow-neu"
            >
              Tailor Resume <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Learn more
            </a>
          </div>
        </section>

        {/* Workflow */}
        <section id="tailor" className="mt-20 space-y-6">
          {stage === "input" && (
            <>
              {/* Resume upload */}
              <div className="neu-card p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Step 1
                    </div>
                    <h2 className="mt-1 text-lg font-semibold">Upload your resume</h2>
                  </div>
                </div>

                {!resume ? (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) handleResumeFile(f);
                    }}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-14 text-center transition-colors",
                      dragOver && "border-primary/60 bg-primary/5",
                    )}
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-muted text-muted-foreground shadow-neu-sm">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-sm font-medium">Drag & drop your resume</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      or click to browse from your device
                    </div>
                    <span className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                      Choose PDF
                    </span>
                    <div className="mt-5 text-xs text-muted-foreground">
                      PDF only · Max size 10MB
                    </div>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleResumeFile(f);
                      }}
                    />
                  </label>
                ) : (
                  <div className="rounded-xl bg-background p-4 shadow-neu-inset">
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-card text-primary shadow-neu-sm">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{resume.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatSize(resume.size)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <label className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <RefreshCw className="h-4 w-4" />
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleResumeFile(f);
                            }}
                          />
                        </label>
                        <button
                          onClick={() => setResume(null)}
                          aria-label="Remove file"
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-full rounded-full bg-success" />
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-success">
                        <Check className="h-3.5 w-3.5" /> Ready
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Job description */}
              <div className="neu-card p-6 sm:p-8">
                <div className="mb-5">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Step 2
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">Add the job description</h2>
                </div>

                <div className="mb-5 inline-flex rounded-full bg-background p-1 shadow-neu-inset">
                  {(
                    [
                      { id: "text", label: "Paste text", icon: FileText },
                      { id: "url", label: "Job URL", icon: LinkIcon },
                      { id: "file", label: "PDF / Image", icon: ImageIcon },
                    ] as const
                  ).map((t) => {
                    const Icon = t.icon;
                    const active = jdMode === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setJdMode(t.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                          active
                            ? "bg-card text-foreground shadow-neu-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" /> {t.label}
                      </button>
                    );
                  })}
                </div>

                {jdMode === "text" && (
                  <textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste the full job description here..."
                    rows={7}
                    className="w-full resize-none rounded-xl bg-background p-4 text-sm shadow-neu-inset outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/30"
                  />
                )}

                {jdMode === "url" && (
                  <div className="rounded-xl bg-background p-1 shadow-neu-inset">
                    <div className="flex items-center gap-2 px-3">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        value={jdUrl}
                        onChange={(e) => setJdUrl(e.target.value)}
                        placeholder="https://company.com/careers/role"
                        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/70"
                      />
                    </div>
                  </div>
                )}

                {jdMode === "file" && (
                  <>
                    {!jdFile ? (
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-10 text-center transition-colors hover:border-primary/40">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        <div className="mt-3 text-sm font-medium">Upload PDF or image</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          PDF, PNG, JPG · Max 10MB
                        </div>
                        <input
                          type="file"
                          accept="application/pdf,image/png,image/jpeg"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setJdFile({ name: f.name, size: f.size });
                          }}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-neu-inset">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{jdFile.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatSize(jdFile.size)}
                          </div>
                        </div>
                        <button
                          onClick={() => setJdFile(null)}
                          aria-label="Remove"
                          className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Action */}
              <div className="flex justify-center pt-2">
                <button
                  disabled={!canTailor}
                  onClick={startTailor}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-all",
                    canTailor
                      ? "bg-primary text-primary-foreground shadow-neu-sm hover:-translate-y-0.5 hover:shadow-neu"
                      : "cursor-not-allowed bg-muted text-muted-foreground",
                  )}
                >
                  <Sparkles className="h-4 w-4" /> Tailor My Resume
                </button>
              </div>
            </>
          )}

          {stage === "processing" && (
            <div className="neu-card p-8 sm:p-12">
              <div className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <h2 className="mt-5 text-lg font-semibold">Tailoring your resume</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sit tight, this usually takes under a minute.
                </p>
              </div>

              <ol className="mx-auto mt-10 max-w-sm space-y-3">
                {STEPS.map((label, i) => {
                  const done = i < step;
                  const active = i === step;
                  const visible = i <= step;
                  return (
                    <li
                      key={label}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300",
                        visible ? "opacity-100" : "opacity-30",
                        active && "bg-background shadow-neu-inset",
                      )}
                    >
                      <div
                        className={cn(
                          "grid h-6 w-6 place-items-center rounded-full text-xs",
                          done
                            ? "bg-success text-success-foreground"
                            : active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {done ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          active ? "font-medium text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </span>
                      {active && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          Working...
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {stage === "results" && <Results onReset={reset} />}
        </section>

        {/* How it works */}
        <section id="how" className="mt-24">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Three simple steps from upload to download.
            </p>
          </div>
          <ol className="mx-auto mt-10 max-w-xl space-y-4">
            {[
              { t: "Upload your resume", d: "Drop in your existing PDF resume." },
              { t: "Add the job description", d: "Paste text, share a URL, or upload a file." },
              { t: "Download the tailored version", d: "Get PDF, LaTeX, or both bundled." },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4 rounded-xl bg-card p-5 shadow-neu-sm">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-medium">{s.t}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Built with care · AI Resume Tailor
      </footer>

      {confirmReset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm"
          onClick={() => setConfirmReset(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="neu-card w-full max-w-md p-6 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold">Reset the page?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  This will remove and delete all your uploads and downloads. Your
                  resume, job description, and any generated files will be cleared.
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirmReset(false)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
              >
                <RotateCcw className="h-4 w-4" /> Reset everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Results({ onReset }: { onReset: () => void }) {
  const downloads = [
    { icon: FileDown, label: "PDF", desc: "Ready to send", ext: ".pdf" },
    { icon: FileCode, label: "LaTeX", desc: "Editable source", ext: ".tex" },
    { icon: FileArchive, label: "ZIP Bundle", desc: "PDF + LaTeX", ext: ".zip" },
  ];
  return (
    <div className="space-y-6">
      <div className="neu-card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Your tailored resume is ready</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Download in your preferred format below.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {downloads.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.label}
                className="group flex flex-col items-center gap-2 rounded-xl bg-background p-5 shadow-neu-sm transition-all hover:-translate-y-0.5 hover:shadow-neu"
              >
                <Icon className="h-6 w-6 text-primary" />
                <div className="text-sm font-medium">{d.label}</div>
                <div className="text-xs text-muted-foreground">{d.desc}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                  <Download className="h-3 w-3" /> Download
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="neu-card p-6 sm:p-8">
        <h3 className="text-sm font-semibold">AI insights</h3>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Matched
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["TypeScript", "React", "Node.js", "AWS", "REST APIs"].map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-success/10 px-2.5 py-1 text-xs text-success"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Missing
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["GraphQL", "Kubernetes", "CI/CD"].map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Suggestions
            </div>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>· Highlight cloud infrastructure work</li>
              <li>· Quantify shipped features</li>
              <li>· Add a brief summary at the top</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Tailor another resume
        </button>
      </div>
    </div>
  );
}
