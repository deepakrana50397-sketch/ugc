'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, LayoutDashboard, UserCheck } from 'lucide-react';
import { getCurrentUser, logoutUser } from '@/lib/services';
import { User } from '@/types/common';
import Magnetic from '../animation/Magnetic';

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

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const navLinks = [
    { label: 'Projects', href: '/brands' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: '20px',
        zIndex: 100,
        width: 'calc(100% - 32px)',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '9999px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0c0a09', // Deep off-black matches the image
        color: '#ffffff',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo (Left) */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <LogoIcon />
          <span style={{
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em'
          }}>
            iGigster.
          </span>
        </Link>

        {/* Desktop Links (Middle) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav-links"
        >
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isActive ? '#ffffff' : '#a8a29e',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  padding: '6px 0',
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#db2777',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Right) */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '16px',
          }}
          className="desktop-nav-actions"
        >
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                  fontWeight: 600,
                  color: '#a8a29e',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ef4444',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#a8a29e',
                padding: '6px 12px',
                transition: 'color 0.2s',
              }}
            >
              Log In
            </Link>
          )}

          <Magnetic strength={0.15}>
            <Link
              href="/contact"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#ffffff',
                color: '#0c0a09',
                padding: '10px 20px',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
              }}
              className="hover:bg-stone-100"
            >
              Book a Call
            </Link>
          </Magnetic>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="mobile-toggle-btn"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '72px',
            left: 0,
            width: '100%',
            backgroundColor: '#0c0a09',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            zIndex: 90,
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: pathname === item.href ? '#ffffff' : '#a8a29e',
                padding: '4px 0',
              }}
            >
              {item.label}
            </Link>
          ))}

          <hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <LayoutDashboard size={16} /> Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '4px 0',
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#a8a29e',
                padding: '4px 0',
              }}
            >
              Log In
            </Link>
          )}

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: '15px',
              fontWeight: 700,
              backgroundColor: '#ffffff',
              color: '#0c0a09',
              textAlign: 'center',
              padding: '12px',
              borderRadius: '9999px',
              marginTop: '6px',
            }}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
