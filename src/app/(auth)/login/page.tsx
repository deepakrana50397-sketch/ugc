'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, UserCheck, ShieldAlert, Sparkles, Building2, Briefcase, LayoutDashboard } from 'lucide-react';
import { loginMockUser, getCurrentUser, logoutUser, signInUser } from '@/lib/services';
import { User } from '@/types/common';
import { useSiteMode } from '@/hooks/useSiteMode';
import { motion } from 'framer-motion';

// Stylized gradient logo icon matching the image
const LogoIcon = () => (
  <svg width="34" height="24" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <rect width="38" height="26" rx="13" fill="url(#igigster-logo-grad)" />
    <path d="M13 17.5C13.5 15.5 15.5 14.5 18 14.5C20.5 14.5 23 13.5 23 11C23 8.5 20 8 18 8C15 8 13.5 9.5 13 11.5M23 8.5C22.5 10.5 20.5 11.5 18 11.5C15.5 11.5 13 12.5 13 15C13 17.5 16 18 18 18C21 18 22.5 16.5 23 14.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <defs>
      <linearGradient id="igigster-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#db2777" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { mode, setMode } = useSiteMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Monitor user state inside browser & default demo mode to false
  useEffect(() => {
    setUser(getCurrentUser());
    if (typeof window !== 'undefined') {
      localStorage.setItem('igigster_demo_mode', 'false');
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  const handleLogin = (e: React.FormEvent, simulatedRole?: 'creator' | 'brand' | 'admin') => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    if (typeof window !== 'undefined') {
      if (simulatedRole) {
        localStorage.setItem('igigster_demo_mode', 'true');
      } else {
        localStorage.setItem('igigster_demo_mode', 'false');
      }
    }

    // Determine target details based on mode or override
    let targetEmail = email;
    if (simulatedRole) {
      targetEmail = `${simulatedRole}@igigster.com`;
    } else if (!email) {
      // If typing is empty but they submit, default based on mode
      targetEmail = mode === 'talent' ? 'creator@igigster.com' : 'brand@igigster.com';
    }

    const targetRole = simulatedRole || (targetEmail.includes('admin') ? 'admin' : targetEmail.includes('brand') ? 'brand' : 'creator');

    setTimeout(async () => {
      try {
        let loggedUser;
        if (simulatedRole) {
          loggedUser = await loginMockUser(targetEmail, targetRole);
        } else {
          loggedUser = await signInUser({ email, password });
        }
        window.dispatchEvent(new Event('auth-change'));
        setUser(loggedUser);

        // Redirect to respective dashboard
        if (loggedUser.role === 'creator') {
          router.push('/creator/dashboard');
        } else if (loggedUser.role === 'brand') {
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

  const ModeSwitcher = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(28, 25, 23, 0.08)',
        borderRadius: '9999px',
        padding: '2px',
        position: 'relative',
      }}
    >
      <button
        onClick={() => setMode('brand')}
        style={{
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          color: mode === 'brand' ? '#1c1917' : '#78716c',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'color 0.2s',
          position: 'relative',
        }}
      >
        Hire Talent
        {mode === 'brand' && (
          <motion.div
            layoutId="activeModeBg"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              zIndex: -1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>
      <button
        onClick={() => setMode('talent')}
        style={{
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600,
          color: mode === 'talent' ? '#1c1917' : '#78716c',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'color 0.2s',
          position: 'relative',
        }}
      >
        Find Gigs
        {mode === 'talent' && (
          <motion.div
            layoutId="activeModeBg"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              zIndex: -1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );

  return (
    <div
      className="login-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#fafaf9', // Warm stone background matches landing page
        fontFamily: 'var(--font-sans)',
        color: '#1c1917',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 1. Left Showcase Column (Desktop Only) */}
      <div
        style={{
          width: '55%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          position: 'relative',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          background: '#fafaf9', // Matches landing page background exactly
          color: '#1c1917', // Warm charcoal text
          overflowY: 'auto',
          gap: '32px',
        }}
        className="login-left-panel"
      >
        {/* Dynamic grid decoration overlay */}
        <div
          className="bg-grid-pattern"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.25, // Aligned with the landing page grid opacity
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic mesh glow circle behind art */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: mode === 'talent'
              ? 'radial-gradient(circle, rgba(219,39,119,0.12) 0%, rgba(219,39,119,0) 70%)'
              : 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, rgba(13,148,136,0) 70%)',
            filter: 'blur(60px)',
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'background 0.6s',
          }}
        />

        {/* Ambient floating sparkles in left panel */}
        <div style={{ position: 'absolute', top: '15%', left: '15%', opacity: 0.15, zIndex: 1, color: mode === 'talent' ? '#db2777' : '#0d9488', pointerEvents: 'none' }} className="animate-float-slow">
          <Sparkles size={48} />
        </div>
        <div style={{ position: 'absolute', bottom: '25%', right: '15%', opacity: 0.15, zIndex: 1, color: mode === 'talent' ? '#db2777' : '#0d9488', pointerEvents: 'none' }} className="animate-float-medium">
          <Sparkles size={32} />
        </div>

        {/* Header - Small logo branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
          <LogoIcon />
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#1c1917', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>iGigster.</span>
        </div>

        {/* Center illustration art centered inside a container */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, zIndex: 10, position: 'relative' }}>
          <img
            src="/login_bg_art.png"
            alt="UGC Video Creation illustration"
            style={{
              maxWidth: '80%',
              maxHeight: '400px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))'
            }}
            className="animate-float-slow"
          />
        </div>

        {/* Dynamic Display Text & Description & Metric Badge at bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10, maxWidth: '480px', textAlign: 'left' }}>
          {mode === 'talent' ? (
            <>
              {/* Creator Mode details */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(219,39,119,0.06)', border: '1px solid rgba(219,39,119,0.15)', padding: '6px 12px', borderRadius: '20px', color: '#db2777', fontSize: '12px', fontWeight: 700, width: 'fit-content' }}>
                <Sparkles size={12} style={{ color: '#db2777' }} />
                <span>Neha K. earned ₹45,000 last month</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, color: '#1c1917', lineHeight: 1.15, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>
                Turn your creativity<br />into currency.
              </h2>
              <p style={{ color: '#44403c', fontSize: '15px', lineHeight: 1.5 }}>
                Connect with leading brands and apply to active UGC and editing campaigns with verified budgets. Free forever for creators.
              </p>
            </>
          ) : (
            <>
              {/* Brand Mode details */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)', padding: '6px 12px', borderRadius: '20px', color: '#0d9488', fontSize: '12px', fontWeight: 700, width: 'fit-content' }}>
                <Sparkles size={12} style={{ color: '#0d9488' }} />
                <span>2.4x Average CTR Boost</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, color: '#1c1917', lineHeight: 1.15, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>
                Video ads that drive<br />revenue & performance.
              </h2>
              <p style={{ color: '#44403c', fontSize: '15px', lineHeight: 1.5 }}>
                Match with qualified short-form video editors, voiceover artists, and UGC creators. Post a campaign for free, pay only when you connect.
              </p>
            </>
          )}
        </div>
      </div>

      {/* 2. Right Form Column */}
      <div
        style={{
          width: '45%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 32px',
          position: 'relative',
          overflowY: 'auto'
        }}
        className="login-right-panel"
      >
        {/* Winding ribbon decoration in the form background matches main landing page/footer */}
        <svg
          className="absolute left-10 top-0 w-full pointer-events-none z-0 overflow-visible"
          style={{ opacity: 0.3, height: '100%' }}
          viewBox="0 0 1170 1170"
          preserveAspectRatio="xMinYMax slice"
        >
          <motion.path
            d="M 1012 0 C 1012 0 685.114 76.915 628.183 300.778 C 592.343 441.706 652.378 586.306 761.118 561.104 C 831.495 544.792 841.921 423.437 796.958 340.577 C 733.921 224.409 506.014 255.052 431.387 459.974 C 299.755 821.429 481.563 1014.553 180 1190"
            fill="transparent"
            stroke={mode === 'brand' ? '#0d9488' : '#ffa8f2'}
            strokeWidth="30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>

        {/* Subtle grid pattern background to align style with main landing page */}
        <div
          className="bg-grid-pattern"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.25,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '440px', margin: '0 auto', zIndex: 10 }}>
          {/* Logo on Left (Mobile Only - desktop has it on left panel) */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="mobile-logo-only">
            <LogoIcon />
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#1c1917', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>iGigster.</span>
          </Link>

          {/* Desktop Logo backlink (Hidden on mobile) */}
          <Link href="/" style={{ fontSize: '13px', fontWeight: 650, color: '#78716c', display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-logo-back">
            <span>← Go Home</span>
          </Link>

          {/* Switcher on Right */}
          <ModeSwitcher />
        </div>

        {/* Main Content (Centered login card) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', flex: 1, width: '100%', maxWidth: '440px', margin: '32px auto', zIndex: 10 }}>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f5f5f4', border: '1px solid rgba(28,25,23,0.08)', borderRadius: '16px', padding: '16px 20px', width: '100%', marginBottom: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Active Session</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1c1917' }}>{user.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Link
                  href={
                    user.role === 'creator'
                      ? '/creator/dashboard'
                      : user.role === 'brand'
                        ? '/brand/dashboard'
                        : '/admin/dashboard'
                  }
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: '#1c1917',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <LayoutDashboard size={13} />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '6px 10px'
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              border: mode === 'talent' ? '1.5px solid rgba(219,39,119,0.15)' : '1.5px solid rgba(79,70,229,0.15)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              backgroundColor: 'transparent',
              textAlign: 'left',
              transition: 'border 0.4s'
            }}
          >
            {/* Headers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: mode === 'talent' ? 'rgba(219, 39, 119, 0.06)' : 'rgba(79, 70, 229, 0.06)',
                border: mode === 'talent' ? '1px solid rgba(219, 39, 119, 0.15)' : '1px solid rgba(79, 70, 229, 0.15)',
                padding: '5px 12px',
                borderRadius: '20px',
                color: mode === 'talent' ? '#db2777' : '#4f46e5',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                width: 'fit-content'
              }}>
                {mode === 'talent' ? <Briefcase size={12} /> : <Building2 size={12} />}
                <span>{mode === 'talent' ? 'Creator Portal' : 'Client Portal'}</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.02em', color: '#1c1917', fontFamily: 'var(--font-display)' }}>
                {mode === 'talent' ? 'Creator Sign In' : 'Brand Sign In'}
              </h1>
              <p style={{ color: '#78716c', fontSize: '13.5px', lineHeight: 1.45 }}>
                {mode === 'talent'
                  ? 'Access active UGC gigs, collaborate on projects, and manage payouts.'
                  : 'Post campaigns, review portfolios, and manage your ad creatives.'}
              </p>
            </div>

            {error && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', padding: '12px', borderRadius: '10px', color: '#ef4444', fontSize: '13px' }}>
                <ShieldAlert size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Login inputs form */}
            <form onSubmit={(e) => handleLogin(e)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#44403c' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                  <input
                    type="email"
                    placeholder={mode === 'talent' ? 'creator@igigster.com' : 'brand@igigster.com'}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '10px', border: '1px solid rgba(28,25,23,0.12)', backgroundColor: 'rgba(0,0,0,0.01)', color: '#1c1917', outline: 'none', fontSize: '14px', transition: 'border-color 0.2s' }}
                    className="focus-border-primary"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#44403c' }}>Password</label>
                  <Link href="#" style={{ fontSize: '11px', color: mode === 'talent' ? '#db2777' : '#4f46e5', fontWeight: 600 }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: '10px', border: '1px solid rgba(28,25,23,0.12)', backgroundColor: 'rgba(0,0,0,0.01)', color: '#1c1917', outline: 'none', fontSize: '14px', transition: 'border-color 0.2s' }}
                    className="focus-border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: mode === 'talent'
                    ? 'linear-gradient(90deg, #db2777 0%, #7c3aed 100%)'
                    : 'linear-gradient(90deg, #4f46e5 0%, #0d9488 100%)',
                  color: '#ffffff',
                  padding: '14px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: mode === 'talent' ? '0 10px 20px -5px rgba(219,39,119,0.3)' : '0 10px 20px -5px rgba(79,70,229,0.3)',
                  marginTop: '6px',
                  transition: 'all 0.2s',
                }}
                className="glow-button"
              >
                {loading ? 'Verifying Credentials...' : 'Sign In'}
              </button>
            </form>

            <hr style={{ borderColor: 'rgba(28,25,23,0.06)' }} />

            {/* Simulation Fillers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>
                🔧 Developer Quick Access
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {mode === 'talent' ? (
                  <>
                    <button
                      onClick={(e) => handleLogin(e, 'creator')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(219,39,119,0.06)',
                        border: '1.5px solid rgba(219,39,119,0.15)',
                        color: '#db2777',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      className="hover:scale-[1.01]"
                    >
                      <UserCheck size={14} />
                      <span>Log in as Creator (Neha K.)</span>
                    </button>
                    <button
                      onClick={(e) => handleLogin(e, 'admin')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(28,25,23,0.03)',
                        border: '1.5px solid rgba(28,25,23,0.06)',
                        color: '#44403c',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      className="hover:bg-stone-100"
                    >
                      <span>Log in as Platform Admin</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => handleLogin(e, 'brand')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(79,70,229,0.06)',
                        border: '1.5px solid rgba(79,70,229,0.15)',
                        color: '#4f46e5',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      className="hover:scale-[1.01]"
                    >
                      <UserCheck size={14} />
                      <span>Log in as Brand (SkinGlow)</span>
                    </button>
                    <button
                      onClick={(e) => handleLogin(e, 'admin')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(28,25,23,0.03)',
                        border: '1.5px solid rgba(28,25,23,0.06)',
                        color: '#44403c',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      className="hover:bg-stone-100"
                    >
                      <span>Log in as Platform Admin</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '13px', color: '#78716c', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                New to iGigster?{' '}
                <Link href="/register" style={{ color: mode === 'talent' ? '#db2777' : '#4f46e5', fontWeight: 700 }}>
                  Create an Account
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMode(mode === 'brand' ? 'talent' : 'brand')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: mode === 'talent' ? '#7c3aed' : '#db2777',
                  fontWeight: 700,
                  fontSize: '12px',
                  marginTop: '4px',
                }}
              >
                {mode === 'brand' ? 'Are you a Creator? Switch to Creator Login' : 'Are you a Brand? Switch to Brand Login'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#a8a29e', zIndex: 10, width: '100%' }}>
          © 2026 iGigster. All Rights Reserved.
        </div>
      </div>

      {/* Global CSS classes for splitscreen responsiveness */}
      <style jsx global>{`
        .login-container {
          height: 100vh;
          overflow: hidden;
        }
        .mobile-logo-only {
          display: none !important;
        }
        @media (max-width: 991px) {
          .login-container {
            height: auto !important;
            min-height: 100vh !important;
            overflow: auto !important;
          }
          .login-left-panel {
            display: none !important;
          }
          .login-right-panel {
            width: 100% !important;
            padding: 32px 24px !important;
            height: auto !important;
            min-height: 100vh !important;
            overflow-y: visible !important;
          }
          .mobile-logo-only {
            display: flex !important;
          }
          .desktop-logo-back {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
