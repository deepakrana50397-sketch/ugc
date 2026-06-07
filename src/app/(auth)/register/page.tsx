'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Sparkles, Building, Video } from 'lucide-react';
import { loginMockUser } from '@/lib/services';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'creator' | 'brand'>('creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setTimeout(() => {
      // Create session via loginMockUser
      const user = loginMockUser(email, role);
      user.name = name; // Update with input name
      if (typeof window !== 'undefined') {
        localStorage.setItem('igigster_user', JSON.stringify(user));
      }
      window.dispatchEvent(new Event('auth-change'));
      setLoading(false);
      router.push('/onboarding');
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div 
        className="glass-panel" 
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '40px',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 850, letterSpacing: '-0.02em', display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <span style={{ background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)', color: '#0f172a', padding: '3px 8px', borderRadius: '6px', fontSize: '15px' }}>iG</span>
            <span className="accent-gradient-text">igigster</span>
          </Link>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px' }}>Create your account</h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>Join the premium short-form & UGC marketplace.</p>
        </div>

        {/* Role Toggle Select */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setRole('creator')}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: role === 'creator' ? '2px solid #ec4899' : '1px solid var(--card-border)',
              backgroundColor: role === 'creator' ? 'rgba(236,72,153,0.05)' : 'rgba(0,0,0,0.01)',
              color: role === 'creator' ? '#ffffff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <Video size={20} style={{ color: role === 'creator' ? '#ec4899' : '#64748b' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Creator</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Apply & earn</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('brand')}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: role === 'brand' ? '2px solid rgb(var(--primary))' : '1px solid var(--card-border)',
              backgroundColor: role === 'brand' ? 'rgba(124,58,237,0.05)' : 'rgba(0,0,0,0.01)',
              color: role === 'brand' ? '#ffffff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <Building size={20} style={{ color: role === 'brand' ? 'rgb(var(--primary))' : '#64748b' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Brand / Client</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Post & hire</span>
            </div>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                required
                placeholder="e.g. Karan Singhal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', fontSize: '13.5px' }}
                className="focus-border-primary"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="email"
                required
                placeholder="you@example.com"
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
                required
                placeholder="Minimum 8 characters"
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
            {loading ? 'Registering...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'rgb(var(--primary))', fontWeight: 650 }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
