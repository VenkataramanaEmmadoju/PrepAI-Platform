import { useState } from 'react';
import {
  MessagesSquare,
  ChevronDown,
  Lightbulb,
  Filter,
  Brain,
  Code2,
  Network,
  Tag,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge } from './ui';
import {
  QUESTIONS,
  QA_ROLES,
  QA_DIFFICULTIES,
  QA_COMPANIES,
  type Question,
  type QuestionDifficulty,
} from '../data/questions';

const difficultyTone: Record<QuestionDifficulty, 'violet' | 'cyan' | 'emerald'> = {
  Behavioral: 'violet',
  Technical: 'cyan',
  'System Design': 'emerald',
};

const difficultyIcon: Record<QuestionDifficulty, React.ReactNode> = {
  Behavioral: <Brain className="h-3.5 w-3.5" />,
  Technical: <Code2 className="h-3.5 w-3.5" />,
  'System Design': <Network className="h-3.5 w-3.5" />,
};

export function QaView() {
  const [role, setRole] = useState<string>(QA_ROLES[0]);
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | 'All'>('All');
  const [company, setCompany] = useState<string>('All');
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const filtered = QUESTIONS.filter(
    (q) =>
      q.role === role &&
      (difficulty === 'All' || q.difficulty === difficulty) &&
      (company === 'All' || q.company === company),
  );

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Interview Q&A Prep Zone"
        subtitle="High-frequency questions sourced from Tier-1 companies. Filter by role, difficulty, and target company. Reveal the structured ideal answer when you're ready to self-assess."
        icon={<MessagesSquare className="h-5 w-5" />}
      />

      {/* Filters */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
          <Filter className="h-3.5 w-3.5" /> Filters
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-400">
              Role
            </label>
            <div className="flex flex-wrap gap-2">
              {QA_ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    role === r
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-convex'
                      : 'border-neutral-800/60 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-400">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDifficulty('All')}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                  difficulty === 'All'
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-convex'
                    : 'border-neutral-800/60 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                All
              </button>
              {QA_DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    difficulty === d
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-convex'
                      : 'border-neutral-800/60 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  {difficultyIcon[d]}
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-400">
              Target Company
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCompany('All')}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                  company === 'All'
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-convex'
                    : 'border-neutral-800/60 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                All
              </button>
              {QA_COMPANIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCompany(c)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    company === c
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-convex'
                      : 'border-neutral-800/60 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <Building2 className="h-3 w-3" />
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>
            Showing <span className="text-neutral-300">{filtered.length}</span>{' '}
            questions
          </span>
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" /> {role}
            {company !== 'All' && ` · ${company}`}
          </span>
        </div>
      </GlassCard>

      {/* Cards */}
      {filtered.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="text-sm text-neutral-400">
            No questions match these filters. Try a different role, difficulty, or
            company.
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filtered.map((q, i) => (
            <QaCard
              key={q.id}
              question={q}
              open={!!open[q.id]}
              onToggle={() => toggle(q.id)}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QaCard({
  question,
  open,
  onToggle,
  index,
}: {
  question: Question;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <GlassCard hover className="animate-fade-in-up p-5">
      <div style={{ animationDelay: `${index * 60}ms` }}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <Badge tone={difficultyTone[question.difficulty]}>
            {difficultyIcon[question.difficulty]}
            {question.difficulty}
          </Badge>
          <Badge tone="cyan">
            <Building2 className="h-3 w-3" />
            {question.company}
          </Badge>
        </div>

        <p className="font-display text-base font-medium leading-relaxed text-neutral-100">
          {question.question}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {question.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-neutral-800/40 px-1.5 py-0.5 text-[10px] text-neutral-500"
            >
              #{t}
            </span>
          ))}
        </div>

        <button
          onClick={onToggle}
          className="mt-4 flex w-full items-center justify-between rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3.5 py-2.5 text-xs font-medium text-cyan-300 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/5"
        >
          <span className="flex items-center gap-2">
            <Lightbulb className="h-3.5 w-3.5" />
            {open ? 'Hide ideal answer' : 'Reveal ideal answer'}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-500 ease-out ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-3 rounded-xl border border-neutral-800/60 bg-neutral-950/40 p-4">
              <p className="mb-3 text-sm text-neutral-300">
                <span className="font-semibold text-cyan-300">Summary: </span>
                {question.idealAnswer.summary}
              </p>
              <ul className="space-y-2">
                {question.idealAnswer.points.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-neutral-400"
                  >
                    {p.startsWith('Result') ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    )}
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
