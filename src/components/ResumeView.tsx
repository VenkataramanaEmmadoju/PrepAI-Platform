import { useState, useRef, type DragEvent } from 'react';
import {
  FileText,
  UploadCloud,
  ScanLine,
  CheckCircle2,
  XCircle,
  Lightbulb,
  KeyRound,
  AlertTriangle,
  FileCheck2,
  X,
  Sparkles,
  Zap,
  Hash,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge } from './ui';
import { SAMPLE_JOB_DESCRIPTION, SAMPLE_RESUME } from '../data/resume';
import { scanResume, type AtsResult } from '../lib/ats';

type Tab = 'matched' | 'missing' | 'formatting';

const SCANNING_STEPS = [
  'Parsing resume text…',
  'Lowercasing & stripping punctuation…',
  'Tokenizing job description…',
  'Indexing hard-skill dictionary…',
  'Computing keyword match ratio…',
  'Detecting impact verbs & weak phrasing…',
  'Generating ATS compatibility report…',
];

export function ResumeView() {
  const [jd, setJd] = useState(SAMPLE_JOB_DESCRIPTION);
  const [resume, setResume] = useState(SAMPLE_RESUME);
  const [fileName, setFileName] = useState<string | null>(
    'aarav_mehta_resume.txt',
  );
  const [dragOver, setDragOver] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<AtsResult | null>(null);
  const [tab, setTab] = useState<Tab>('matched');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) {
      setFileName(f.name);
      const reader = new FileReader();
      reader.onload = () => setResume(String(reader.result ?? ''));
      reader.readAsText(f);
    }
  };

  const handleScan = () => {
    setScanning(true);
    setScanStep(0);
    setResult(null);
    const interval = setInterval(() => {
      setScanStep((s) => {
        if (s >= SCANNING_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setResult(scanResume(jd, resume));
            setScanning(false);
          }, 500);
          return s;
        }
        return s + 1;
      });
    }, 420);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Resume Tailoring & ATS Score Checker"
        subtitle="Paste a job description and your resume text. Our engine cleans, tokenizes, and indexes hard skills to compute a real keyword match ratio."
        icon={<FileText className="h-5 w-5" />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left panel: inputs */}
        <GlassCard className="p-6">
          <h2 className="mb-1 font-display text-lg font-semibold text-neutral-100">
            Job Description
          </h2>
          <p className="mb-4 text-xs text-neutral-500">
            Paste the full JD you're targeting for a tailored scan.
          </p>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={8}
            className="w-full resize-none rounded-xl bg-neutral-900/60 border border-neutral-800/60 p-4 text-sm text-neutral-200 shadow-concave transition-all duration-500 placeholder:text-neutral-600 focus:border-cyan-500/60 focus:shadow-glow focus:outline-none"
            placeholder="Paste the job description here…"
          />

          <h3 className="mb-1 mt-6 font-display text-sm font-semibold text-neutral-200">
            Resume Content
          </h3>
          <p className="mb-3 text-xs text-neutral-500">
            Paste your plain-text resume, or drop a .txt file below to load it.
          </p>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={8}
            className="w-full resize-none rounded-xl bg-neutral-900/60 border border-neutral-800/60 p-4 text-sm text-neutral-200 shadow-concave transition-all duration-500 placeholder:text-neutral-600 focus:border-cyan-500/60 focus:shadow-glow focus:outline-none"
            placeholder="Paste your resume plain text here…"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInput.current?.click()}
            className={`mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-6 text-center transition-all duration-500 ${
              dragOver
                ? 'border-cyan-400/70 bg-cyan-500/5 shadow-glow'
                : 'border-neutral-700/60 bg-neutral-900/40 hover:border-neutral-600'
            }`}
          >
            <UploadCloud
              className={`h-7 w-7 transition-colors ${
                dragOver ? 'text-cyan-400' : 'text-neutral-500'
              }`}
            />
            <p className="text-sm text-neutral-300">
              Drag & drop a .txt resume to auto-fill
            </p>
            <p className="text-xs text-neutral-500">TXT files · parsed client-side</p>
            <input
              ref={fileInput}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFileName(f.name);
                  const reader = new FileReader();
                  reader.onload = () => setResume(String(reader.result ?? ''));
                  reader.readAsText(f);
                }
              }}
            />
          </div>

          {fileName && (
            <div className="mt-3 flex items-center justify-between rounded-lg border border-neutral-800/60 bg-neutral-900/50 px-3 py-2">
              <span className="flex items-center gap-2 text-xs text-neutral-300">
                <FileCheck2 className="h-4 w-4 text-emerald-400" />
                {fileName}
              </span>
              <button
                onClick={() => setFileName(null)}
                className="text-neutral-500 hover:text-rose-400 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={scanning || !jd.trim() || !resume.trim()}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/90 to-emerald-500/80 py-3 text-sm font-semibold text-neutral-950 shadow-convex transition-all duration-500 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-convex"
          >
            <ScanLine className="h-4 w-4 transition-transform group-hover:rotate-12" />
            {scanning ? 'Scanning…' : 'Scan Resume'}
          </button>
        </GlassCard>

        {/* Right panel: results */}
        <GlassCard className="p-6">
          {scanning ? (
            <ScanningSequence step={scanStep} />
          ) : result ? (
            <ResultPanel result={result} tab={tab} setTab={setTab} />
          ) : (
            <EmptyResult />
          )}
        </GlassCard>
      </div>
    </div>
  );
}

function ScanningSequence({ step }: { step: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-16">
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-neutral-800/60" />
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin-slow" />
        <div
          className="absolute inset-3 rounded-full border-b-2 border-emerald-400/70 animate-spin-slow"
          style={{ animationDuration: '4s' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanLine className="h-9 w-9 text-cyan-400 animate-pulse" />
        </div>
      </div>
      <h3 className="mt-6 font-display text-lg font-semibold text-neutral-100">
        Analyzing your resume
      </h3>
      <p className="mt-1 h-5 text-sm text-cyan-400 transition-all duration-300">
        {SCANNING_STEPS[step]}
      </p>
      <div className="mt-5 flex gap-1.5">
        {SCANNING_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i <= step ? 'w-6 bg-cyan-400' : 'w-3 bg-neutral-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900/60 border border-neutral-800/60 shadow-concave">
        <FileText className="h-7 w-7 text-neutral-600" />
      </div>
      <p className="mt-4 font-display text-base font-medium text-neutral-300">
        No scan yet
      </p>
      <p className="mt-1 max-w-xs text-sm text-neutral-500">
        Add a job description and resume, then hit "Scan Resume" to compute your
        real ATS keyword match score.
      </p>
    </div>
  );
}

function ResultPanel({
  result,
  tab,
  setTab,
}: {
  result: AtsResult;
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  const scoreColor =
    result.score >= 80
      ? '#34d399'
      : result.score >= 60
      ? '#22d3ee'
      : '#fbbf24';

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'matched',
      label: 'Matched',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      count: result.matchedKeywords.length,
    },
    {
      id: 'missing',
      label: 'Missing / Gaps',
      icon: <XCircle className="h-3.5 w-3.5" />,
      count: result.missingKeywords.length,
    },
    {
      id: 'formatting',
      label: 'Formatting & Verbs',
      icon: <Lightbulb className="h-3.5 w-3.5" />,
      count: result.formattingSuggestions.length + result.impactVerbSuggestions.length,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Score */}
      <div className="flex flex-col items-center pb-5">
        <div className="relative h-40 w-40">
          <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke="rgba(38,38,38,0.6)"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(result.score / 100) * 427} 427`}
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${scoreColor}80)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-display text-4xl font-bold"
              style={{ color: scoreColor }}
            >
              {result.score}%
            </span>
            <span className="text-xs text-neutral-500">ATS Match</span>
          </div>
        </div>
        <Badge
          tone={result.score >= 80 ? 'emerald' : result.score >= 60 ? 'cyan' : 'amber'}
          className="mt-2"
        >
          <Sparkles className="h-3 w-3" />
          {result.score >= 80 ? 'Strong match' : result.score >= 60 ? 'Good match' : 'Needs work'}
        </Badge>
        <p className="mt-3 max-w-sm text-center text-xs text-neutral-400">
          {result.summary}
        </p>
        <div className="mt-3 flex gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Hash className="h-3 w-3 text-cyan-400" />
            {result.jdSkillCount} JD skills
          </span>
          <span className="flex items-center gap-1">
            <KeyRound className="h-3 w-3 text-emerald-400" />
            {result.resumeSkillCount} resume skills
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl bg-neutral-900/60 p-1 shadow-concave">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all duration-300 ${
              tab === t.id
                ? 'bg-neutral-800/70 text-cyan-300 shadow-convex'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
            <span className="rounded-full bg-neutral-800/60 px-1.5 text-[10px]">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto pr-1">
        {tab === 'matched' && (
          <div className="space-y-2 animate-fade-in">
            {result.matchedKeywords.length === 0 ? (
              <p className="py-6 text-center text-sm text-neutral-500">
                No keyword matches detected. Tailor your resume to the JD.
              </p>
            ) : (
              result.matchedKeywords.map((k) => (
                <div
                  key={k.keyword}
                  className="flex items-center justify-between rounded-lg border border-emerald-500/15 bg-emerald-500/5 px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-sm text-neutral-200">
                    <KeyRound className="h-3.5 w-3.5 text-emerald-400" />
                    {k.keyword}
                  </span>
                  <span className="text-xs text-emerald-300">×{k.count}</span>
                </div>
              ))
            )}
          </div>
        )}
        {tab === 'missing' && (
          <div className="animate-fade-in">
            {result.missingKeywords.length === 0 ? (
              <p className="py-6 text-center text-sm text-emerald-400">
                No gaps — every JD keyword is present in your resume.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((k) => (
                  <span
                    key={k}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-1.5 text-sm text-rose-200"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                    {k}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === 'formatting' && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Lightbulb className="h-3.5 w-3.5" /> Formatting Suggestions
              </p>
              <ul className="space-y-2">
                {result.formattingSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-300"
                  >
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Zap className="h-3.5 w-3.5" /> Impact Verb Analysis
              </p>
              <ul className="space-y-2">
                {result.impactVerbSuggestions.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-2.5 text-sm text-neutral-300"
                  >
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
