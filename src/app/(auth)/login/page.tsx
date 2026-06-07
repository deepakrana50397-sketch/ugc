'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { loginMockUser } from '@/lib/services';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent, simulatedRole?: 'creator' | 'brand' | 'admin') => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    const targetEmail = simulatedRole ? `${simulatedRole}@igigster.com` : email;
    const targetRole = simulatedRole || (targetEmail.includes('admin') ? 'admin' : targetEmail.includes('brand') ? 'brand' : 'creator');

    setTimeout(() => {
      try {
        const user = loginMockUser(targetEmail, targetRole);
        window.dispatchEvent(new Event('auth-change'));
        
        // Redirect to respective dashboard
        if (user.role === 'creator') {
          router.push('/creator/dashboard');
        } else if (user.role === 'brand') {
          router.push('/brand/dashboard');
        } else {
          router.push('/admin/dashboard');
        }
      } catch (err) {
        setError('Login credentials rejected. Try a simulation button below.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div 
        className="glass-panel" 
        style={{
          maxWidth: '450px',
          width: '100%',
          padding: '40px',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 850, letterSpacing: '-0.02em', display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <span style={{ background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)', color: '#0f172a', padding: '3px 8px', borderRadius: '6px', fontSize: '15px' }}>iG</span>
            <span className="accent-gradient-text">igigster</span>
          </Link>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px' }}>Sign in to iGigster</h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>Simulate your role access to test dashboard features.</p>
        </div>

        {error && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '12px', borderRadius: '8px', color: '#f87171', fontSize: '13px' }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={(e) => handleLogin(e)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="email"
                placeholder="creator@igigster.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', fontSize: '13.5px' }}
                className="focus-border-primary"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', fontSize: '13.5px' }}
                className="focus-border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: 'rgb(var(--primary))',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '24px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              marginTop: '8px',
            }}
            className="glow-button"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* Simulation Fillers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
            ⚡ Instant Developer Login
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={(e) => handleLogin(e, 'creator')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'rgba(236,72,153,0.1)',
                border: '1px solid rgba(236,72,153,0.2)',
                color: '#f472b6',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              className="hover-opacity-90"
            >
              <UserCheck size={14} />
              <span>Simulate Creator (Neha K.)</span>
            </button>
            <button
              onClick={(e) => handleLogin(e, 'brand')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                color: '#60a5fa',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              className="hover-opacity-90"
            >
              <UserCheck size={14} />
              <span>Simulate Brand (SkinGlow)</span>
            </button>
            <button
              onClick={(e) => handleLogin(e, 'admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#34d399',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              className="hover-opacity-90"
            >
              <UserCheck size={14} />
              <span>Simulate Platform Admin</span>
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          New to iGigster?{' '}
          <Link href="/register" style={{ color: 'rgb(var(--primary))', fontWeight: 650 }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
