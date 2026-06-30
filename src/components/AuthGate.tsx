import { useState, type FormEvent } from 'react';
import {
  BrainCircuit,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { USER } from '../data/navigation';

type AuthView = 'signin' | 'signup';

interface AuthGateProps {
  onAuthenticated: () => void;
}

const LOADING_STEPS = [
  'Initializing neural interview engine…',
  'Calibrating ATS scoring models…',
  'Loading your personalized roadmap…',
  'Syncing mock interview history…',
  'Preparing the cockpit…',
];

export function AuthGate({ onAuthenticated }: AuthGateProps) {
  const [view, setView] = useState<AuthView>('signin');
  const [email, setEmail] = useState(USER.email);
  const [password, setPassword] = useState('prepai•demo2025');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((s) => {
        if (s >= LOADING_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(onAuthenticated, 700);
          return s;
        }
        return s + 1;
      });
    }, 650);
  };

  if (loading) {
    return <LoadingSequence step={loadingStep} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-cyan-500/10 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-emerald-500/10 blur-[120px] animate-float-slower" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.06),transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Brand */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900/60 border border-neutral-700/60 shadow-convex">
                <BrainCircuit className="h-7 w-7 text-cyan-400" />
              </div>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-100">
              Prep<span className="text-cyan-400">AI</span>
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              The AI co-pilot for interview mastery
            </p>
          </div>

          {/* Auth plate */}
          <div className="rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 shadow-convex p-7 sm:p-8">
            {/* Toggle */}
            <div className="mb-6 flex rounded-xl bg-neutral-900/60 p-1 shadow-concave">
              {(['signin', 'signup'] as AuthView[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-300 ${
                    view === v
                      ? 'bg-neutral-800/70 text-cyan-300 shadow-convex'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {v === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'signup' && (
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={setName}
                />
              )}
              <Field
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                type="email"
                placeholder="you@prepai.dev"
                value={email}
                onChange={setEmail}
              />
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-neutral-500 hover:text-neutral-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              {view === 'signin' && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-neutral-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 rounded border-neutral-700 bg-neutral-900 text-cyan-500 focus:ring-cyan-500/40"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/90 to-emerald-500/80 py-3 text-sm font-semibold text-neutral-950 shadow-convex transition-all duration-500 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-glow"
              >
                {view === 'signin' ? 'Sign In to PrepAI' : 'Create my account'}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Demo hint */}
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-3 text-xs text-neutral-400">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
              <p>
                <span className="text-neutral-300 font-medium">Recruiter demo:</span>{' '}
                credentials are pre-filled. Just hit{' '}
                <span className="text-cyan-300">Sign In</span> to explore the full
                platform.
              </p>
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Encrypted session · SOC 2 Type II · GDPR ready
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-neutral-400">
        {label}
      </span>
      <div className="group flex items-center gap-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/60 px-3.5 py-3 shadow-concave transition-all duration-500 focus-within:border-cyan-500/60 focus-within:shadow-glow">
        <span className="text-neutral-500 group-focus-within:text-cyan-400 transition-colors">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
        />
        {trailing}
      </div>
    </label>
  );
}

function LoadingSequence({ step }: { step: number }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Orbital loader */}
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-neutral-800/60" />
          <div className="absolute inset-0 rounded-full border-t border-cyan-400/80 animate-spin-slow" />
          <div
            className="absolute inset-2 rounded-full border-b border-emerald-400/60 animate-spin-slow"
            style={{ animationDuration: '5s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="h-10 w-10 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <h2 className="mt-8 font-display text-xl font-semibold text-neutral-100">
          Preparing your workspace
        </h2>
        <p className="mt-2 h-5 text-sm text-cyan-400 transition-all duration-300">
          {LOADING_STEPS[step]}
        </p>

        {/* Step dots */}
        <div className="mt-6 flex gap-2">
          {LOADING_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? 'w-8 bg-cyan-400' : 'w-4 bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
