'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, LayoutDashboard, UserCheck } from 'lucide-react';
import { navItems } from '@/data/navigation';
import CurrencyToggle from '../ui/CurrencyToggle';
import { getCurrentUser, logoutUser } from '@/lib/services';
import { User } from '@/types/common';
import Magnetic from '../animation/Magnetic';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor user state inside browser
  useEffect(() => {
    const checkUser = () => {
      setUser(getCurrentUser());
    };
    checkUser();
    
    // Listen for custom login/logout events to sync navbar
    window.addEventListener('auth-change', checkUser);
    return () => {
      window.removeEventListener('auth-change', checkUser);
    };
  }, [pathname]);

  // Monitor scroll progress for top indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        borderBottom: '1px solid rgba(231, 229, 228, 0.7)',
        backgroundColor: 'rgba(250, 250, 249, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'var(--foreground)',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Scroll Progress Indicator Bar */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(to right, rgb(79, 70, 229), rgb(219, 39, 119))',
          transition: 'width 0.1s ease-out',
        }}
      />

      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          style={{ 
            fontSize: '24px', 
            fontWeight: 800, 
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span 
            style={{ 
              background: 'linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(219, 39, 119) 100%)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
            }}
          >
            iG
          </span>
          <span className="accent-gradient-text" style={{ fontWeight: 800 }}>igigster</span>
        </Link>

        {/* Desktop Links */}
        <nav 
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '36px',
          }}
          className="desktop-nav-links"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'rgb(79, 70, 229)' : 'var(--muted)',
                  transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  padding: '6px 0',
                }}
                className="nav-link-item"
              >
                {item.label}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'rgb(79, 70, 229)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div 
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '20px',
          }}
          className="desktop-nav-actions"
        >
          <CurrencyToggle />

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Magnetic strength={0.15}>
                <Link
                  href={
                    user.role === 'creator'
                      ? '/creator/dashboard'
                      : user.role === 'brand'
                      ? '/brand/dashboard'
                      : '/admin/dashboard'
                  }
                  style={{
                    fontSize: '13.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(28, 25, 22, 0.05)',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    border: '1px solid rgba(28, 25, 22, 0.08)',
                    color: 'var(--foreground)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="premium-btn-secondary"
                >
                  <LayoutDashboard size={14} style={{ color: 'rgb(79, 70, 229)' }} />
                  Dashboard
                </Link>
              </Magnetic>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgb(220, 38, 38)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  padding: '8px 12px',
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  padding: '8px 16px',
                  transition: 'color 0.2s',
                }}
                className="hover-color-accent"
              >
                Log In
              </Link>
              <Magnetic strength={0.15}>
                <Link
                  href="/register"
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    backgroundColor: 'rgb(79, 70, 229)',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '30px',
                    boxShadow: '0 8px 16px -6px rgba(79, 70, 229, 0.3)',
                  }}
                  className="glow-button"
                >
                  Get Started
                </Link>
              </Magnetic>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: 'var(--foreground)',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="mobile-toggle-btn"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--background)',
            borderBottom: '1px solid rgba(231, 229, 228, 0.8)',
            padding: '30px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            zIndex: 90,
            boxShadow: '0 20px 30px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500 }}>Currency Selection:</span>
            <CurrencyToggle />
          </div>

          <hr style={{ borderColor: 'rgba(28, 25, 22, 0.06)' }} />

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: pathname === item.href ? 700 : 500,
                color: pathname === item.href ? 'rgb(79, 70, 229)' : 'var(--foreground)',
              }}
            >
              {item.label}
            </Link>
          ))}

          <hr style={{ borderColor: 'rgba(28, 25, 22, 0.06)' }} />

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '13.5px' }}>
                <UserCheck size={16} style={{ color: 'rgb(79, 70, 229)' }} /> Active: {user.name} ({user.role})
              </div>
              <Link
                href={
                  user.role === 'creator'
                    ? '/creator/dashboard'
                    : user.role === 'brand'
                    ? '/brand/dashboard'
                    : '/admin/dashboard'
                }
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  backgroundColor: 'rgba(28, 25, 22, 0.04)',
                  padding: '14px',
                  borderRadius: '30px',
                  textAlign: 'center',
                  border: '1px solid rgba(28, 25, 22, 0.08)',
                  color: 'var(--foreground)',
                }}
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  color: 'rgb(220, 38, 38)',
                  border: '1px solid rgba(220, 38, 38, 0.15)',
                  borderRadius: '30px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  textAlign: 'center',
                  padding: '10px',
                }}
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  backgroundColor: 'rgb(79, 70, 229)',
                  color: '#ffffff',
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: '30px',
                  boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)',
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
