import { useState } from 'react';
import {
  Wand2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Copy,
  Check,
  Download,
  FileText,
  Zap,
  KeyRound,
  Plus,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, ProgressBar } from './ui';
import { SAMPLE_JOB_DESCRIPTION, SAMPLE_RESUME } from '../data/resume';
import { scanResume } from '../lib/ats';
import {
  fixResume,
  applyFixes,
  type ResumeFixResult,
} from '../lib/resumeFixer';

export function ResumeFixerView() {
  const [jd] = useState(SAMPLE_JOB_DESCRIPTION);
  const [resume, setResume] = useState(SAMPLE_RESUME);
  const [fixResult, setFixResult] = useState<ResumeFixResult | null>(null);
  const [rewritten, setRewritten] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [fixing, setFixing] = useState(false);

  const runFix = () => {
    setFixing(true);
    setFixResult(null);
    setRewritten(null);
    // Simulate a brief processing delay for the premium feel.
    setTimeout(() => {
      const ats = scanResume(jd, resume);
      const result = fixResume(resume, ats);
      const fixed = applyFixes(resume, result);
      setFixResult(result);
      setRewritten(fixed);
      setFixing(false);
    }, 900);
  };

  const reset = () => {
    setFixResult(null);
    setRewritten(null);
    setCopied(false);
  };

  const copyRewritten = () => {
    if (!rewritten) return;
    navigator.clipboard?.writeText(rewritten);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResume = () => {
    if (!rewritten) return;
    const blob = new Blob([rewritten], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prepai_fixed_resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Resume Fixer"
        subtitle="Paste your resume and we'll rewrite weak bullets with impact verbs, add quantified outcomes, and inject missing high-signal keywords from the job description."
        icon={<Wand2 className="h-5 w-5" />}
      />

      {!fixResult && !fixing && (
        <GlassCard className="p-6">
          <h2 className="mb-1 font-display text-lg font-semibold text-neutral-100">
            Your Resume
          </h2>
          <p className="mb-4 text-xs text-neutral-500">
            We'll scan this against the sample job description and generate a
            line-by-line rewrite plan.
          </p>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={12}
            className="w-full resize-none rounded-xl bg-neutral-900/60 border border-neutral-800/60 p-4 text-sm text-neutral-200 shadow-concave transition-all duration-500 placeholder:text-neutral-600 focus:border-cyan-500/60 focus:shadow-glow focus:outline-none"
            placeholder="Paste your resume plain text here…"
          />
          <button
            onClick={runFix}
            disabled={!resume.trim()}
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/90 to-emerald-500/80 py-3 text-sm font-semibold text-neutral-950 shadow-convex transition-all duration-500 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Wand2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Fix My Resume
          </button>
        </GlassCard>
      )}

      {fixing && <FixingSequence />}

      {fixResult && rewritten && (
        <>
          {/* Score delta banner */}
          <GlassCard className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <ScorePill score={fixResult.beforeScore} label="Before" />
                  <ArrowRight className="h-5 w-5 text-neutral-600" />
                  <ScorePill score={fixResult.estimatedAfterScore} label="After" highlight />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 font-display text-base font-semibold text-emerald-300">
                    <TrendingUp className="h-4 w-4" />
                    +{fixResult.estimatedAfterScore - fixResult.beforeScore} pts
                  </p>
                  <p className="text-xs text-neutral-500">estimated ATS lift</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyRewritten}
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition-all hover:bg-neutral-800/40 hover:text-neutral-100"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy result
                    </>
                  )}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-all hover:bg-cyan-500/20 hover:text-cyan-200"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition-all hover:bg-neutral-800/40 hover:text-neutral-100"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Start over
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-400">{fixResult.summary}</p>
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Projected match</span>
                <span className="text-emerald-300 font-medium">
                  {fixResult.estimatedAfterScore}%
                </span>
              </div>
              <ProgressBar value={fixResult.estimatedAfterScore} tone="emerald" />
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Line-by-line fixes */}
            <GlassCard className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-neutral-100">
                <Zap className="h-4 w-4 text-cyan-400" /> Bullet Rewrites
                <Badge tone="cyan" className="ml-1">
                  {fixResult.fixes.length}
                </Badge>
              </h3>
              {fixResult.fixes.length === 0 ? (
                <p className="py-6 text-center text-sm text-neutral-500">
                  No bullet rewrites needed — your verbs are already strong.
                </p>
              ) : (
                <ul className="space-y-4">
                  {fixResult.fixes.map((fix, i) => (
                    <li
                      key={fix.lineNumber}
                      className="rounded-xl border border-neutral-800/60 bg-neutral-950/40 p-4 animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
                        <span className="rounded-md bg-neutral-800/60 px-1.5 py-0.5">
                          Line {fix.lineNumber + 1}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-neutral-500 line-through">
                        {fix.original}
                      </p>
                      <p className="mb-3 text-sm text-neutral-100">
                        {fix.rewritten}
                      </p>
                      <ul className="space-y-1.5">
                        {fix.actions.map((a, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-xs text-neutral-400"
                          >
                            <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-cyan-400" />
                            {a.reason}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}

              {/* Injected keywords */}
              {fixResult.injectedSkills.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <KeyRound className="h-3.5 w-3.5" /> Injected Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {fixResult.injectedSkills.map((k) => (
                      <span
                        key={k}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-xs text-emerald-200"
                      >
                        <Plus className="h-3 w-3" />
                        {k}
                      </span>
                    ))}
                  </div>
                  {fixResult.newSkillsSection && (
                    <div className="mt-3 rounded-lg border border-neutral-800/60 bg-neutral-950/40 p-3">
                      <p className="mb-1 text-[10px] uppercase tracking-wider text-neutral-500">
                        New skills section
                      </p>
                      <p className="text-xs text-neutral-300">
                        {fixResult.newSkillsSection}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>

            {/* Rewritten resume preview */}
            <GlassCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-neutral-100">
                  <FileText className="h-4 w-4 text-emerald-400" /> Rewritten Resume
                </h3>
                <Badge tone="emerald">
                  <CheckCircle2 className="h-3 w-3" /> Ready to copy
                </Badge>
              </div>
              <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap rounded-xl border border-neutral-800/60 bg-neutral-950/60 p-4 text-xs leading-relaxed text-neutral-300">
                {rewritten}
              </pre>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
}

function ScorePill({
  score,
  label,
  highlight,
}: {
  score: number;
  label: string;
  highlight?: boolean;
}) {
  const color =
    score >= 80 ? '#34d399' : score >= 60 ? '#22d3ee' : '#fbbf24';
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
          highlight
            ? 'border-emerald-500/30 bg-emerald-500/10 shadow-glow'
            : 'border-neutral-800/60 bg-neutral-900/60'
        }`}
      >
        <span
          className="font-display text-xl font-bold"
          style={{ color }}
        >
          {score}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] uppercase tracking-widest text-neutral-500">
        {label}
      </span>
    </div>
  );
}

function FixingSequence() {
  const steps = [
    'Scanning resume against job description…',
    'Detecting weak phrasing & passive verbs…',
    'Rewriting bullets with impact verbs…',
    'Injecting missing high-signal keywords…',
    'Recomputing projected ATS score…',
  ];
  return (
    <GlassCard className="p-10">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border border-neutral-800/60" />
          <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin-slow" />
          <div
            className="absolute inset-3 rounded-full border-b-2 border-emerald-400/70 animate-spin-slow"
            style={{ animationDuration: '4s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Wand2 className="h-8 w-8 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <h3 className="mt-6 font-display text-lg font-semibold text-neutral-100">
          Fixing your resume
        </h3>
        <div className="mt-5 space-y-2">
          {steps.map((s, i) => (
            <p
              key={i}
              className="flex items-center gap-2 text-xs text-neutral-500 animate-fade-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <AlertTriangle className="h-3 w-3 text-cyan-400" />
              {s}
            </p>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
