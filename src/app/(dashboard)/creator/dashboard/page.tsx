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
  const [showNotice, setShowNotice] = useState(true);
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
  const textColor = isLight ? '#18181b' : '#ffffff';
  const subtitleColor = isLight ? '#71717a' : '#a1a1aa';
  const cardBgColor = isLight ? '#ffffff' : '#18181b';
  const cardBorderColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
  const inputBgColor = isLight ? '#ffffff' : '#09090b';
  const inputBorderColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';

  const creatorShortcuts = [
    { label: 'Find Gigs', desc: 'Explore active briefs', icon: <Search size={18} />, iconBg: 'rgba(124, 58, 237, 0.15)', iconColor: '#a78bfa', href: '/creator/gigs' },
    { label: 'Submit Pitch', desc: 'Apply to campaigns', icon: <Send size={18} />, iconBg: 'rgba(59, 130, 246, 0.15)', iconColor: '#60a5fa', href: '/creator/gigs' },
    { label: 'View Contracts', desc: 'Manage agreements', icon: <FileText size={18} />, iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#34d399', href: '/creator/applications' },
    { label: 'Earnings', desc: 'Track payments & bids', icon: <DollarSign size={18} />, iconBg: 'rgba(13, 148, 136, 0.15)', iconColor: '#2dd4bf', href: '/creator/dashboard' },
    { label: 'My Portfolio', desc: 'Customize showcase', icon: <UserCircle size={18} />, iconBg: 'rgba(236, 72, 153, 0.15)', iconColor: '#f472b6', href: '/creator/profile' },
    { label: 'Direct Message', desc: 'Chat with brands', icon: <MessageSquare size={18} />, iconBg: 'rgba(113, 113, 122, 0.15)', iconColor: '#a1a1aa', href: '/creator/dashboard' },
    { label: 'Analytics', desc: 'Review performance', icon: <BarChart2 size={18} />, iconBg: 'rgba(113, 113, 122, 0.15)', iconColor: '#a1a1aa', href: '/creator/dashboard' },
    { label: 'All Tools', desc: 'More options', icon: <Grid size={18} />, iconBg: 'rgba(113, 113, 122, 0.15)', iconColor: '#a1a1aa', href: '/creator/dashboard' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1280px', margin: '0 auto', transition: 'all 0.3s' }}>
      
      {/* Notice Alert Bar */}
      {showNotice && (
        <div style={{
          backgroundColor: isLight ? 'rgba(219, 39, 119, 0.03)' : 'rgba(219, 39, 119, 0.05)',
          border: `1px solid ${isLight ? 'rgba(219, 39, 119, 0.1)' : 'rgba(219, 39, 119, 0.1)'}`,
          borderRadius: '12px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          color: textColor,
        }} className="fade-in-notice">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#db2777', color: '#ffffff', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New</span>
            <span>Apply to premium briefs or let igigster pitch your profile to top brands</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/creator/gigs" style={{ backgroundColor: isLight ? '#18181b' : '#ffffff', color: isLight ? '#ffffff' : '#09090b', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="explore-pill">
              Explore options
            </Link>
            <button onClick={() => setShowNotice(false)} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }} className="hover-white-icon">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Centered Greeting Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '16px 0 8px 0' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 400, color: textColor, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          Welcome back, <span style={{ fontWeight: 600, position: 'relative' }}>let's find a gig or start creating!<span style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '2px', backgroundColor: '#db2777', borderRadius: '2px' }}></span></span>
        </h1>
        <p style={{ color: subtitleColor, fontSize: '14.5px', marginTop: '12px', maxWidth: '600px', lineHeight: '1.5' }}>
          Create authentic videos, work with your favorite brands, and grow your creator business.
        </p>
      </div>

      {/* Center Search Input */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
          <input 
            type="text" 
            placeholder="Search gigs, brands, categories or creator tools" 
            style={{
              width: '100%',
              backgroundColor: inputBgColor,
              border: `1px solid ${inputBorderColor}`,
              borderRadius: '24px',
              padding: '12px 16px 12px 44px',
              fontSize: '13.5px',
              color: textColor,
              outline: 'none',
              transition: 'all 0.2s',
            }}
            className="search-input-focus"
          />
          <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${inputBorderColor}`, borderRadius: '6px', padding: '2px 6px', fontSize: '10px', color: '#71717a', fontWeight: 600 }}>
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Shortcut Tool Grid */}
      <div className="shortcut-grid">
        {creatorShortcuts.map((shortcut, idx) => (
          <Link 
            key={idx} 
            href={shortcut.href}
            className="shortcut-card"
            style={{
              backgroundColor: cardBgColor,
              border: `1px solid ${cardBorderColor}`,
              borderRadius: '16px',
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: shortcut.iconBg,
              color: shortcut.iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              {shortcut.icon}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block' }}>{shortcut.label}</span>
            <span style={{ fontSize: '11px', color: subtitleColor, display: 'block', marginTop: '4px', lineHeight: '1.2' }}>{shortcut.desc}</span>
          </Link>
        ))}
      </div>

      {/* Creator Superpower Banner */}
      <div 
        className="glass-panel promo-banner-grid" 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          borderRadius: '16px',
          border: isLight ? '1px solid rgba(219, 39, 119, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: cardBgColor,
          overflow: 'hidden',
        }}
      >
        {/* Left Panel */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: `1px solid ${cardBorderColor}` }} className="promo-banner-left">
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: textColor, marginBottom: '12px' }}>
            In a creator-led world, your authenticity is your superpower.
          </h3>
          <p style={{ color: subtitleColor, fontSize: '13.5px', lineHeight: '1.6', marginBottom: '20px', maxWidth: '550px' }}>
            Brands don't want generic ads; they want you. Real reactions, real reviews, real connections. Use iGigster's platform to streamline your workflow, manage invoices, and focus entirely on creating high-quality content.
          </p>
          <Link 
            href="/creator/gigs" 
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#db2777',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(219, 39, 119, 0.2)',
              transition: 'all 0.2s'
            }}
            className="glow-button"
          >
            Find high-paying gigs
          </Link>
        </div>

        {/* Right Panel */}
        <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', backgroundColor: isLight ? '#fafafa' : '#121214' }} className="promo-banner-right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={15} />
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, marginTop: '4px' }}>Zero generic ads</h4>
            <p style={{ fontSize: '11.5px', color: subtitleColor, lineHeight: '1.5' }}>Authentic user generated content only, vetted for creative freedom.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={15} />
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, marginTop: '4px' }}>Direct support</h4>
            <p style={{ fontSize: '11.5px', color: subtitleColor, lineHeight: '1.5' }}>Get assistance from gig matching managers to optimize your pitches.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={15} />
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, marginTop: '4px' }}>Fast payouts</h4>
            <p style={{ fontSize: '11.5px', color: subtitleColor, lineHeight: '1.5' }}>Safe escrow payments released immediately on project signoff.</p>
          </div>
        </div>
      </div>

      {/* 3-Column Bottom Layout */}
      <div className="dashboard-grid-3cols" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Column 1: Profile Vetting Score */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px', border: `1px solid ${cardBorderColor}`, backgroundColor: cardBgColor }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>Profile Vetting Score</h3>
            <p style={{ color: subtitleColor, fontSize: '12px', marginTop: '2px' }}>Complete checklist to unlock Verified Checkmark badge.</p>
          </div>

          {/* Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ color: '#db2777' }}>{completion}% Completed</span>
              <span style={{ color: textColor }}>4/5 Steps Done</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${completion}%`, height: '100%', backgroundColor: '#db2777', borderRadius: '3px' }} />
            </div>
          </div>

          <hr style={{ borderColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)', margin: '4px 0' }} />

          {/* Checklist items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {profileSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
                {step.done ? (
                  <CheckCircle size={15} style={{ color: '#10b981' }} />
                ) : (
                  <Clock size={15} style={{ color: subtitleColor }} />
                )}
                <span style={{ color: step.done ? subtitleColor : textColor, textDecoration: step.done ? 'line-through' : 'none' }}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Active Applications */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px', border: `1px solid ${cardBorderColor}`, backgroundColor: cardBgColor }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>My Applications</h3>
            <Link href="/creator/applications" style={{ color: '#db2777', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {applications.map((appl) => (
              <div key={appl.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}` }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appl.gigTitle}</span>
                  <span style={{ fontSize: '11px', color: subtitleColor, display: 'block', marginTop: '2px' }}>by {appl.brandName}</span>
                </div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  color: appl.status === 'shortlisted' ? '#db2777' : appl.status === 'pending' ? '#f59e0b' : '#ef4444', 
                  backgroundColor: appl.status === 'shortlisted' ? 'rgba(219,39,119,0.1)' : appl.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', 
                  padding: '3px 8px', 
                  borderRadius: '12px',
                  textTransform: 'capitalize',
                  border: `1px solid rgba(255,255,255,0.04)`
                }}>
                  {appl.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Recommended Gigs */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px', border: `1px solid ${cardBorderColor}`, backgroundColor: cardBgColor }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>Recommended Gigs</h3>
            <Link href="/creator/gigs" style={{ color: '#db2777', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeGigs.map((gig) => (
              <div key={gig.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: gig.isUrgent ? '#ef4444' : '#10b981' }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{gig.title}</span>
                    <span style={{ fontSize: '11px', color: subtitleColor, display: 'block', marginTop: '2px' }}>by {gig.brandName}</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: textColor }}>
                  {displayPrice(gig.price, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        /* NOTICE BAR CLOSE ICON */
        .hover-white-icon:hover {
          color: #db2777 !important;
        }

        /* EXPLORE OPTION PILL */
        .explore-pill:hover {
          background-color: ${isLight ? '#2a2a2d' : '#f4f4f5'} !important;
          transform: scale(1.02);
        }

        /* SEARCH INPUT */
        .search-input-focus:focus {
          border-color: ${isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)'} !important;
          box-shadow: ${isLight ? '0 0 0 2px rgba(0, 0, 0, 0.02)' : '0 0 0 2px rgba(255, 255, 255, 0.05)'} !important;
        }

        /* SHORTCUT GRID */
        .shortcut-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 576px) {
          .shortcut-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 992px) {
          .shortcut-grid {
            grid-template-columns: repeat(8, 1fr);
          }
        }

        /* SHORTCUT CARDS */
        .shortcut-card:hover {
          background-color: ${isLight ? '#fafafa' : '#1c1c1f'} !important;
          border-color: ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.08)'} !important;
          transform: translateY(-2px);
          box-shadow: ${isLight ? '0 8px 30px rgba(0,0,0,0.03)' : '0 6px 20px rgba(0,0,0,0.2)'} !important;
        }

        /* PROMO BANNER RESPONSIVENESS */
        @media (min-width: 992px) {
          .promo-banner-grid {
            grid-template-columns: 1.4fr 1.6fr !important;
          }
        }
        @media (max-width: 991px) {
          .promo-banner-left {
            border-right: none !important;
            border-bottom: 1px solid ${cardBorderColor} !important;
          }
          .promo-banner-right {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        /* 3-COLUMN RESPONSIVENESS */
        @media (min-width: 1200px) {
          .dashboard-grid-3cols {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .dashboard-grid-3cols {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* HOVER UTILITIES */
        .hover-white-bg:hover {
          background-color: ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.12)'} !important;
          color: ${textColor} !important;
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }

        /* BUTTON EFFECTS */
        .glow-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(219, 39, 119, 0.3) !important;
        }
      `}</style>

    </div>
  );
}
