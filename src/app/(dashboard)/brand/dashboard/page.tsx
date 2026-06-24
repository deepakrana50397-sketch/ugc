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
  const [showNotice, setShowNotice] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    setActiveGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic').slice(0, 2));

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
  const textColor = isLight ? '#18181b' : '#ffffff';
  const subtitleColor = isLight ? '#71717a' : '#a1a1aa';
  const cardBgColor = isLight ? '#ffffff' : '#18181b';
  const cardBorderColor = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
  const inputBgColor = isLight ? '#ffffff' : '#09090b';
  const inputBorderColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';

  const brandShortcuts = [
    { label: 'Find Talent', desc: 'Hire creators & pros', icon: <Users size={18} />, iconBg: 'rgba(124, 58, 237, 0.15)', iconColor: '#a78bfa', href: '/brand/applicants' },
    { label: 'Build Team', desc: 'Hire multiple people', icon: <Users size={18} />, iconBg: 'rgba(59, 130, 246, 0.15)', iconColor: '#60a5fa', href: '/brand/applicants' },
    { label: 'Hire Agency', desc: 'Work with agencies', icon: <Briefcase size={18} />, iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#34d399', href: '/brand/applicants' },
    { label: 'Hire igigster', desc: 'We run your campaign', icon: <Rocket size={18} />, iconBg: 'rgba(13, 148, 136, 0.15)', iconColor: '#2dd4bf', href: '/how-it-works' },
    { label: 'Post Campaign', desc: 'Post a new brief', icon: <Megaphone size={18} />, iconBg: 'rgba(236, 72, 153, 0.15)', iconColor: '#f472b6', href: '/brand/post-gig' },
    { label: 'My Campaigns', desc: 'Track & manage', icon: <Calendar size={18} />, iconBg: 'rgba(113, 113, 122, 0.15)', iconColor: '#a1a1aa', href: '/brand/gigs' },
    { label: 'Analytics', desc: 'Track performance', icon: <BarChart2 size={18} />, iconBg: 'rgba(113, 113, 122, 0.15)', iconColor: '#a1a1aa', href: '/brand/dashboard' },
    { label: 'All Tools', desc: 'More options', icon: <Grid size={18} />, iconBg: 'rgba(113, 113, 122, 0.15)', iconColor: '#a1a1aa', href: '/brand/dashboard' },
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
            <span>Hire creators, teams or let igigster manage your campaign</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/how-it-works" style={{ backgroundColor: isLight ? '#18181b' : '#ffffff', color: isLight ? '#ffffff' : '#09090b', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="explore-pill">
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
          Welcome back, <span style={{ fontWeight: 600, position: 'relative' }}>let's start a gig or run campaign!<span style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '2px', backgroundColor: '#db2777', borderRadius: '2px' }}></span></span>
        </h1>
        <p style={{ color: subtitleColor, fontSize: '14.5px', marginTop: '12px', maxWidth: '600px', lineHeight: '1.5' }}>
          Real people. Real stories. Real impact. Leverage AI, never lose the human touch.
        </p>
      </div>

      {/* Center Search Input */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
          <input 
            type="text" 
            placeholder="Search creators, influencers, teams, agencies or services" 
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
        {brandShortcuts.map((shortcut, idx) => (
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

      {/* AI / Human Touch Banner */}
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
            In an AI-driven era, the human touch makes all the difference.
          </h3>
          <p style={{ color: subtitleColor, fontSize: '13.5px', lineHeight: '1.6', marginBottom: '20px', maxWidth: '550px' }}>
            AI can create, but people connect. Real stories, real emotions, real impact — that's what moves audiences. Let's combine the speed of AI with the soul of human creativity to build content that truly connects.
          </p>
          <Link 
            href="/brand/post-gig" 
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
            Build with real humans
          </Link>
        </div>

        {/* Right Panel */}
        <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', backgroundColor: isLight ? '#fafafa' : '#121214' }} className="promo-banner-right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={15} />
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, marginTop: '4px' }}>AI has its limits</h4>
            <p style={{ fontSize: '11.5px', color: subtitleColor, lineHeight: '1.5' }}>Over-automated content feels generic and forgettable.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={15} />
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, marginTop: '4px' }}>Human touch</h4>
            <p style={{ fontSize: '11.5px', color: subtitleColor, lineHeight: '1.5' }}>Creativity, empathy & cultural understanding create real connections.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={15} />
            </div>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, marginTop: '4px' }}>The igigster way</h4>
            <p style={{ fontSize: '11.5px', color: subtitleColor, lineHeight: '1.5' }}>We leverage AI for speed, but humans for soul. That's real impact.</p>
          </div>
        </div>
      </div>

      {/* 3-Column Bottom Layout */}
      <div className="dashboard-grid-3cols" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Column 1: Campaign Overview */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px', border: `1px solid ${cardBorderColor}`, backgroundColor: cardBgColor }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>Campaign Overview</h3>
            <Link href="/brand/post-gig" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.06)', border: `1px solid ${cardBorderColor}`, padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, color: textColor }} className="hover-white-bg">
              <Plus size={12} />
              <span>New campaign</span>
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Active Campaigns', desc: 'Running right now', value: getStatValue(stats[1]), icon: <FolderOpen size={15} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
              { label: 'Applications', desc: 'New this week', value: getStatValue(stats[2]), icon: <Users size={15} />, color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' },
              { label: 'Hired Talent', desc: 'Working with you', value: 34, icon: <Smile size={15} />, color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)' },
              { label: 'Completed Deliveries', desc: 'This month', value: 21, icon: <CheckCircle size={15} />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: isLight ? 'rgba(0,0,0,0.01)' : 'rgba(255, 255, 255, 0.02)', border: `1px solid ${isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255, 255, 255, 0.04)'}`, borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block' }}>{item.label}</span>
                    <span style={{ fontSize: '11px', color: subtitleColor, display: 'block', marginTop: '2px' }}>{item.desc}</span>
                  </div>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 700, color: textColor }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Recent Campaigns (Running Projects Card) */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px', border: `1px solid ${cardBorderColor}`, backgroundColor: cardBgColor }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>Recent Campaigns</h3>
            <Link href="/brand/gigs" style={{ color: '#db2777', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx !== 3 ? `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={camp.image} alt={camp.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${cardBorderColor}` }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{camp.title}</span>
                    <span style={{ fontSize: '11px', color: subtitleColor, display: 'block', marginTop: '2px' }}>{camp.desc}</span>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: camp.statusColor, backgroundColor: camp.statusBg, padding: '3px 8px', borderRadius: '12px', border: `1px solid ${camp.statusColor}22` }}>
                  ● {camp.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Recommended For You */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px', border: `1px solid ${cardBorderColor}`, backgroundColor: cardBgColor }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor }}>Recommended For You</h3>
            <Link href="/brand/applicants" style={{ color: '#db2777', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx !== 3 ? `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={group.image} alt={group.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${cardBorderColor}` }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{group.title}</span>
                    <span style={{ fontSize: '11px', color: subtitleColor, display: 'block', marginTop: '2px' }}>{group.desc}</span>
                  </div>
                </div>
                
                {/* Avatars Stack */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', marginRight: '6px' }}>
                    {group.avatars.map((av, avIdx) => (
                      <img 
                        key={avIdx} 
                        src={av} 
                        alt="avatar" 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          border: `1px solid ${isLight ? '#ffffff' : '#18181b'}`, 
                          marginLeft: avIdx > 0 ? '-6px' : '0' 
                        }} 
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: subtitleColor }}>{group.count}</span>
                </div>
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
