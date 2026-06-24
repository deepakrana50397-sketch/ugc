'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { brandDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';
import { 
  Search, Users, Briefcase, Rocket, Megaphone, Calendar, BarChart2, Grid, 
  Plus, X, Heart, ShieldAlert, Sparkles, Smile, FolderOpen, ArrowUpRight, CheckCircle 
} from 'lucide-react';

export default function BrandDashboardPage() {
  const { currency } = useCurrency();
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    setActiveGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic').slice(0, 4));

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

  const stats = brandDashboardData.stats;
  const getStatValue = (stat: typeof stats[0]) => {
    if (typeof stat.value === 'object') {
      return stat.value[currency as keyof typeof stat.value];
    }
    return stat.value;
  };

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

  const brandShortcuts = [
    { label: 'Find Talent', desc: 'Hire creators & pros', icon: <Users size={20} />, iconBg: 'rgba(124, 58, 237, 0.12)', iconColor: '#a78bfa', href: '/brand/applicants' },
    { label: 'Build Team', desc: 'Hire multiple people', icon: <Users size={20} />, iconBg: 'rgba(59, 130, 246, 0.12)', iconColor: '#60a5fa', href: '/brand/applicants' },
    { label: 'Hire Agency', desc: 'Work with agencies', icon: <Briefcase size={20} />, iconBg: 'rgba(16, 185, 129, 0.12)', iconColor: '#34d399', href: '/brand/applicants' },
    { label: 'Hire igigster', desc: 'We run your campaign', icon: <Rocket size={20} />, iconBg: 'rgba(13, 148, 136, 0.12)', iconColor: '#2dd4bf', href: '/how-it-works' },
    { label: 'Post Campaign', desc: 'Post a new brief', icon: <Megaphone size={20} />, iconBg: 'rgba(236, 72, 153, 0.12)', iconColor: '#EC4899', href: '/brand/post-gig' },
    { label: 'My Campaigns', desc: 'Track & manage', icon: <Calendar size={20} />, iconBg: 'rgba(113, 113, 122, 0.12)', iconColor: '#a1a1aa', href: '/brand/gigs' },
    { label: 'Analytics', desc: 'Track performance', icon: <BarChart2 size={20} />, iconBg: 'rgba(113, 113, 122, 0.12)', iconColor: '#a1a1aa', href: '/brand/dashboard' },
    { label: 'All Tools', desc: 'More options', icon: <Grid size={20} />, iconBg: 'rgba(113, 113, 122, 0.12)', iconColor: '#a1a1aa', href: '/brand/dashboard' },
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
            Welcome back, <span style={{ position: 'relative' }}>let's start a gig or run campaign!<span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '3px', backgroundColor: accentColor, borderRadius: '2px' }}></span></span>
          </h1>
          <p style={{ color: secondaryText, fontSize: '14px', fontWeight: 400, marginTop: '8px', opacity: 0.8 }}>
            Real people. Real stories. Real impact. Leverage AI, never lose the human touch.
          </p>
        </div>

        {/* 64px Pill Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
          <Search size={18} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
          <input 
            type="text" 
            placeholder="Search creators, influencers, teams, agencies or services" 
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
            {brandShortcuts.map((shortcut, idx) => (
              <Link 
                key={idx} 
                href={shortcut.href}
                className="shortcut-card"
                style={{
                  width: '150px',
                  height: '140px',
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '24px', // Big radius (24px)
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
        
        {/* Column 1: Campaign Overview (320px wide) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: primaryText }}>Campaign Overview</h3>
            <Link href="/brand/post-gig" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: isLight ? '#F3F4F6' : '#18181B', border: `1px solid ${borderColor}`, padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, color: primaryText }} className="hover-white-bg">
              <Plus size={12} />
              <span>New</span>
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {[
              { label: 'Active Campaigns', desc: 'Running right now', value: getStatValue(stats[1]), icon: <FolderOpen size={15} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
              { label: 'Applications', desc: 'New this week', value: getStatValue(stats[2]), icon: <Users size={15} />, color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' },
              { label: 'Hired Talent', desc: 'Working with you', value: 34, icon: <Smile size={15} />, color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)' },
              { label: 'Completed Deliveries', desc: 'This month', value: 21, icon: <CheckCircle size={15} />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: isLight ? '#F8F8FA' : '#0F0F11', border: `1px solid ${borderColor}`, borderRadius: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: primaryText, display: 'block' }}>{item.label}</span>
                    <span style={{ fontSize: '11px', color: mutedText, display: 'block' }}>{item.desc}</span>
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Recent Campaigns (1fr expands, acts as Projects Card) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: primaryText }}>Recent Campaigns</h3>
            <Link href="/brand/gigs" style={{ color: accentColor, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {[
              ...(activeGigs.map((g, idx) => ({
                title: g.title,
                desc: `UGC • ${g.applicantsCount || 0} Creators`,
                status: idx === 0 ? 'In Progress' : 'Reviewing',
                statusColor: idx === 0 ? '#10b981' : '#3b82f6',
                statusBg: idx === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                image: idx === 0 ? 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60' : 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&auto=format&fit=crop&q=60'
              }))),
              {
                title: 'Product Launch Video Series',
                desc: 'Video • 5 Creators',
                status: 'Completed',
                statusColor: '#a78bfa',
                statusBg: 'rgba(167, 139, 250, 0.1)',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&auto=format&fit=crop&q=60'
              },
              {
                title: 'Local Event Promotion',
                desc: 'Community • 12 Creators',
                status: 'Draft',
                statusColor: '#f59e0b',
                statusBg: 'rgba(245, 158, 11, 0.1)',
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=80&auto=format&fit=crop&q=60'
              }
            ].slice(0, 4).map((camp, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== 3 ? `1px solid ${borderColor}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={camp.image} alt={camp.title} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: primaryText, display: 'block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{camp.title}</span>
                    <span style={{ fontSize: '11px', color: secondaryText, display: 'block' }}>{camp.desc}</span>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: camp.statusColor, backgroundColor: camp.statusBg, padding: '3px 8px', borderRadius: '999px', border: `1px solid ${camp.statusColor}22` }}>
                  ● {camp.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Recommended For You (320px wide) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: primaryText }}>Recommended For You</h3>
            <Link href="/brand/applicants" style={{ color: accentColor, fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {[
              {
                title: 'Top UGC Creators in Bangalore',
                desc: 'High engagement & quality',
                count: '+12',
                avatars: [
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=60'
                ],
                image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=60'
              },
              {
                title: 'Micro Influencers for Beauty Niche',
                desc: 'Budget friendly, high reach',
                count: '+18',
                avatars: [
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=60&auto=format&fit=crop&q=60'
                ],
                image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=60'
              },
              {
                title: 'Student Ambassadors Near You',
                desc: 'Active on campus',
                count: '+25',
                avatars: [
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=60&auto=format&fit=crop&q=60'
                ],
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60'
              },
              {
                title: 'Video Editors for Short-form Content',
                desc: 'Reels, Shorts, TikTok experts',
                count: '+10',
                avatars: [
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=60&auto=format&fit=crop&q=60',
                  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&auto=format&fit=crop&q=60'
                ],
                image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=80&auto=format&fit=crop&q=60'
              }
            ].map((group, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== 3 ? `1px solid ${borderColor}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={group.image} alt={group.title} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: primaryText, display: 'block', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{group.title}</span>
                    <span style={{ fontSize: '11px', color: secondaryText, display: 'block' }}>{group.desc}</span>
                  </div>
                </div>
                
                {/* Avatars Stack */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', marginRight: '4px' }}>
                    {group.avatars.map((av, avIdx) => (
                      <img 
                        key={avIdx} 
                        src={av} 
                        alt="avatar" 
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          border: `1px solid ${isLight ? '#ffffff' : '#131316'}`, 
                          marginLeft: avIdx > 0 ? '-5px' : '0' 
                        }} 
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: mutedText }}>{group.count}</span>
                </div>
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
