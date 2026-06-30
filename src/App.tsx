// src/App.tsx
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { InterviewDashboard } from './components/InterviewDashboard';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Form input states for custom user auth handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch current session status on application mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Open a real-time listener subscription for sign-in/sign-out changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle live Supabase Login authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  // Handle live Supabase Account Registration
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setAuthError(error.message);
    else alert("Check your email for a registration confirmation link!");
  };

  // Handle logging out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h3>Syncing production session profile...</h3>
      </div>
    );
  }

  // --- VIEW ROUTING SWITCH ---
  if (session) {
    return (
      <div>
        {/* Navigation Bar showing active custom user */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', background: '#0f172a', color: '#fff', fontFamily: 'sans-serif' }}>
          <span>User Identity: <strong>{session.user.email}</strong></span>
          <button onClick={handleSignOut} style={{ padding: '6px 12px', background: '#ef4444', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            Sign Out
          </button>
        </div>
        
        {/* Load your production dashboard layout */}
        <InterviewDashboard />
      </div>
    );
  }

  // Render Authentication Portal if user is signed out
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      <form style={{ padding: '32px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', width: '100%', maxWidth: '360px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '6px' }}>PrepAI Secure Portal</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Enter your custom profile details to proceed</p>
        
        {authError && <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>{authError}</div>}
        
        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" onClick={handleLogin} style={{ flex: 1, padding: '10px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Sign In
          </button>
          <button type="button" onClick={handleSignUp} style={{ flex: 1, padding: '10px', backgroundColor: '#475569', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}