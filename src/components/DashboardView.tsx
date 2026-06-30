import {
  Mic,
  Gauge,
  Route,
  Flame,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  MessagesSquare,
  ArrowUpRight,
  Calendar,
  Target,
} from 'lucide-react';
import { GlassCard, SectionHeader, Badge, ProgressBar } from './ui';
import {
  DASHBOARD_STATS,
  RECENT_ACTIVITY,
  WEEKLY_ACTIVITY,
  USER,
} from '../data/navigation';

const STAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic,
  Gauge,
  Route,
  Flame,
};

const ACTIVITY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Mic,
  FileText,
  Route,
  MessagesSquare,
};

const accentText: Record<string, string> = {
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  violet: 'text-violet-400',
};

const accentBg: Record<string, string> = {
  cyan: 'bg-cyan-500/10 border-cyan-500/20',
  emerald: 'bg-emerald-500/10 border-emerald-500/20',
  amber: 'bg-amber-500/10 border-amber-500/20',
  violet: 'bg-violet-500/10 border-violet-500/20',
};

const trendIcon = {
  up: <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />,
  down: <TrendingDown className="h-3.5 w-3.5 text-rose-400" />,
  flat: <Minus className="h-3.5 w-3.5 text-neutral-500" />,
};

export function DashboardView() {
  const maxActivity = Math.max(...WEEKLY_ACTIVITY.map((d) => d.value));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard"
        subtitle={`Welcome back, ${USER.name.split(' ')[0]}. Here's your interview readiness at a glance.`}
        icon={<Gauge className="h-5 w-5" />}
        action={
          <Badge tone="emerald">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems nominal
          </Badge>
        }
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => {
          const Icon = STAT_ICONS[stat.icon] ?? Gauge;
          return (
            <GlassCard
              key={stat.id}
              hover
              className="animate-fade-in-up p-5"
            >
              <span
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${accentBg[stat.accent]}`}
              >
                <Icon className={`h-5 w-5 ${accentText[stat.accent]}`} />
              </span>
              <div className="flex items-baseline justify-between">
                <p className="font-display text-3xl font-bold text-neutral-100">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  {trendIcon[stat.trend]}
                </div>
              </div>
              <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
              <p className="mt-2 text-xs text-neutral-500">{stat.delta}</p>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Weekly activity chart */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-neutral-100">
                Weekly Activity
              </h2>
              <p className="text-sm text-neutral-400">
                Prep minutes logged across all modules
              </p>
            </div>
            <Badge tone="cyan">
              <Target className="h-3 w-3" />
              471 min this week
            </Badge>
          </div>
          <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
            {WEEKLY_ACTIVITY.map((d, i) => (
              <div
                key={d.day}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500/30 to-cyan-400/70 transition-all duration-700 ease-out group-hover:from-cyan-500/50 group-hover:to-cyan-300"
                    style={{
                      height: `${(d.value / maxActivity) * 100}%`,
                      animationDelay: `${i * 60}ms`,
                    }}
                  />
                  <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900/90 border border-neutral-700/60 px-2 py-0.5 text-[10px] text-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {d.value}m
                  </div>
                </div>
                <span className="text-xs text-neutral-500">{d.day}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Profile widget */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 text-lg font-semibold text-cyan-200 border border-cyan-500/20 shadow-convex">
              {USER.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold text-neutral-100">
                {USER.name}
              </p>
              <p className="truncate text-sm text-neutral-400">{USER.role}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
                <Calendar className="h-3 w-3" /> Joined {USER.joinedDate}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Roadmap Progress</span>
                <span className="text-cyan-300 font-medium">45%</span>
              </div>
              <ProgressBar value={45} tone="cyan" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Avg ATS Score</span>
                <span className="text-emerald-300 font-medium">78%</span>
              </div>
              <ProgressBar value={78} tone="emerald" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Interview Readiness</span>
                <span className="text-amber-300 font-medium">62%</span>
              </div>
              <ProgressBar value={62} tone="amber" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-neutral-800/60 bg-neutral-900/50 px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              Current streak
            </span>
            <span className="font-display text-lg font-bold text-amber-300">
              {USER.streak} days
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Recent activity feed */}
      <GlassCard className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-neutral-100">
            Recent Activity
          </h2>
          <button className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            View all <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <ul className="space-y-1">
          {RECENT_ACTIVITY.map((item, i) => {
            const Icon = ACTIVITY_ICONS[item.icon] ?? Mic;
            return (
              <li
                key={item.id}
                className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-neutral-800/30 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${accentBg[item.accent]}`}
                >
                  <Icon className={`h-4 w-4 ${accentText[item.accent]}`} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-200">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-neutral-500">{item.meta}</p>
                </div>
                <span className="shrink-0 text-xs text-neutral-500">
                  {item.time}
                </span>
              </li>
            );
          })}
        </ul>
      </GlassCard>
    </div>
  );
}
