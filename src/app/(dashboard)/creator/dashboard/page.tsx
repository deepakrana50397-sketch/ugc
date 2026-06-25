'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/hooks/useCurrency';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';
import { useTheme } from '@/components/providers/ThemeProvider';
import {
  Search, Send, FolderOpen, DollarSign, Star, Users, Heart, Sparkles,
  TrendingUp, Clock, CheckCircle2, XCircle, Gift, MapPin, BadgeCheck,
  Bookmark, ChevronDown
} from 'lucide-react';

import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const CreatorMessagesView = dynamic(() => import('./components/CreatorMessagesView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorEarningsView = dynamic(() => import('./components/CreatorEarningsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorAnalyticsView = dynamic(() => import('./components/CreatorAnalyticsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorReviewsView = dynamic(() => import('./components/CreatorReviewsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorSavedView = dynamic(() => import('./components/CreatorSavedView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorAiAssistantView = dynamic(() => import('./components/CreatorAiAssistantView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorRateCalculatorView = dynamic(() => import('./components/CreatorRateCalculatorView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const CreatorProfileStrengthView = dynamic(() => import('./components/CreatorProfileStrengthView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});

export default function CreatorDashboardPage() {
  const { currency } = useCurrency();
  const { user, creator, loadDashboard } = useDashboardStore();
  const profile = creator.profile;
  const router = useRouter();
  const { theme } = useTheme();
  const isINR = currency === 'INR';
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  // Profile Strength States
  const [isProfileStrengthExpanded, setIsProfileStrengthExpanded] = useState(false);
  const [socialLinked, setSocialLinked] = useState(false);
  const [tagsAdded, setTagsAdded] = useState(false);
  const [linkingSocial, setLinkingSocial] = useState(false);
  const [addingTags, setAddingTags] = useState(false);

  // Modal triggers
  const [isSocialLinkModalOpen, setIsSocialLinkModalOpen] = useState(false);
  const [socialHandleInput, setSocialHandleInput] = useState('');
  
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('Fashion');

  let strengthPercent = 85;
  if (socialLinked) strengthPercent += 10;
  if (tagsAdded) strengthPercent += 5;

  useEffect(() => {
    loadDashboard();

    const handleProfileUpdate = () => {
      loadDashboard();
    };
    window.addEventListener('creator-profile-updated', handleProfileUpdate);

    return () => {
      window.removeEventListener('creator-profile-updated', handleProfileUpdate);
    };
  }, []);

  const isLight = theme === 'light';

  // Design System Colors using CSS variables
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

  if (view === 'earnings' || view === 'payouts') {
    return (
      <CreatorEarningsView
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

  if (view === 'reviews') {
    return (
      <CreatorReviewsView
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

  if (view === 'ai-assistant') {
    return (
      <CreatorAiAssistantView
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
      <CreatorSavedView
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

  if (view === 'rate-calculator') {
    return (
      <CreatorRateCalculatorView
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

  if (view === 'profile-strength') {
    return (
      <CreatorProfileStrengthView
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


  // Format dynamic currency values
  const formatVal = (inrVal: number, usdVal: number) => {
    return isINR ? `₹${inrVal.toLocaleString('en-IN')}` : `$${usdVal.toLocaleString('en-US')}`;
  };

  const creatorShortcuts = [
    { label: 'Find Gigs', desc: 'Discover matching opportunities', icon: <Search size={20} />, iconColor: '#EC4899', bgCircle: 'rgba(236, 72, 153, 0.08)', href: '/creator/gigs' },
    { label: 'Apply to Gigs', desc: 'Apply and get hired faster', icon: <Send size={20} />, iconColor: '#8B5CF6', bgCircle: 'rgba(139, 92, 246, 0.08)', href: '/creator/gigs' },
    { label: 'My Projects', desc: 'Track your active projects', icon: <FolderOpen size={20} />, iconColor: '#3B82F6', bgCircle: 'rgba(59, 130, 246, 0.08)', href: '/creator/applications' },
    { label: 'Earnings', desc: 'View income and payouts', icon: <DollarSign size={20} />, iconColor: '#10B981', bgCircle: 'rgba(16, 185, 129, 0.08)', href: '/creator/dashboard' },
    { label: 'Portfolio', desc: 'Showcase your best work', icon: <Star size={20} />, iconColor: '#F97316', bgCircle: 'rgba(249, 115, 22, 0.08)', href: '/creator/profile' },
    { label: 'Brand Collabs', desc: 'Work with top brands', icon: <Users size={20} />, iconColor: '#6366F1', bgCircle: 'rgba(99, 102, 241, 0.08)', href: '/creator/applications?view=collabs' },
  ];

  const recentProjects = [
    {
      title: 'Skincare UGC Campaign',
      brand: 'Glow & Co.',
      status: 'In Progress',
      statusColor: '#10B981',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60'
    },
    {
      title: 'College Fest Content',
      brand: 'Campus Vibes',
      status: 'Submitted',
      statusColor: '#3B82F6',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=80&auto=format&fit=crop&q=60'
    },
    {
      title: 'Food Reels Creation',
      brand: 'TastyBites',
      status: 'Completed',
      statusColor: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&auto=format&fit=crop&q=60'
    }
  ];

  const recommendedGigs = [
    {
      title: 'Skincare UGC Campaign',
      brand: 'Glow & Co.',
      budgetINR: '18,000 - 25,000',
      budgetUSD: '220 - 300',
      badge: 'New',
      badgeColor: '#EC4899',
      badgeBg: 'rgba(236, 72, 153, 0.08)',
      initial: 'G',
      initialBg: '#FDF2F8',
      initialColor: '#EC4899'
    },
    {
      title: 'College Fest Content Creators',
      brand: 'Campus Vibes',
      budgetINR: '8,000 - 15,000',
      budgetUSD: '100 - 180',
      badge: 'New',
      badgeColor: '#EC4899',
      badgeBg: 'rgba(236, 72, 153, 0.08)',
      initial: 'C',
      initialBg: '#F5F3FF',
      initialColor: '#8B5CF6'
    },
    {
      title: 'Fitness Influencer Collaboration',
      brand: 'FitLife India',
      budgetINR: '20,000 - 40,000',
      budgetUSD: '240 - 480',
      badge: 'Hot',
      badgeColor: '#F97316',
      badgeBg: 'rgba(249, 115, 22, 0.08)',
      initial: 'F',
      initialBg: '#EFF6FF',
      initialColor: '#3B82F6'
    },
    {
      title: 'Food Reels Creation',
      brand: 'TastyBites',
      budgetINR: '10,000 - 18,000',
      budgetUSD: '120 - 220',
      badge: 'Hot',
      badgeColor: '#F97316',
      badgeBg: 'rgba(249, 115, 22, 0.08)',
      initial: 'T',
      initialBg: '#FFF7ED',
      initialColor: '#F97316'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>      {/* Main Content Layout: Left Column (Quick Actions, Banners, Widgets) and Right Column (Stats/Gigs) */}
      <div className="creator-dashboard-main-grid" style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '24px', alignItems: 'start' }}>

        {/* LEFT COLUMN AREA (72%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Hero Welcome Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            gap: '16px',
            width: '100%',
            maxWidth: '640px',
            padding: '8px 0 0 0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 800,
                color: primaryText,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                margin: 0,
                fontFamily: 'var(--font-sans)',
              }}>
                Welcome back, <span style={{ color: accentColor }}>{profile?.name ? profile.name.split(' ')[0] : (user?.name ? user.name.split(' ')[0] : 'Creator')}!</span> 👋
              </h1>
              <p style={{ color: secondaryText, fontSize: '13px', fontWeight: 400, marginTop: '8px', opacity: 0.8 }}>
                Build your brand. Create impact. Earn more.
              </p>
            </div>

            {/* 64px Pill Search Bar */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
              <input
                type="text"
                placeholder="Search gigs, brands, categories or skills"
                style={{
                  width: '100%',
                  height: '52px',
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
              <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: 'var(--hover-bg)', border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '2px 6px', fontSize: '10px', color: mutedText, fontWeight: 600 }}>
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </div>

          {/* 6 Quick Action Cards Grid */}
          <div className="shortcut-scroll-container" style={{ width: '100%', overflowX: 'auto', display: 'flex', paddingBottom: '4px' }}>
            <div className="shortcuts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', width: '100%' }}>
              {creatorShortcuts.map((shortcut, idx) => {
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
                    className="shortcut-card-box"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      padding: '16px 8px',
                      borderRadius: '20px',
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      boxShadow: shadowStyle,
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      textAlign: 'center',
                      minHeight: '135px'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: shortcut.bgCircle,
                        color: shortcut.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      className="icon-circle"
                    >
                      {shortcut.icon}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: primaryText, display: 'block' }}>{shortcut.label}</span>
                    <span style={{ fontSize: '10.5px', color: secondaryText, display: 'block', marginTop: '6px', lineHeight: '1.3', padding: '0 4px' }}>{shortcut.desc}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Human Creativity Difference Section */}
          <div
            style={{
              width: '100%',
              backgroundColor: cardBg,
              border: '1px solid var(--human-banner-border)',
              borderRadius: '24px',
              padding: '20px 24px',
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
            <div style={{ flex: '1.3', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
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
                <Heart size={24} color="#EC4899" fill="#EC4899" />
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
                  In an AI-driven era, human creators make the difference.
                </h2>
                <p style={{
                  fontSize: '11px',
                  color: secondaryText,
                  lineHeight: '1.5',
                  margin: 0,
                  fontWeight: 400
                }}>
                  AI can generate content, but real people create emotions, trust and connection. Keep being you—that's your superpower.
                </p>
                <button
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
                    border: 'none',
                    width: 'fit-content',
                    marginTop: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)'
                  }}
                  className="glow-button"
                >
                  Keep Creating Impact
                </button>
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
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#EC4899' }}>Be Authentic</span>
                <p style={{ fontSize: '10px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
                  Your unique perspective creates real impact.
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
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#EC4899' }}>Use AI Smartly</span>
                <p style={{ fontSize: '10px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
                  Leverage AI for speed, but you for soul.
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
                  <TrendingUp size={14} color="#EC4899" />
                </div>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#EC4899' }}>Grow Your Brand</span>
                <p style={{ fontSize: '10px', color: secondaryText, margin: 0, lineHeight: '1.4' }}>
                  Consistent value today, long-term opportunities tomorrow.
                </p>
              </div>
            </div>
          </div>

          {/* Row of 2 Cards: Earnings, Application Status */}
          <div className="earnings-projects-status-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>

            {/* 1. Earnings Overview */}
            <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>Earnings Overview</h3>
                <Link href="/creator/dashboard" style={{ color: accentColor, fontSize: '11px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
                  View all
                </Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10.5px', color: secondaryText, fontWeight: 500 }}>Total Earnings</span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, letterSpacing: '-0.02em', marginTop: '2px' }}>
                    {formatVal(124500, 1500)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', padding: '4px 8px', borderRadius: '8px', fontSize: '10.5px', fontWeight: 700 }}>
                  <span>▲</span>
                  <span>24%</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }} className="inner-scroller">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: secondaryText }}>Completed Projects (18)</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText }}>{formatVal(78000, 940)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: secondaryText }}>In Progress (6)</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText }}>{formatVal(32500, 390)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: secondaryText }}>Pending Payouts (2)</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText }}>{formatVal(14000, 170)}</span>
                </div>
              </div>

              <button
                style={{
                  width: '100%',
                  height: '36px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  color: primaryText,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: 'auto',
                  transition: 'all 0.2s'
                }}
                className="hover-white-bg"
              >
                View Earnings
              </button>
            </div>

            {/* 3. Application Status */}
            <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>Application Status</h3>
                <Link href="/creator/applications" style={{ color: accentColor, fontSize: '11px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
                  View all
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
                {[
                  { label: 'Awaiting Response', val: 12, icon: <Clock size={16} />, color: '#F97316' },
                  { label: 'Under Review', val: 7, icon: <Search size={16} />, color: '#3B82F6' },
                  { label: 'Shortlisted', val: 3, icon: <CheckCircle2 size={16} />, color: '#10B981' },
                  { label: 'Rejected', val: 1, icon: <XCircle size={16} />, color: '#EF4444' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: `${item.color}08`, color: item.color, border: `1px solid ${item.color}15`, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: primaryText }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Refer & Earn Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderRadius: '20px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              boxShadow: shadowStyle
            }}
            className="refer-earn-banner"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
                <Gift size={20} />
              </div>
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: primaryText, display: 'block' }}>Refer & Earn</span>
                <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '2px' }}>
                  Invite friends and earn up to {formatVal(5000, 60)} when they complete their first project!
                </span>
              </div>
            </div>
            <button
              style={{
                backgroundColor: 'transparent',
                border: `1.5px solid ${accentColor}`,
                color: accentColor,
                fontWeight: 700,
                fontSize: '12px',
                padding: '6px 16px',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="invite-now-button"
            >
              Invite Now
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN AREA (28%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Creator Profile Card */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
            {/* Avatar + Info */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={profile?.avatar || user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"}
                  alt={profile?.name || user?.name || "Creator"}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--avatar-border)' }}
                />
                <BadgeCheck size={16} fill="#3B82F6" color="#ffffff" style={{ position: 'absolute', bottom: '0', right: '0' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: primaryText }}>{profile?.name || user?.name || "Creator"}</span>
                </div>
                <span style={{ fontSize: '11px', color: secondaryText, marginTop: '2px' }}>{profile?.title || user?.title || "UGC Creator"}</span>
                <span style={{ fontSize: '10.5px', color: mutedText, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '3px' }}>
                  <MapPin size={10} color={accentColor} /> {profile?.location || "India"}
                </span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, margin: '12px 0' }} />

            {/* Profile Strength */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                onClick={() => setIsProfileStrengthExpanded(!isProfileStrengthExpanded)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 750, color: primaryText }}>Profile Strength</span>
                  <ChevronDown
                    size={13}
                    style={{
                      transform: isProfileStrengthExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      color: mutedText
                    }}
                  />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: accentColor }}>{strengthPercent}%</span>
              </div>

              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${strengthPercent}%`, height: '100%', backgroundColor: accentColor, borderRadius: '3px', transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>

              {/* Collapsible details checklist */}
              {isProfileStrengthExpanded ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '6px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--hover-bg)',
                  border: `1px solid ${borderColor}`,
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Task Checklist</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'Set up bio & profile title', done: true, points: '25%' },
                      { label: 'Define starting video rates', done: true, points: '25%' },
                      { label: 'Upload portfolio video reels', done: true, points: '20%' },
                      { label: 'Verify mobile contact number', done: true, points: '15%' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.85 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                          <span style={{ fontSize: '11.5px', color: primaryText, textDecoration: 'line-through', opacity: 0.65 }}>{item.label}</span>
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981' }}>+{item.points}</span>
                      </div>
                    ))}

                    {/* Social handles link check */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {socialLinked ? (
                          <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                        ) : (
                          <div style={{ width: '13px', height: '13px', borderRadius: '50%', border: `1.5px solid ${borderColor}`, boxSizing: 'border-box' }} />
                        )}
                        <span style={{
                          fontSize: '11.5px',
                          color: primaryText,
                          textDecoration: socialLinked ? 'line-through' : 'none',
                          opacity: socialLinked ? 0.65 : 1
                        }}>Link Instagram handle</span>
                      </div>
                      {socialLinked ? (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981' }}>+10%</span>
                      ) : (
                        <button
                          onClick={() => setIsSocialLinkModalOpen(true)}
                          style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${accentColor}`,
                            color: accentColor,
                            fontSize: '9.5px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Link
                        </button>
                      )}
                    </div>

                    {/* Specialties location tag check */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {tagsAdded ? (
                          <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                        ) : (
                          <div style={{ width: '13px', height: '13px', borderRadius: '50%', border: `1.5px solid ${borderColor}`, boxSizing: 'border-box' }} />
                        )}
                        <span style={{
                          fontSize: '11.5px',
                          color: primaryText,
                          textDecoration: tagsAdded ? 'line-through' : 'none',
                          opacity: tagsAdded ? 0.65 : 1
                        }}>Add specialty tags</span>
                      </div>
                      {tagsAdded ? (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981' }}>+5%</span>
                      ) : (
                        <button
                          onClick={() => setIsTagsModalOpen(true)}
                          style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${accentColor}`,
                            color: accentColor,
                            fontSize: '9.5px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Add
                        </button>
                      )}
                    </div>

                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Sparkles size={11} style={{ color: '#F59E0B' }} />
                    <span style={{ fontSize: '9.5px', color: '#F59E0B', fontWeight: 650 }}>Completed profiles get 3x higher visibility!</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '4px' }}>
                  <span style={{ fontSize: '10.5px', color: secondaryText, flex: 1, lineHeight: '1.4' }}>
                    Great job! Complete your profile to get better matches.
                  </span>
                  <button
                    style={{
                      backgroundColor: 'rgba(236,72,153,0.06)',
                      border: `1px solid ${accentColor}25`,
                      color: accentColor,
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                    className="improve-profile-btn"
                    onClick={() => setIsProfileStrengthExpanded(true)}
                  >
                    Improve Profile
                  </button>
                </div>
              )}
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, margin: '16px 0' }} />

            {/* Stats Grid (2x2) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Rating', val: `${profile?.rating || '4.8'} ★`, color: '#EAB308' },
                { label: 'Reviews', val: '32', color: primaryText },
                { label: 'Projects', val: `${profile?.completedJobs || '28'}`, color: primaryText },
                { label: 'Response Rate', val: '96%', color: primaryText }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 8px',
                    borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'var(--hover-bg)',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 800, color: item.color }}>{item.val}</span>
                  <span style={{ fontSize: '10px', color: secondaryText, marginTop: '4px', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="glass-panel" style={{ height: '320px', padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryText, margin: 0 }}>Recent Projects</h3>
              <Link href="/creator/applications" style={{ color: accentColor, fontSize: '11px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
                View all
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }} className="inner-scroller">
              {recentProjects.map((proj, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={proj.image} alt={proj.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{proj.title}</span>
                      <span style={{ fontSize: '10.5px', color: secondaryText, display: 'block', marginTop: '2px' }}>{proj.brand}</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: proj.statusColor,
                    backgroundColor: `${proj.statusColor}10`,
                    padding: '3px 8px',
                    borderRadius: '999px',
                    border: `1px solid ${proj.statusColor}20`
                  }}>
                    {proj.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For You */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: primaryText, margin: 0 }}>Recommended For You</h3>
              <Link href="/creator/gigs" style={{ color: accentColor, fontSize: '11px', fontWeight: 600, textDecoration: 'none' }} className="hover-underline">
                View all
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              {recommendedGigs.map((gig, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: gig.initialBg,
                      color: gig.initialColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: `1px solid ${borderColor}`
                    }}>
                      {gig.initial}
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{gig.title}</span>
                      <span style={{ fontSize: '10px', color: secondaryText, display: 'block', marginTop: '2px' }}>{gig.brand}</span>
                      <span style={{ fontSize: '11px', color: primaryText, display: 'block', marginTop: '4px', fontWeight: 650 }}>
                        {isINR ? `₹${gig.budgetINR}` : `$${gig.budgetUSD}`}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: gig.badgeColor,
                      backgroundColor: gig.badgeBg,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: `1px solid ${gig.badgeColor}20`
                    }}>
                      {gig.badge}
                    </span>
                    <button style={{ background: 'none', border: `1px solid ${borderColor}`, padding: '4px', borderRadius: '6px', cursor: 'pointer', display: 'flex', color: secondaryText }}>
                      <Bookmark size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              style={{
                width: '100%',
                height: '36px',
                backgroundColor: 'transparent',
                border: `1.5px solid ${accentColor}`,
                borderRadius: '999px',
                color: accentColor,
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '16px',
                transition: 'all 0.2s'
              }}
              className="explore-more-gigs-btn"
            >
              Explore More Gigs
            </button>
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
        .shortcut-card-box:hover {
          transform: translateY(-2px);
          border-color: rgba(236, 72, 153, 0.25) !important;
        }
        .shortcut-card-box:hover .icon-circle {
          transform: scale(1.05);
        }

        /* BANNER EFFECTS */
        .glow-button:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
        }

        .invite-now-button:hover {
          background-color: rgba(236,72,153,0.04) !important;
          border-color: #DB2777 !important;
          color: #DB2777 !important;
        }

        .improve-profile-btn:hover {
          background-color: rgba(236,72,153,0.1) !important;
        }

        .explore-more-gigs-btn:hover {
          background-color: rgba(236,72,153,0.04) !important;
          color: #DB2777 !important;
          border-color: #DB2777 !important;
        }

        /* RESPONSIVE LAYOUTS */
        @media (max-width: 1024px) {
          .creator-dashboard-main-grid {
            grid-template-columns: 1fr !important;
          }
          .earnings-projects-status-grid {
            grid-template-columns: 1fr !important;
          }
          .shortcuts-grid {
            display: flex !important;
            flex-wrap: nowrap;
            gap: 12px !important;
            padding-bottom: 4px;
            width: max-content !important;
          }
          .shortcut-card-box {
            width: 135px !important;
            flex-shrink: 0;
          }
          .human-difference-banner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 20px !important;
          }
          .banner-divider {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .banner-features {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .inline-divider {
            display: none !important;
          }
          .refer-earn-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .refer-earn-banner button {
            width: 100% !important;
            text-align: center;
          }
        }
      `}</style>

      {/* Social Link Modal */}
      {isSocialLinkModalOpen && (
        <div
          onClick={() => setIsSocialLinkModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '24px',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Link Social Account</h3>
              <button
                onClick={() => setIsSocialLinkModalOpen(false)}
                style={{ background: 'none', border: 'none', color: secondaryText, cursor: 'pointer', padding: '4px' }}
              >
                <XCircle size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Instagram/TikTok Handle</label>
              <input
                type="text"
                placeholder="@username"
                value={socialHandleInput}
                onChange={(e) => setSocialHandleInput(e.target.value)}
                style={{
                  height: '38px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FFFFFF' : '#141417',
                  color: primaryText,
                  padding: '0 12px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={() => {
                if (!socialHandleInput.trim()) return;
                setLinkingSocial(true);
                setTimeout(() => {
                  setLinkingSocial(false);
                  setSocialLinked(true);
                  setIsSocialLinkModalOpen(false);
                  setSocialHandleInput('');
                }, 1200);
              }}
              disabled={linkingSocial}
              style={{
                height: '38px',
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '19px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: linkingSocial ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {linkingSocial ? 'Authenticating...' : 'Authenticate Account'}
            </button>
          </div>
        </div>
      )}

      {/* Tags Modal */}
      {isTagsModalOpen && (
        <div
          onClick={() => setIsTagsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '24px',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Add Specialty Tags</h3>
              <button
                onClick={() => setIsTagsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: secondaryText, cursor: 'pointer', padding: '4px' }}
              >
                <XCircle size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Select Primary Specialty</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                style={{
                  height: '38px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FFFFFF' : '#141417',
                  color: primaryText,
                  padding: '0 10px',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Fashion">Fashion & Apparel</option>
                <option value="Skincare">Skincare & Makeup</option>
                <option value="Tech">Tech & Gadgets Reviews</option>
                <option value="Fitness">Fitness & Wellness</option>
                <option value="Food">Food Recipes & Vlogs</option>
              </select>
            </div>

            <button
              onClick={() => {
                setAddingTags(true);
                setTimeout(() => {
                  setAddingTags(false);
                  setTagsAdded(true);
                  setIsTagsModalOpen(false);
                }, 1000);
              }}
              disabled={addingTags}
              style={{
                height: '38px',
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '19px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: addingTags ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {addingTags ? 'Adding...' : 'Add Specialties'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
