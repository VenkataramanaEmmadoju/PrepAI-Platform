// src/App.tsx
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { InterviewDashboard } from './components/InterviewDashboard';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthMessage("✉️ Check your email inbox for a secure profile verification link!");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <h3 style={{ letterSpacing: '0.05em' }}>Syncing PrepAI Secure Runtime Engine...</h3>
      </div>
    );
  }

  if (session) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        {/* Modern Top Header Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px', background: '#0f172a', color: '#fff', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <span style={{ fontSize: '15px' }}>Identity Matrix: <strong style={{ color: '#38bdf8' }}>{session.user.email}</strong></span>
          <button onClick={handleSignOut} style={{ padding: '8px 16px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.2s' }}>
            Sign Out
          </button>
        </div>
        
        <InterviewDashboard />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'system-ui, sans-serif', margin: 0, padding: '16px', boxSizing: 'border-box' }}>
      <div style={{ padding: '40px', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '28px', color: '#ffffff', fontWeight: '800', letterSpacing: '-0.025em' }}>PrepAI Portal</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Full-Stack Client Authentication Entry</p>
        </div>
        
        {authError && <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', lineHeight: '1.4' }}>⚠️ {authError}</div>}
        {authMessage && <div style={{ padding: '12px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', lineHeight: '1.4' }}>{authMessage}</div>}
        
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" required style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Secret Key Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button type="submit" onClick={handleLogin} style={{ flex: 1, padding: '12px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s' }}>
              Sign In
            </button>
            <button type="button" onClick={handleSignUp} style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}