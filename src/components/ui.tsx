import { type ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'section' | 'article';
};

export function GlassCard({
  children,
  className = '',
  hover = false,
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={`rounded-2xl bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 shadow-convex transition-all duration-500 ease-out ${
        hover
          ? 'hover:-translate-y-1 hover:border-neutral-700/80 hover:bg-neutral-900/50'
          : ''
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function SectionHeader({
  title,
  subtitle,
  icon,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-cyan-400 shadow-concave">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-semibold text-neutral-100 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-neutral-400 max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

type BadgeProps = {
  children: ReactNode;
  tone?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'neutral';
  className?: string;
};

const toneMap: Record<NonNullable<BadgeProps['tone']>, string> = {
  cyan: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  amber: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  violet: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  neutral: 'text-neutral-300 bg-neutral-800/40 border-neutral-700/40',
};

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneMap[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

type ProgressBarProps = {
  value: number;
  max?: number;
  tone?: 'cyan' | 'emerald' | 'amber';
  className?: string;
};

const barToneMap: Record<NonNullable<ProgressBarProps['tone']>, string> = {
  cyan: 'from-cyan-500 to-cyan-300',
  emerald: 'from-emerald-500 to-emerald-300',
  amber: 'from-amber-500 to-amber-300',
};

export function ProgressBar({
  value,
  max = 100,
  tone = 'cyan',
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-neutral-800/60 shadow-concave ${className}`}
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r ${barToneMap[tone]} transition-all duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
