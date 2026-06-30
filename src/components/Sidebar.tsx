import {
  BrainCircuit,
  LayoutDashboard,
  Compass,
  FileText,
  Wand2,
  MessagesSquare,
  Mic,
  LogOut,
  Menu,
  X,
  Flame,
} from 'lucide-react';
import { NAV_ITEMS, USER, type ViewId } from '../data/navigation';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Compass,
  FileText,
  Wand2,
  MessagesSquare,
  Mic,
};

interface SidebarProps {
  active: ViewId;
  onNavigate: (id: ViewId) => void;
  onSignOut: () => void;
  mobileOpen: boolean;
  onMobileOpen: () => void;
  onMobileClose: () => void;
}

export function Sidebar({
  active,
  onNavigate,
  onSignOut,
  mobileOpen,
  onMobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-neutral-950/70 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-neutral-800/60 bg-neutral-950/80 backdrop-blur-xl transition-transform duration-500 ease-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900/60 border border-neutral-700/60 shadow-convex">
                <BrainCircuit className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-neutral-100">
                Prep<span className="text-cyan-400">AI</span>
              </p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                Interview Co-pilot
              </p>
            </div>
          </div>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-800/40 hover:text-neutral-300 transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
            Workspace
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.icon] ?? LayoutDashboard;
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onMobileClose();
                    }}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-500 ease-out ${
                      isActive
                        ? 'bg-neutral-800/40 text-cyan-300 shadow-convex border border-neutral-700/50'
                        : 'text-neutral-400 hover:bg-neutral-800/30 hover:text-neutral-100 hover:scale-[1.02] border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                        isActive
                          ? 'text-cyan-400'
                          : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    />
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile + sign out */}
        <div className="px-3 pb-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-neutral-900/50 border border-neutral-800/60 px-3 py-2.5 shadow-concave">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 text-sm font-semibold text-cyan-200 border border-cyan-500/20">
              {USER.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-200">
                {USER.name}
              </p>
              <p className="flex items-center gap-1 truncate text-xs text-neutral-500">
                <Flame className="h-3 w-3 text-amber-400" />
                {USER.streak} day streak · {USER.level}
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800/60 pt-4">
            <button
              onClick={onSignOut}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-400 transition-all duration-500 ease-out hover:bg-rose-500/10 hover:text-rose-300 hover:scale-[1.02]"
            >
              <LogOut className="h-4.5 w-4.5 shrink-0 transition-colors group-hover:text-rose-400" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar trigger */}
      <div className="fixed left-0 top-0 z-20 flex h-16 w-full items-center justify-between border-b border-neutral-800/60 bg-neutral-950/80 px-4 backdrop-blur-xl lg:hidden">
        <button
          onClick={onMobileOpen}
          className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-cyan-400" />
          <span className="font-display font-bold text-neutral-100">
            Prep<span className="text-cyan-400">AI</span>
          </span>
        </div>
        <div className="w-9" />
      </div>
    </>
  );
}
