'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { brandDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';
import { useTheme } from '@/components/providers/ThemeProvider';
import {
  Search, Users, Briefcase, Rocket, Megaphone, Calendar, BarChart2, Grid,
  Plus, X, Heart, ShieldAlert, Sparkles, Smile, FolderOpen, ArrowUpRight, CheckCircle
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const CreatorMessagesView = dynamic(() => import('@/app/(dashboard)/creator/dashboard/components/CreatorMessagesView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorAnalyticsView = dynamic(() => import('@/app/(dashboard)/creator/dashboard/components/CreatorAnalyticsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandPaymentsView = dynamic(() => import('./components/BrandPaymentsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandSavedView = dynamic(() => import('./components/BrandSavedView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandTeamView = dynamic(() => import('./components/BrandTeamView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandContractsView = dynamic(() => import('./components/BrandContractsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandContentPlannerView = dynamic(() => import('./components/BrandContentPlannerView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandKitView = dynamic(() => import('./components/BrandKitView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const BrandReportsView = dynamic(() => import('./components/BrandReportsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});

export default function BrandDashboardPage() {
  const { currency } = useCurrency();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState("Good evening, let's create real impact!");

  useEffect(() => {
    setActiveGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic').slice(0, 4));

    // Sync greeting on client side
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning, let's create real impact!");
    } else if (hour < 18) {
      setGreeting("Good afternoon, let's create real impact!");
    } else {
      setGreeting("Good evening, let's create real impact!");
    }

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
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const accentColor = '#EC4899';

  const shadowStyle = 'var(--shadow-style)';

  if (view === 'messages') {
    return (
      <CreatorMessagesView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'analytics') {
    return (
      <CreatorAnalyticsView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'payments') {
    return (
      <BrandPaymentsView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'saved') {
    return (
      <BrandSavedView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'team') {
    return (
      <BrandTeamView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'contracts') {
    return (
      <BrandContractsView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'content-planner') {
    return (
      <BrandContentPlannerView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'brand-kit') {
    return (
      <BrandKitView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  if (view === 'reports') {
    return (
      <BrandReportsView
        theme={theme}
        isLight={isLight}
        cardBg={cardBg}
        borderColor={borderColor}
        primaryText={primaryText}
        secondaryText={secondaryText}
        mutedText={mutedText}
        accentColor={accentColor}
        shadowStyle={shadowStyle}
      />
    );
  }

  const brandShortcuts = [
    { label: 'Find Talent', desc: 'Hire creators & pros', icon: <Users size={24} strokeWidth={2.2} />, iconColor: '#8B5CF6', href: '/brand/applicants' },
    { label: 'Build Team', desc: 'Hire multiple people', icon: <Users size={24} strokeWidth={2.2} />, iconColor: '#3B82F6', href: '/brand/applicants' },
    { label: 'Hire Agency', desc: 'Work with agencies', icon: <Briefcase size={24} strokeWidth={2.2} />, iconColor: '#10B981', href: '/brand/applicants?view=agencies' },
    { label: 'Hire igigster', desc: 'We run your campaign', icon: <Rocket size={24} strokeWidth={2.2} />, iconColor: '#EC4899', href: '/how-it-works' },
    { label: 'Post Campaign', desc: 'Post a new brief', icon: <Megaphone size={24} strokeWidth={2.2} />, iconColor: '#F97316', href: '/brand/post-gig' },
    { label: 'My Campaigns', desc: 'Track & manage', icon: <Calendar size={24} strokeWidth={2.2} />, iconColor: '#8B5CF6', href: '/brand/gigs' },
    { label: 'Analytics', desc: 'Track performance', icon: <BarChart2 size={24} strokeWidth={2.2} />, iconColor: '#3B82F6', href: '/brand/dashboard' },
    { label: 'All Tools', desc: 'More options', icon: <Grid size={24} strokeWidth={2.2} />, iconColor: '#6B7280', href: '/brand/dashboard' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.3s' }}>

      {/* Hero Section (Fits in 420px) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        padding: '0 0',
        textAlign: 'center'
      }}>
        {/* Welcome Greeting */}
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: primaryText,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            margin: 0
          }}>
            {greeting}
          </h1>
          <p style={{ color: secondaryText, fontSize: '10px', fontWeight: 400, marginTop: '6px', opacity: 0.8 }}>
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
              height: '48px',
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
          {/* <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: isLight ? '#F3F4F6' : '#18181B', border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '2px 6px', fontSize: '10px', color: mutedText, fontWeight: 600 }}>
            <span>⌘</span>
            <span>K</span>
          </div> */}
        </div>

        {/* 8 Quick Action Cards (150px x 140px) */}
        <div className="shortcut-scroll-container" style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '20px', padding: '4px 0' }}>
            {brandShortcuts.map((shortcut, idx) => {
              const isAllTools = shortcut.label === 'All Tools';
              return (
                <Link
                  key={idx}
                  href={shortcut.href}
                  onClick={(e) => {
                    if (isAllTools) {
                      e.preventDefault();
                      window.dispatchEvent(new Event('open-tools-modal'));
                    }
                  }}
                  className="shortcut-card"
                  style={{
                  width: '105px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div
                  className="shortcut-icon-box"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--shortcut-bg)',
                    border: '1px solid var(--shortcut-border)',
                    color: shortcut.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    boxShadow: 'var(--shadow-style)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {shortcut.icon}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: primaryText, display: 'block', textAlign: 'center' }}>{shortcut.label}</span>
                <span style={{ fontSize: '10px', color: secondaryText, display: 'block', marginTop: '4px', lineHeight: '1.2', textAlign: 'center', padding: '0 4px' }}>{shortcut.desc}</span>
              </Link>
              );
            })}
          </div>
        </div>
      </div>      {/* Human Creativity Difference Section */}
      <div 
        style={{
          width: '100%',
          backgroundColor: cardBg,
          border: '1px solid var(--human-banner-border)',
          borderRadius: '24px',
          padding: '18px 22px',
          display: 'flex',
          gap: '20px',
          boxShadow: shadowStyle,
          alignItems: 'center',
          transition: 'all 0.3s ease',
          textAlign: 'left'
        }}
        className="human-difference-banner"
      >
        {/* Left Side: Big message + Button */}
        <div style={{ flex: '1.2', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
          {/* Big Icon Circle */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--human-banner-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid var(--human-banner-sub-border)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 12c-1.5-2-3.5-3.5-3.5-5.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0c0 2-2 3.5-3.5 5.5" />
              <path d="M4 14c2 2 5 3 8 3s6-1 8-3" />
              <path d="M6 17c1.5 2 3.5 2.5 6 2.5s4.5-.5 6-2.5" />
            </svg>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: primaryText,
              lineHeight: '1.3',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              In an AI-driven era, human creativity makes all the difference.
            </h2>
            <p style={{
              fontSize: '11px',
              color: secondaryText,
              lineHeight: '1.5',
              margin: 0,
              fontWeight: 400
            }}>
              AI can generate content, but humans create emotion, trust and connection. igigster helps you find real people who bring authenticity and real impact to your brand.
            </p>
            <Link
              href="/brand/applicants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EC4899',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '12px',
                padding: '8px 16px',
                borderRadius: '999px',
                textDecoration: 'none',
                width: 'fit-content',
                marginTop: '4px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)'
              }}
              className="glow-button"
            >
              Build with real humans
            </Link>
          </div>
        </div>

        {/* Vertical Divider */}
        <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: borderColor }} className="banner-divider" />

        {/* Right Side: 3 Features Grid */}
        <div style={{ flex: '1', display: 'flex', gap: '14px' }} className="banner-features">
          {/* Feature 1 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--human-banner-sub-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--human-banner-sub-border)'
            }}>
              <Heart size={14} color="#EC4899" fill="var(--heart-fill)" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#EC4899' }}>Human Touch</span>
            <p style={{ fontSize: '10px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
              Authentic stories build trust and real connections.
            </p>
          </div>

          {/* Inline Divider */}
          <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: borderColor }} className="inline-divider" />

          {/* Feature 2 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--human-banner-sub-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--human-banner-sub-border)'
            }}>
              <Sparkles size={14} color="#EC4899" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#EC4899' }}>AI + Human Power</span>
            <p style={{ fontSize: '10px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
              Use AI for speed, but humans for soul.
            </p>
          </div>

          {/* Inline Divider */}
          <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: borderColor }} className="inline-divider" />

          {/* Feature 3 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--human-banner-sub-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--human-banner-sub-border)'
            }}>
              <Users size={14} color="#EC4899" />
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#EC4899' }}>The igigster Way</span>
            <p style={{ fontSize: '10px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
              Real creators. Real communities. Real measurable impact.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Column Bottom Widget Grid (320px | 1fr | 320px) */}
      <div className="dashboard-grid-3cols" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', alignItems: 'start' }}>

        {/* Column 1: Campaign Overview (320px wide) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: primaryText }}>Campaign Overview</h3>
            <Link 
              href="/brand/post-gig" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#1C1C1F', 
                border: `1px solid ${theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}`, 
                padding: '6px 12px', 
                borderRadius: '8px', 
                fontSize: '11.5px', 
                fontWeight: 600, 
                color: theme === 'light' ? '#1A1A1A' : '#FFFFFF', 
                boxShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.02)' : 'none' 
              }} 
              className="hover-white-bg"
            >
              <Plus size={13} style={{ color: theme === 'light' ? '#1A1A1A' : '#FFFFFF' }} />
              <span>New campaign</span>
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {[
              { label: 'Active Campaigns', desc: 'Running right now', value: getStatValue(stats[1]), icon: <FolderOpen size={15} />, color: '#10b981', bg: theme === 'light' ? '#ECFDF5' : 'rgba(16, 185, 129, 0.15)' },
              { label: 'Applications', desc: 'New this week', value: getStatValue(stats[2]), icon: <Users size={15} />, color: '#8B5CF6', bg: theme === 'light' ? '#F5F3FF' : 'rgba(139, 92, 246, 0.15)' },
              { label: 'Hired Talent', desc: 'Working with you', value: 34, icon: <Smile size={15} />, color: '#3B82F6', bg: theme === 'light' ? '#EFF6FF' : 'rgba(59, 130, 246, 0.15)' },
              { label: 'Completed Deliveries', desc: 'This month', value: 21, icon: <CheckCircle size={15} />, color: '#F97316', bg: theme === 'light' ? '#FFF7ED' : 'rgba(249, 115, 22, 0.15)' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 650, color: primaryText, display: 'block' }}>{item.label}</span>
                    <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '2px' }}>{item.desc}</span>
                  </div>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 600, color: primaryText }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Recent Campaigns (1fr expands, acts as Projects Card) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: primaryText }}>Recent Campaigns</h3>
            <Link href="/brand/gigs" style={{ color: '#71717A', fontSize: '11.5px', fontWeight: 500, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
            {[
              ...(activeGigs.map((g, idx) => ({
                title: g.title,
                desc: `UGC • ${g.applicantsCount || 0} Creators`,
                status: idx === 0 ? 'In Progress' : 'Reviewing',
                image: idx === 0 ? 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60' : 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&auto=format&fit=crop&q=60'
              }))),
              {
                title: 'Product Launch Video Series',
                desc: 'Video • 5 Creators',
                status: 'Completed',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&auto=format&fit=crop&q=60'
              },
              {
                title: 'Local Event Promotion',
                desc: 'Community • 12 Creators',
                status: 'Draft',
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=80&auto=format&fit=crop&q=60'
              }
            ].slice(0, 4).map((camp, idx) => {
              const statusColor = camp.status === 'In Progress' 
                ? '#10B981' 
                : camp.status === 'Reviewing' 
                  ? '#3B82F6' 
                  : camp.status === 'Completed' 
                    ? '#8B5CF6' 
                    : '#F97316';
              const statusIcon = camp.status === 'In Progress' 
                ? '▲' 
                : camp.status === 'Reviewing' 
                  ? '⬦' 
                  : camp.status === 'Completed' 
                    ? '💜' 
                    : '●';
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={camp.image} alt={camp.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 650, color: primaryText, display: 'block', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{camp.title}</span>
                      <span style={{ fontSize: '10.5px', color: secondaryText, display: 'block', marginTop: '2px' }}>{camp.desc}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: statusColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: camp.status === 'Completed' ? '12px' : '9px' }}>{statusIcon}</span>
                    <span>{camp.status}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Recommended For You (320px wide) */}
        <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: primaryText }}>Recommended For You</h3>
            <Link href="/brand/applicants" style={{ color: '#71717A', fontSize: '11.5px', fontWeight: 500, textDecoration: 'none' }} className="hover-underline">
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
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
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={group.image} alt={group.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 650, color: primaryText, display: 'block', maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{group.title}</span>
                    <span style={{ fontSize: '10.5px', color: secondaryText, display: 'block', marginTop: '2px' }}>{group.desc}</span>
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
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid var(--avatar-border)',
                          marginLeft: avIdx > 0 ? '-6px' : '0'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 600, 
                    color: 'var(--secondary-text)', 
                    backgroundColor: 'var(--hover-bg)',
                    padding: '2px 6px',
                    borderRadius: '999px',
                    border: '1px solid var(--border-color)'
                  }}>
                    {group.count}
                  </span>
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
        @media (max-width: 1200px) {
          .shortcut-scroll-container {
            justify-content: flex-start !important;
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        .inner-scroller::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .inner-scroller {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        /* SEARCH INPUT */
        .search-input-focus:focus {
          border-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: none !important;
        }
        .light-theme .search-input-focus:focus {
          border-color: rgba(0, 0, 0, 0.25) !important;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.02) !important;
        }

        /* SHORTCUT CARDS */
        .shortcut-card:hover {
          background-color: transparent !important;
          background: transparent !important;
        }
        .shortcut-card:hover .shortcut-icon-box {
          transform: translateY(-2px);
          box-shadow: none !important;
          border-color: rgba(255,255,255,0.15) !important;
        }
        .light-theme .shortcut-card:hover .shortcut-icon-box {
          box-shadow: 0 4px 12px rgba(0,0,0,0.04) !important;
          border-color: rgba(0,0,0,0.12) !important;
        }

        /* 3-COLUMN RESPONSIVENESS */
        @media (min-width: 1024px) {
          .dashboard-grid-3cols {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .dashboard-grid-3cols {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* HOVER UTILITIES */
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }

        /* BUTTON EFFECTS */
        .glow-button:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
        }

        /* HUMAN VS AI DIFFERENCE BANNER RESPONSIVENESS */
        @media (max-width: 1024px) {
          .human-difference-banner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 24px !important;
            padding: 20px !important;
          }
          .banner-divider {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .banner-features {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .inline-divider {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
