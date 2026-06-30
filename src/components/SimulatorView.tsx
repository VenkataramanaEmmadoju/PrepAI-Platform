import { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Send,
  Bot,
  User,
  Sparkles,
  ClipboardList,
  ChevronRight,
  CheckCircle2,
  Circle,
  TrendingUp,
  MessageSquare,
  Cpu,
  Lightbulb,
  ArrowLeft,
  Radio,
  Square,
  Play,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, ProgressBar } from './ui';
import {
  INTERVIEW_SEQUENCE,
  FEEDBACK_REPORTS,
  type FeedbackReport,
} from '../data/interview';

type Mode = 'simulator' | 'feedback';

interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  text: string;
  category?: string;
}

export function SimulatorView() {
  const [mode, setMode] = useState<Mode>('simulator');

  return (
    <div className="space-y-6">
      <SectionHeader
        title="AI Mock Interview Simulator"
        subtitle="Run a live text-based interview against our AI interviewer, then review detailed grading in your Feedback Hub."
        icon={<Mic className="h-5 w-5" />}
        action={
          <div className="flex gap-1 rounded-xl bg-neutral-900/60 p-1 shadow-concave">
            <button
              onClick={() => setMode('simulator')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                mode === 'simulator'
                  ? 'bg-neutral-800/70 text-cyan-300 shadow-convex'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Radio className="h-3.5 w-3.5" /> Simulator
            </button>
            <button
              onClick={() => setMode('feedback')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                mode === 'feedback'
                  ? 'bg-neutral-800/70 text-cyan-300 shadow-convex'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <ClipboardList className="h-3.5 w-3.5" /> My Feedbacks
            </button>
          </div>
        }
      />

      {mode === 'simulator' ? <Simulator /> : <FeedbackHub />}
    </div>
  );
}

function Simulator() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [qIndex, setQIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const start = () => {
    setRunning(true);
    setFinished(false);
    setMessages([
      {
        id: 'm0',
        role: 'ai',
        text: INTERVIEW_SEQUENCE[0].prompt,
        category: INTERVIEW_SEQUENCE[0].category,
      },
    ]);
    setQIndex(0);
  };

  const submit = () => {
    if (!input.trim() || !running) return;
    const userMsg: ChatMessage = {
      id: `u${messages.length}`,
      role: 'user',
      text: input.trim(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    const nextIndex = qIndex + 1;
    setTimeout(() => {
      if (nextIndex < INTERVIEW_SEQUENCE.length) {
        const q = INTERVIEW_SEQUENCE[nextIndex];
        setMessages((m) => [
          ...m,
          {
            id: `a${nextIndex}`,
            role: 'ai',
            text: q.prompt,
            category: q.category,
          },
        ]);
        setQIndex(nextIndex);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: 'done',
            role: 'ai',
            text: "That concludes the interview. Thank you for your time — I've generated a detailed feedback report. Head to the 'My Feedbacks' tab to review your scores across Communication, Technical Accuracy, and Problem Solving.",
          },
        ]);
        setFinished(true);
        setRunning(false);
      }
    }, 700);
  };

  const reset = () => {
    setMessages([]);
    setQIndex(0);
    setRunning(false);
    setFinished(false);
  };

  const progress = running
    ? Math.round((qIndex / INTERVIEW_SEQUENCE.length) * 100)
    : finished
    ? 100
    : 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Video/audio stream box */}
      <div className="lg:col-span-1 space-y-6">
        <GlassCard className="p-5">
          <h3 className="mb-3 font-display text-sm font-semibold text-neutral-200">
            Interview Stream
          </h3>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            {/* scanline texture */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.015)_3px,rgba(255,255,255,0.015)_4px)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900/70 border border-cyan-500/30">
                  <Bot className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              <p className="text-xs text-neutral-400">PrepAI Interviewer</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-rose-400">
                  {running ? 'Live' : 'Standby'}
                </span>
              </div>
            </div>
            {/* corner brackets */}
            <div className="absolute left-2 top-2 h-4 w-4 border-l border-t border-cyan-400/40" />
            <div className="absolute right-2 top-2 h-4 w-4 border-r border-t border-cyan-400/40" />
            <div className="absolute left-2 bottom-2 h-4 w-4 border-l border-b border-cyan-400/40" />
            <div className="absolute right-2 bottom-2 h-4 w-4 border-r border-b border-cyan-400/40" />
          </div>

          {/* Mic indicator */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-neutral-800/60 bg-neutral-900/40 px-3 py-2.5">
            <span className="flex items-center gap-2 text-xs text-neutral-400">
              <Mic className={`h-3.5 w-3.5 ${micActive ? 'text-cyan-400' : 'text-neutral-600'}`} />
              Microphone
            </span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-1 origin-bottom rounded-full transition-all duration-300 ${
                    micActive ? 'bg-cyan-400' : 'bg-neutral-700'
                  }`}
                  style={{
                    height: micActive ? `${8 + Math.abs(Math.sin((Date.now() / 200) + i)) * 14}px` : '4px',
                    animation: micActive ? 'mic-bounce 0.6s ease-in-out infinite' : 'none',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setMicActive((m) => !m)}
              className={`rounded-lg px-2 py-1 text-[10px] font-medium transition-all ${
                micActive
                  ? 'bg-cyan-500/15 text-cyan-300'
                  : 'bg-neutral-800/60 text-neutral-400'
              }`}
            >
              {micActive ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Controls */}
          <div className="mt-4 flex gap-2">
            {!running && !finished && (
              <button
                onClick={start}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/90 to-emerald-500/80 py-2.5 text-sm font-semibold text-neutral-950 shadow-convex transition-all duration-500 hover:shadow-glow"
              >
                <Play className="h-4 w-4" /> Start Interview
              </button>
            )}
            {(running || finished) && (
              <button
                onClick={reset}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800/60 bg-neutral-900/40 py-2.5 text-sm font-medium text-neutral-300 transition-all hover:bg-neutral-800/40"
              >
                <Square className="h-3.5 w-3.5" /> {finished ? 'Restart' : 'End'}
              </button>
            )}
          </div>
        </GlassCard>

        {/* Progress */}
        <GlassCard className="p-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Interview Progress</span>
            <span className="text-cyan-300 font-medium">
              {Math.min(qIndex + (running ? 1 : 0), INTERVIEW_SEQUENCE.length)}/
              {INTERVIEW_SEQUENCE.length}
            </span>
          </div>
          <ProgressBar value={progress} tone="cyan" />
          <div className="mt-4 space-y-2">
            {INTERVIEW_SEQUENCE.map((q, i) => (
              <div
                key={q.id}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  i < qIndex || finished
                    ? 'text-emerald-400'
                    : i === qIndex && running
                    ? 'text-cyan-300'
                    : 'text-neutral-600'
                }`}
              >
                {i < qIndex || finished ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
                <span className="truncate">Q{i + 1} · {q.category}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Dialogue terminal */}
      <div className="lg:col-span-2">
        <GlassCard className="flex h-full flex-col p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-neutral-200">
              Dialogue Terminal
            </h3>
            <Badge tone={running ? 'cyan' : 'neutral'}>
              <span className={`h-1.5 w-1.5 rounded-full ${running ? 'bg-cyan-400 animate-pulse' : 'bg-neutral-600'}`} />
              {running ? 'In session' : 'Idle'}
            </Badge>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-neutral-800/60 bg-neutral-950/40 p-4 min-h-[360px] max-h-[480px]"
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900/60 border border-neutral-800/60 shadow-concave">
                  <Sparkles className="h-6 w-6 text-cyan-400" />
                </div>
                <p className="mt-4 font-display text-base font-medium text-neutral-300">
                  Ready when you are
                </p>
                <p className="mt-1 max-w-xs text-sm text-neutral-500">
                  Hit "Start Interview" to begin a 5-question mock session. The
                  AI interviewer will guide you through behavioral, technical, and
                  system design rounds.
                </p>
              </div>
            ) : (
              messages.map((m) => <ChatBubble key={m.id} message={m} />)
            )}
          </div>

          {/* Input */}
          <div className="mt-4 flex items-end gap-2">
            <div className="flex-1 rounded-xl border border-neutral-800/60 bg-neutral-900/60 px-3 py-2 shadow-concave transition-all duration-500 focus-within:border-cyan-500/60 focus-within:shadow-glow">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                disabled={!running}
                rows={2}
                placeholder={running ? 'Type your response… (Enter to send)' : 'Start the interview to respond'}
                className="w-full resize-none bg-transparent text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none disabled:cursor-not-allowed"
              />
            </div>
            <button
              onClick={submit}
              disabled={!running || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/90 to-emerald-500/80 text-neutral-950 shadow-convex transition-all duration-500 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send response"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAi = message.role === 'ai';
  return (
    <div
      className={`flex gap-3 animate-fade-in-up ${isAi ? '' : 'flex-row-reverse'}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
          isAi
            ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}
      >
        {isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className={`max-w-[80%] ${isAi ? '' : 'text-right'}`}>
        {message.category && (
          <span className="mb-1 inline-block rounded-md bg-neutral-800/40 px-1.5 py-0.5 text-[10px] text-neutral-500">
            {message.category}
          </span>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isAi
              ? 'bg-neutral-900/60 border border-neutral-800/60 text-neutral-200'
              : 'bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 border border-cyan-500/20 text-neutral-100'
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

function FeedbackHub() {
  const [selected, setSelected] = useState<FeedbackReport | null>(null);

  if (selected) {
    return <ReportDetail report={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          {FEEDBACK_REPORTS.length} feedback reports from past mock interviews
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {FEEDBACK_REPORTS.map((report, i) => (
          <GlassCard
            key={report.id}
            hover
            className="cursor-pointer p-5 animate-fade-in-up"
          >
            <button
              onClick={() => setSelected(report)}
              className="flex h-full w-full flex-col text-left"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="relative h-14 w-14">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(38,38,38,0.6)" strokeWidth="4" />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke={report.overallScore >= 80 ? '#34d399' : report.overallScore >= 70 ? '#22d3ee' : '#fbbf24'}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(report.overallScore / 100) * 150} 150`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-neutral-100">
                    {report.overallScore}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-neutral-600" />
              </div>
              <p className="font-display text-sm font-semibold text-neutral-100">
                {report.role}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {report.date} · {report.duration}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {report.criteria.map((c) => (
                  <span
                    key={c.label}
                    className="rounded-md bg-neutral-800/40 px-1.5 py-0.5 text-[10px] text-neutral-400"
                  >
                    {c.label} {c.score}
                  </span>
                ))}
              </div>
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function ReportDetail({ report, onBack }: { report: FeedbackReport; onBack: () => void }) {
  const scoreColor = report.overallScore >= 80 ? '#34d399' : report.overallScore >= 70 ? '#22d3ee' : '#fbbf24';
  return (
    <div className="space-y-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition-all hover:bg-neutral-800/40 hover:text-neutral-100"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All feedbacks
      </button>

      <GlassCard className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(38,38,38,0.6)" strokeWidth="6" />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke={scoreColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(report.overallScore / 100) * 264} 264`}
                  style={{ filter: `drop-shadow(0 0 6px ${scoreColor}80)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-bold" style={{ color: scoreColor }}>
                  {report.overallScore}
                </span>
                <span className="text-[10px] text-neutral-500">/ 100</span>
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-neutral-100">
                {report.role}
              </h2>
              <p className="text-sm text-neutral-400">
                {report.date} · {report.duration} session
              </p>
              <Badge tone={report.overallScore >= 80 ? 'emerald' : 'cyan'} className="mt-2">
                <TrendingUp className="h-3 w-3" />
                {report.overallScore >= 80 ? 'Strong performance' : 'Solid — room to grow'}
              </Badge>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Criteria */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {report.criteria.map((c) => {
          const icon =
            c.label === 'Communication' ? (
              <MessageSquare className="h-4 w-4" />
            ) : c.label === 'Technical Accuracy' ? (
              <Cpu className="h-4 w-4" />
            ) : (
              <Lightbulb className="h-4 w-4" />
            );
          return (
            <GlassCard key={c.label} className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  {icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">{c.label}</p>
                  <p className="text-xs text-neutral-500">Score {c.score}/100</p>
                </div>
              </div>
              <ProgressBar
                value={c.score}
                tone={c.score >= 80 ? 'emerald' : c.score >= 70 ? 'cyan' : 'amber'}
                className="mb-3"
              />
              <p className="mb-3 text-xs text-neutral-400">{c.summary}</p>
              <ul className="space-y-1.5">
                {c.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                    {imp}
                  </li>
                ))}
              </ul>
            </GlassCard>
          );
        })}
      </div>

      {/* Highlights & next steps */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-neutral-100">
            <Sparkles className="h-4 w-4 text-emerald-400" /> Highlights
          </h3>
          <ul className="space-y-2">
            {report.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {h}
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-neutral-100">
            <TrendingUp className="h-4 w-4 text-cyan-400" /> Recommended Next Steps
          </h3>
          <ul className="space-y-2">
            {report.nextSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-[10px] text-cyan-400">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
