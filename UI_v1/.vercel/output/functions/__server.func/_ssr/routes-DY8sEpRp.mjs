import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Check, a as Sparkles, c as Moon, d as Github, f as FileText, g as Download, h as FileArchive, i as Sun, l as Link, m as FileCode, n as Upload, o as RotateCcw, p as FileDown, r as TriangleAlert, s as RefreshCw, t as X, u as Image, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DY8sEpRp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const initial = (typeof window !== "undefined" && localStorage.getItem("theme")) ?? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	const toggle = () => {
		setTheme((prev) => {
			const next = prev === "light" ? "dark" : "light";
			document.documentElement.classList.toggle("dark", next === "dark");
			localStorage.setItem("theme", next);
			return next;
		});
	};
	return {
		theme,
		toggle
	};
}
async function tailorResumeRequest(input) {
	const formData = new FormData();
	formData.append("resume", input.resume);
	formData.append("jobMode", input.jobMode);
	if (input.jobMode === "text") formData.append("jobText", input.jobText ?? "");
	else if (input.jobMode === "url") formData.append("jobUrl", input.jobUrl ?? "");
	else if (input.jobFile) formData.append("jobFile", input.jobFile);
	const response = await fetch("/api/tailor", {
		method: "POST",
		body: formData
	});
	const payload = await response.json();
	if (!response.ok || "error" in payload) throw new Error("error" in payload ? payload.error : "Tailoring failed.");
	return payload;
}
function downloadBase64File(base64, filename, mimeType) {
	const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
	const blob = new Blob([bytes], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}
function parseSuggestions(suggestions) {
	return suggestions.split(/\n|•|·|-/).map((item) => item.trim()).filter((item) => item.length > 3).slice(0, 5);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var STEPS = [
	"Uploading",
	"Extracting Text",
	"AI Analysis",
	"Resume Generation",
	"Preparing Download"
];
function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
function Home() {
	const { theme, toggle } = useTheme();
	const [stage, setStage] = (0, import_react.useState)("input");
	const [resume, setResume] = (0, import_react.useState)(null);
	const [resumeFile, setResumeFile] = (0, import_react.useState)(null);
	const [jdMode, setJdMode] = (0, import_react.useState)("text");
	const [jdText, setJdText] = (0, import_react.useState)("");
	const [jdUrl, setJdUrl] = (0, import_react.useState)("");
	const [jdFile, setJdFile] = (0, import_react.useState)(null);
	const [jdFileObject, setJdFileObject] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const [tailorResult, setTailorResult] = (0, import_react.useState)(null);
	const [processingError, setProcessingError] = (0, import_react.useState)(null);
	const jdReady = (0, import_react.useMemo)(() => {
		if (jdMode === "text") return jdText.trim().length > 20;
		if (jdMode === "url") return /^https?:\/\/.+/.test(jdUrl.trim());
		return !!jdFile;
	}, [
		jdMode,
		jdText,
		jdUrl,
		jdFile
	]);
	const canTailor = !!resume && jdReady;
	const handleResumeFile = (file) => {
		if (file.type !== "application/pdf") return;
		if (file.size > 10 * 1024 * 1024) return;
		setResume({
			name: file.name,
			size: file.size
		});
		setResumeFile(file);
	};
	const handleJobFile = (file) => {
		if (file.size > 10 * 1024 * 1024) return;
		setJdFile({
			name: file.name,
			size: file.size
		});
		setJdFileObject(file);
	};
	const startTailor = async () => {
		if (!resumeFile) return;
		setStage("processing");
		setStep(0);
		setProcessingError(null);
		setTailorResult(null);
		const advance = (target) => {
			setStep((current) => Math.max(current, target));
		};
		const timers = [
			setTimeout(() => advance(1), 600),
			setTimeout(() => advance(2), 1800),
			setTimeout(() => advance(3), 3200)
		];
		try {
			const result = await tailorResumeRequest({
				resume: resumeFile,
				jobMode: jdMode,
				jobText: jdText,
				jobUrl: jdUrl,
				jobFile: jdFileObject
			});
			timers.forEach(clearTimeout);
			setStep(STEPS.length);
			setTailorResult(result);
			setTimeout(() => setStage("results"), 400);
		} catch (error) {
			timers.forEach(clearTimeout);
			setProcessingError(error instanceof Error ? error.message : "Tailoring failed.");
			setStep(0);
		}
	};
	const reset = () => {
		setStage("input");
		setResume(null);
		setResumeFile(null);
		setJdText("");
		setJdUrl("");
		setJdFile(null);
		setJdFileObject(null);
		setStep(0);
		setTailorResult(null);
		setProcessingError(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tracking-tight",
							children: "AI Resume Tailor"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#how",
								className: "rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
								children: "How it works"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setConfirmReset(true),
								className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Reset"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://github.com",
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "GitHub",
								className: "rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggle,
								"aria-label": "Toggle theme",
								className: "rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground",
								children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-6 pb-24 pt-16 sm:pt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }), "AI-powered resume tailoring"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 text-4xl font-semibold tracking-tight sm:text-5xl",
								children: [
									"Craft a resume that matches",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "any job description."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground",
								children: "Upload your resume, paste the role you want, and download a tailored, ATS-friendly version in seconds."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#tailor",
									className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-neu-sm transition-all hover:-translate-y-0.5 hover:shadow-neu",
									children: ["Tailor Resume ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									className: "inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
									children: "Learn more"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "tailor",
						className: "mt-20 space-y-6",
						children: [
							stage === "input" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "neu-card p-6 sm:p-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-5 flex items-center justify-between",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
											children: "Step 1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-1 text-lg font-semibold",
											children: "Upload your resume"
										})] })
									}), !resume ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										onDragOver: (e) => {
											e.preventDefault();
											setDragOver(true);
										},
										onDragLeave: () => setDragOver(false),
										onDrop: (e) => {
											e.preventDefault();
											setDragOver(false);
											const f = e.dataTransfer.files?.[0];
											if (f) handleResumeFile(f);
										},
										className: cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-14 text-center transition-colors", dragOver && "border-primary/60 bg-primary/5"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-14 w-14 place-items-center rounded-full bg-muted text-muted-foreground shadow-neu-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 text-sm font-medium",
												children: "Drag & drop your resume"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "or click to browse from your device"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-5 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground",
												children: "Choose PDF"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-5 text-xs text-muted-foreground",
												children: "PDF only · Max size 10MB"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "application/pdf",
												className: "hidden",
												onChange: (e) => {
													const f = e.target.files?.[0];
													if (f) handleResumeFile(f);
												}
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-background p-4 shadow-neu-inset",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-card text-primary shadow-neu-sm",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "truncate text-sm font-medium",
														children: resume.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs text-muted-foreground",
														children: formatSize(resume.size)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "file",
															accept: "application/pdf",
															className: "hidden",
															onChange: (e) => {
																const f = e.target.files?.[0];
																if (f) handleResumeFile(f);
															}
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															setResume(null);
															setResumeFile(null);
														},
														"aria-label": "Remove file",
														className: "rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 flex-1 overflow-hidden rounded-full bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full rounded-full bg-success" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 text-xs font-medium text-success",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Ready"]
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "neu-card p-6 sm:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
												children: "Step 2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-1 text-lg font-semibold",
												children: "Add the job description"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-5 inline-flex rounded-full bg-background p-1 shadow-neu-inset",
											children: [
												{
													id: "text",
													label: "Paste text",
													icon: FileText
												},
												{
													id: "url",
													label: "Job URL",
													icon: Link
												},
												{
													id: "file",
													label: "PDF / Image",
													icon: Image
												}
											].map((t) => {
												const Icon = t.icon;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setJdMode(t.id),
													className: cn("inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all", jdMode === t.id ? "bg-card text-foreground shadow-neu-sm" : "text-muted-foreground hover:text-foreground"),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
														" ",
														t.label
													]
												}, t.id);
											})
										}),
										jdMode === "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: jdText,
											onChange: (e) => setJdText(e.target.value),
											placeholder: "Paste the full job description here...",
											rows: 7,
											className: "w-full resize-none rounded-xl bg-background p-4 text-sm shadow-neu-inset outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/30"
										}),
										jdMode === "url" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-xl bg-background p-1 shadow-neu-inset",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 px-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "url",
													value: jdUrl,
													onChange: (e) => setJdUrl(e.target.value),
													placeholder: "https://company.com/careers/role",
													className: "w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/70"
												})]
											})
										}),
										jdMode === "file" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !jdFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 px-6 py-10 text-center transition-colors hover:border-primary/40",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5 text-muted-foreground" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-3 text-sm font-medium",
													children: "Upload PDF or image"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-1 text-xs text-muted-foreground",
													children: "PDF, PNG, JPG · Max 10MB"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "application/pdf,image/png,image/jpeg",
													className: "hidden",
													onChange: (e) => {
														const f = e.target.files?.[0];
														if (f) handleJobFile(f);
													}
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 rounded-xl bg-background p-4 shadow-neu-inset",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "truncate text-sm font-medium",
														children: jdFile.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs text-muted-foreground",
														children: formatSize(jdFile.size)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														setJdFile(null);
														setJdFileObject(null);
													},
													"aria-label": "Remove",
													className: "rounded-lg p-2 text-muted-foreground hover:text-destructive",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
												})
											]
										}) })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: !canTailor,
										onClick: startTailor,
										className: cn("inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-all", canTailor ? "bg-primary text-primary-foreground shadow-neu-sm hover:-translate-y-0.5 hover:shadow-neu" : "cursor-not-allowed bg-muted text-muted-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Tailor My Resume"]
									})
								})
							] }),
							stage === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "neu-card p-8 sm:p-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 animate-pulse" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-5 text-lg font-semibold",
												children: "Tailoring your resume"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												children: "Sit tight, this usually takes under a minute."
											}),
											processingError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mx-auto mt-5 max-w-md rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive",
												children: processingError
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mx-auto mt-10 max-w-sm space-y-3",
										children: STEPS.map((label, i) => {
											const done = i < step;
											const active = i === step;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: cn("flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300", i <= step ? "opacity-100" : "opacity-30", active && "bg-background shadow-neu-inset"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: cn("grid h-6 w-6 place-items-center rounded-full text-xs", done ? "bg-success text-success-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
														children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("text-sm", active ? "font-medium text-foreground" : "text-muted-foreground"),
														children: label
													}),
													active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-auto text-xs text-muted-foreground",
														children: "Working..."
													})
												]
											}, label);
										})
									}),
									processingError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 flex justify-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setStage("input"),
											className: "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
											children: "Back to upload"
										})
									})
								]
							}),
							stage === "results" && tailorResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Results, {
								onReset: reset,
								result: tailorResult
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "how",
						className: "mt-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-semibold tracking-tight",
								children: "How it works"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Three simple steps from upload to download."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mx-auto mt-10 max-w-xl space-y-4",
							children: [
								{
									t: "Upload your resume",
									d: "Drop in your existing PDF resume."
								},
								{
									t: "Add the job description",
									d: "Paste text, share a URL, or upload a file."
								},
								{
									t: "Download the tailored version",
									d: "Get PDF, LaTeX, or both bundled."
								}
							].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 rounded-xl bg-card p-5 shadow-neu-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: s.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-sm text-muted-foreground",
									children: s.d
								})] })]
							}, s.t))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 py-8 text-center text-xs text-muted-foreground",
				children: "Built with care · AI Resume Tailor"
			}),
			confirmReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm",
				onClick: () => setConfirmReset(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					onClick: (e) => e.stopPropagation(),
					className: "neu-card w-full max-w-md p-6 sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold",
								children: "Reset the page?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: "This will remove and delete all your uploads and downloads. Your resume, job description, and any generated files will be cleared. This action cannot be undone."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setConfirmReset(false),
							className: "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								reset();
								setConfirmReset(false);
							},
							className: "inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Reset everything"]
						})]
					})]
				})
			})
		]
	});
}
function Results({ onReset, result }) {
	const { analysis, files } = result;
	const suggestions = parseSuggestions(analysis.suggestions);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "neu-card p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/10 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-lg font-semibold",
						children: "Your tailored resume is ready"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Download in your preferred format below."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-3",
						children: [
							{
								icon: FileDown,
								label: "PDF",
								desc: "Ready to send",
								ext: ".pdf",
								onDownload: () => downloadBase64File(files.pdfBase64, files.pdfFilename, "application/pdf")
							},
							{
								icon: FileCode,
								label: "LaTeX",
								desc: "Editable source",
								ext: ".tex",
								onDownload: () => downloadBase64File(files.texBase64, files.texFilename, "application/x-tex")
							},
							{
								icon: FileArchive,
								label: "ZIP Bundle",
								desc: "PDF + LaTeX",
								ext: ".zip",
								onDownload: () => downloadBase64File(files.zipBase64, files.zipFilename, "application/zip")
							}
						].map((d) => {
							const Icon = d.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: d.onDownload,
								className: "group flex flex-col items-center gap-2 rounded-xl bg-background p-5 shadow-neu-sm transition-all hover:-translate-y-0.5 hover:shadow-neu",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: d.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: d.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 inline-flex items-center gap-1 text-xs text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " Download"]
									})
								]
							}, d.label);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "neu-card p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "AI insights"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-6 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: "Matched"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: analysis.keyword_matches.length ? analysis.keyword_matches.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-success/10 px-2.5 py-1 text-xs text-success",
								children: k
							}, k)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "No direct matches found."
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: "Missing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: analysis.keyword_missing.length ? analysis.keyword_missing.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
								children: k
							}, k)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "No major gaps detected."
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: "Suggestions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-xs text-muted-foreground",
							children: suggestions.length ? suggestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", item] }, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", analysis.suggestions || "Review the tailored resume before sending."] })
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onReset,
					className: "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
					children: "Tailor another resume"
				})
			})
		]
	});
}
//#endregion
export { Home as component };
