'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { creatorDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { 
  Search, Send, FileText, DollarSign, UserCircle, MessageSquare, BarChart2, Grid, 
  Plus, X, Heart, ShieldAlert, Sparkles, Clock, CheckCircle, ArrowRight, Star 
} from 'lucide-react';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';

export default function CreatorDashboardPage() {
  const { currency } = useCurrency();
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setActiveGigs(getGigs().filter(g => g.isFeatured || g.isUrgent).slice(0, 4));

    // Theme subscription
    const savedTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
      if (currentTheme) setTheme(currentTheme);
    };

    window.addEventListener('igigster-theme-change', handleThemeChange);
    return () => window.removeEventListener('igigster-theme-change', handleThemeChange);
  }, []);

  const stats = creatorDashboardData.stats;
  const profileSteps = creatorDashboardData.profileSteps;
  const completion = creatorDashboardData.profileCompletion;
  const applications = creatorDashboardData.applications;

  const isLight = theme === 'light';
  
  // Design System colors
  const mainBg = isLight ? '#F8F8FA' : '#09090B';
  const cardBg = isLight ? '#FFFFFF' : '#131316';
  const borderColor = isLight ? '#E5E7EB' : 'rgba(255,255,255,.08)';
  const hoverBg = isLight ? '#F3F4F6' : '#18181B';
  const primaryText = isLight ? '#09090B' : '#FFFFFF';
  const secondaryText = isLight ? '#52525B' : '#A1A1AA';
  const mutedText = isLight ? '#71717A' : '#71717A';
  const accentColor = '#EC4899';
  
  const shadowStyle = isLight ? '0 1px 2px rgba(0,0,0,.04)' : 'none';

  const creatorShortcuts = [
    { label: 'Find Gigs', desc: 'Explore active briefs', icon: <Search size={20} />, iconBg: 'rgba(124, 58, 237, 0.12)', iconColor: '#a78bfa', href: '/creator/gigs' },
    { label: 'Submit Pitch', desc: 'Apply to campaigns', icon: <Send size={20} />, iconBg: 'rgba(59, 130, 246, 0.12)', iconColor: '#60a5fa', href: '/creator/gigs' },
    { label: 'View Contracts', desc: 'Manage agreements', icon: <FileText size={20} />, iconBg: 'rgba(16, 185, 129, 0.12)', iconColor: '#34d399', href: '/creator/applications' },
    { label: 'Earnings', desc: 'Track payments & bids', icon: <DollarSign size={20} />, iconBg: 'rgba(13, 148, 136, 0.12)', iconColor: '#2dd4bf', href: '/creator/dashboard' },
    { label: 'My Portfolio', desc: 'Customize showcase', icon: <UserCircle size={20} />, iconBg: 'rgba(236, 72, 153, 0.12)', iconColor: '#f472b6', href: '/creator/profile' },
    { label: 'Direct Message', desc: 'Chat with brands', icon: <MessageSquare size={20} />, iconBg: 'rgba(113, 113, 122, 0.12)', iconColor: '#a1a1aa', href: '/creator/dashboard' },
    { label: 'Analytics', desc: 'Review performance', icon: <BarChart2 size={20} />, iconBg: 'rgba(113, 113, 122, 0.12)', iconColor: '#a1a1aa', href: '/creator/dashboard' },
    { label: 'All Tools', desc: 'More options', icon: <Grid size={20} />, iconBg: 'rgba(113, 113, 122, 0.12)', iconColor: '#a1a1aa', href: '/creator/dashboard' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Hero Section (Fits in 420px) */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: '420px', 
        padding: '16px 0',
        textAlign: 'center' 
      }}>
        {/* Welcome Greeting */}
        <div>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            color: primaryText, 
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 0
          }}>
            Welcome back, <span style={{ position: 'relative' }}>let's find a gig or start creating!<span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '3px', backgroundColor: accentColor, borderRadius: '2px' }}></span></span>
          </h1>
          <p style={{ color: secondaryText, fontSize: '14px', fontWeight: 400, marginTop: '8px', opacity: 0.8 }}>
            Create authentic videos, work with your favorite brands, and grow your creator business.
          </p>
        </div>

        {/* 64px Pill Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
          <Search size={18} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
          <input 
            type="text" 
            placeholder="Search gigs, brands, categories or creator tools" 
            style={{
              width: '100%',
              height: '64px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '999px',
              paddingLeft: '56px',
              paddingRight: '60px',
              fontSize: '14px',
              color: primaryText,
              outline: 'none',
              transition: 'all 0.2s',
              boxShadow: shadowStyle,
            }}
            className="search-input-focus"
          />
          <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: isLight ? '#F3F4F6' : '#18181B', border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '2px 6px', fontSize: '10px', color: mutedText, fontWeight: 600 }}>
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        {/* 8 Quick Action Cards (150px x 140px) */}
        <div className="shortcut-scroll-container" style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', padding: '4px 0' }}>
            {creatorShortcuts.map((shortcut, idx) => (
              <Link 
                key={idx} 
                href={shortcut.href}
                className="shortcut-card"
                style={{
                  width: '150px',
                  height: '140px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '24px', // Big radius
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  boxShadow: shadowStyle,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: shortcut.iconBg,
                  color: shortcut.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  {shortcut.icon}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: primaryText, display: 'block' }}>{shortcut.label}</span>
                <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '4px', lineHeight: '1.2', padding: '0 8px' }}>{shortcut.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Bottom Widget Grid (320px | 1fr | 320px) */}
      <div className="dashboard-grid-3cols" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Column 1: Profile Vetting Score (320px wide) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: primaryText }}>Profile Vetting Score</h3>
            <p style={{ color: mutedText, fontSize: '12px', marginTop: '2px' }}>Complete checklist to unlock Verified badge.</p>
          </div>

          {/* Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ color: accentColor }}>{completion}% Completed</span>
              <span style={{ color: primaryText }}>4/5 Steps Done</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${completion}%`, height: '100%', backgroundColor: accentColor, borderRadius: '3px' }} />
            </div>
          </div>

          {/* Checklist items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {profileSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', padding: '6px 0', borderBottom: idx !== profileSteps.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
                {step.done ? (
                  <CheckCircle size={15} style={{ color: '#10b981' }} />
                ) : (
                  <Clock size={15} style={{ color: mutedText }} />
                )}
                <span style={{ color: step.done ? mutedText : primaryText, textDecoration: step.done ? 'line-through' : 'none' }}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: My Applications (1fr expands) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: primaryText }}>My Applications</h3>
            <Link href="/creator/applications" style={{ color: accentColor, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {applications.map((appl, idx) => (
              <div key={appl.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== applications.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: primaryText, display: 'block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appl.gigTitle}</span>
                  <span style={{ fontSize: '11px', color: secondaryText, display: 'block' }}>by {appl.brandName}</span>
                </div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  color: appl.status === 'shortlisted' ? accentColor : appl.status === 'pending' ? '#f59e0b' : '#ef4444', 
                  backgroundColor: appl.status === 'shortlisted' ? 'rgba(236,72,153,0.1)' : appl.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', 
                  padding: '3px 8px', 
                  borderRadius: '999px',
                  textTransform: 'capitalize',
                  border: `1px solid ${borderColor}`
                }}>
                  {appl.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Recommended Gigs (320px wide) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: primaryText }}>Recommended Gigs</h3>
            <Link href="/creator/gigs" style={{ color: accentColor, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {activeGigs.map((gig, idx) => (
              <div key={gig.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== activeGigs.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: gig.isUrgent ? '#ef4444' : '#10b981' }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: primaryText, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{gig.title}</span>
                    <span style={{ fontSize: '11px', color: secondaryText, display: 'block' }}>by {gig.brandName}</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText }}>
                  {displayPrice(gig.price, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        /* SCROLL CONTAINER HIDING BAR */
        .shortcut-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .shortcut-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .inner-scroller::-webkit-scrollbar {
          width: 4px;
        }
        .inner-scroller::-webkit-scrollbar-thumb {
          background-color: ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'};
          border-radius: 4px;
        }

        /* SEARCH INPUT */
        .search-input-focus:focus {
          border-color: ${isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)'} !important;
          box-shadow: ${isLight ? '0 0 0 2px rgba(0, 0, 0, 0.02)' : 'none'} !important;
        }

        /* SHORTCUT CARDS */
        .shortcut-card:hover {
          background-color: ${hoverBg} !important;
          border-color: ${isLight ? '#d1d5db' : 'rgba(255, 255, 255, 0.12)'} !important;
          transform: translateY(-2px);
          box-shadow: ${isLight ? '0 4px 12px rgba(0,0,0,0.03)' : 'none'} !important;
        }

        /* 3-COLUMN RESPONSIVENESS */
        @media (min-width: 1200px) {
          .dashboard-grid-3cols {
            grid-template-columns: 320px 1fr 320px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .dashboard-grid-3cols {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* HOVER UTILITIES */
        .hover-white-bg:hover {
          background-color: ${hoverBg} !important;
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }

        /* BUTTON EFFECTS */
        .glow-button:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
        }
      `}</style>

    </div>
  );
}
