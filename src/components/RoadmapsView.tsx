import { useState } from 'react';
import {
  Compass,
  Cpu,
  Code2,
  Layers,
  CircuitBoard,
  Server,
  MonitorSmartphone,
  Database,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  Check,
  BookOpen,
  Clock,
  Sparkles,
  TrendingUp,
  CircleDot,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, ProgressBar } from './ui';
import { DOMAINS, type Domain, type Role } from '../data/roadmaps';

const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Code2,
};

const ROLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  CircuitBoard,
  Server,
  MonitorSmartphone,
  Database,
  BrainCircuit,
};

type Stage = { domain: Domain | null; role: Role | null };

export function RoadmapsView() {
  const [stage, setStage] = useState<Stage>({
    domain: null,
    role: null,
  });
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) =>
    setCompleted((c) => ({ ...c, [id]: !c[id] }));

  const reset = () => setStage({ domain: null, role: null });

  if (stage.role) {
    return (
      <RoadmapDetail
        role={stage.role}
        completed={completed}
        onToggle={toggleStep}
        onBack={() => setStage((s) => ({ ...s, role: null }))}
        onReset={reset}
      />
    );
  }

  if (stage.domain) {
    return (
      <RoleSelection
        domain={stage.domain}
        onSelect={(role) => setStage((s) => ({ ...s, role }))}
        onBack={reset}
      />
    );
  }

  return <DomainSelection onSelect={(d) => setStage({ domain: d, role: null })} />;
}

function DomainSelection({ onSelect }: { onSelect: (d: Domain) => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Domain Selection"
        subtitle="Choose your engineering track. Each domain unlocks tailored roles and a visual learning roadmap."
        icon={<Compass className="h-5 w-5" />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {DOMAINS.map((domain, i) => {
          const Icon = DOMAIN_ICONS[domain.icon] ?? Cpu;
          const accent = domain.accent;
          return (
            <GlassCard
              key={domain.id}
              hover
              className="group cursor-pointer p-7 animate-fade-in-up"
            >
              <button
                onClick={() => onSelect(domain)}
                className="flex h-full w-full flex-col text-left"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mb-5 flex items-start justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                      accent === 'cyan'
                        ? 'bg-cyan-500/10 border-cyan-500/20'
                        : 'bg-emerald-500/10 border-emerald-500/20'
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${
                        accent === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                      }`}
                    />
                  </span>
                  <ArrowRight
                    className={`h-5 w-5 translate-x-0 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 ${
                      accent === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                    }`}
                  />
                </div>
                <h2 className="font-display text-xl font-semibold text-neutral-100">
                  {domain.name}
                </h2>
                <p className="mt-2 text-sm text-neutral-400">
                  {domain.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {domain.roles.map((r) => (
                    <Badge key={r.id} tone={accent}>
                      <CircleDot className="h-2.5 w-2.5" />
                      {r.name}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs text-neutral-500">
                  <Sparkles className="h-3 w-3" />
                  {domain.roles.length} curated roles · Full roadmaps included
                </div>
              </button>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function RoleSelection({
  domain,
  onSelect,
  onBack,
}: {
  domain: Domain;
  onSelect: (r: Role) => void;
  onBack: () => void;
}) {
  const Icon = DOMAIN_ICONS[domain.icon] ?? Cpu;
  return (
    <div className="space-y-6">
      <SectionHeader
        title={`${domain.name} · Select a Role`}
        subtitle="Pick the role you're targeting. We'll generate a stepped roadmap from foundational to advanced."
        icon={<Icon className="h-5 w-5" />}
        action={
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition-all hover:bg-neutral-800/40 hover:text-neutral-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Domains
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {domain.roles.map((role, i) => {
          const RoleIcon = ROLE_ICONS[role.icon] ?? Layers;
          return (
            <GlassCard
              key={role.id}
              hover
              className="group cursor-pointer p-6 animate-fade-in-up"
            >
              <button
                onClick={() => onSelect(role)}
                className="flex h-full w-full flex-col text-left"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                      domain.accent === 'cyan'
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    <RoleIcon className="h-5 w-5" />
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 ${
                      domain.accent === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                    }`}
                  />
                </div>
                <h3 className="font-display text-base font-semibold text-neutral-100">
                  {role.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-400">{role.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-neutral-500">
                    <TrendingUp className="h-3 w-3 text-emerald-400" />
                    {role.demand} demand
                  </span>
                  <span className="text-neutral-400">{role.avgSalary}</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-500">
                  <BookOpen className="h-3 w-3" />
                  {role.roadmap.length} levels ·{' '}
                  {role.roadmap.reduce((n, l) => n + l.steps.length, 0)} modules
                </div>
              </button>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function RoadmapDetail({
  role,
  completed,
  onToggle,
  onBack,
  onReset,
}: {
  role: Role;
  completed: Record<string, boolean>;
  onToggle: (id: string) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const allSteps = role.roadmap.flatMap((l) => l.steps);
  const doneCount = allSteps.filter((s) => completed[s.id]).length;
  const pct = Math.round((doneCount / allSteps.length) * 100);

  return (
    <div className="space-y-6">
      <SectionHeader
        title={role.name}
        subtitle={role.tagline}
        icon={<Layers className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition-all hover:bg-neutral-800/40 hover:text-neutral-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Roles
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-300 transition-all hover:bg-neutral-800/40 hover:text-neutral-100"
            >
              <Compass className="h-3.5 w-3.5" /> Domains
            </button>
          </div>
        }
      />

      {/* Progress overview */}
      <GlassCard className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(38,38,38,0.6)"
                  strokeWidth="5"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 176} 176`}
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-display text-sm font-bold text-neutral-100">
                {pct}%
              </span>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-neutral-100">
                Roadmap Progress
              </p>
              <p className="text-sm text-neutral-400">
                {doneCount} of {allSteps.length} modules complete
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-neutral-500">Demand</p>
              <p className="text-sm font-medium text-emerald-300">{role.demand}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Avg Salary</p>
              <p className="text-sm font-medium text-neutral-200">
                {role.avgSalary}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={pct} tone="cyan" />
        </div>
      </GlassCard>

      {/* Roadmap levels */}
      <div className="space-y-8">
        {role.roadmap.map((level, li) => (
          <div key={level.id}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900/60 border border-neutral-800/60 font-display text-sm font-bold text-cyan-400 shadow-concave">
                {li + 1}
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-neutral-100">
                  {level.label}
                </h2>
                <p className="text-xs text-neutral-500">{level.subtitle}</p>
              </div>
            </div>

            <div className="relative space-y-4 pl-4">
              {/* vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 via-neutral-700/40 to-transparent" />
              {level.steps.map((step) => {
                const isDone = !!completed[step.id];
                return (
                  <GlassCard
                    key={step.id}
                    className="relative p-5 animate-fade-in-up"
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => onToggle(step.id)}
                        className={`relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isDone
                            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                            : 'border-neutral-700 bg-neutral-900 text-transparent hover:border-cyan-400'
                        }`}
                        aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {isDone && <Check className="h-4 w-4" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3
                            className={`font-display text-base font-semibold transition-colors ${
                              isDone ? 'text-neutral-400 line-through' : 'text-neutral-100'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <Badge tone="neutral">
                            <Clock className="h-3 w-3" />
                            {step.estHours}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-neutral-400">
                          {step.description}
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {step.skills.map((skill) => (
                            <div
                              key={skill.name}
                              className="flex items-center justify-between gap-2 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-2 transition-all hover:border-neutral-700/80 hover:bg-neutral-900/60"
                            >
                              <span className="flex items-center gap-2 text-xs text-neutral-300">
                                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                                {skill.name}
                              </span>
                              <span className="shrink-0 text-[10px] text-neutral-500">
                                {skill.resource}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
