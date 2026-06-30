import { useState } from 'react';
import { AuthGate } from './components/AuthGate';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { RoadmapsView } from './components/RoadmapsView';
import { ResumeView } from './components/ResumeView';
import { ResumeFixerView } from './components/ResumeFixerView';
import { QaView } from './components/QaView';
import { SimulatorView } from './components/SimulatorView';
import type { ViewId } from './data/navigation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setActiveView('dashboard');
    setMobileOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
      <div className="pointer-events-none fixed -top-60 left-1/4 h-[40rem] w-[40rem] rounded-full bg-cyan-500/5 blur-[140px] animate-float-slow" />
      <div className="pointer-events-none fixed -bottom-60 right-1/4 h-[40rem] w-[40rem] rounded-full bg-emerald-500/5 blur-[140px] animate-float-slower" />

      <Sidebar
        active={activeView}
        onNavigate={setActiveView}
        onSignOut={handleSignOut}
        mobileOpen={mobileOpen}
        onMobileOpen={() => setMobileOpen(true)}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="relative z-10 lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          {/* Mobile top spacer */}
          <div className="h-12 lg:hidden" />
          <div key={activeView} className="animate-fade-in">
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'roadmaps' && <RoadmapsView />}
            {activeView === 'resume' && <ResumeView />}
            {activeView === 'fixer' && <ResumeFixerView />}
            {activeView === 'qa' && <QaView />}
            {activeView === 'simulator' && <SimulatorView />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
