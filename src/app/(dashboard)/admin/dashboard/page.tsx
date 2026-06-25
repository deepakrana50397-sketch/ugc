'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { useTheme } from '@/components/providers/ThemeProvider';
import { 
  Search, Calendar, Bell, Plus, Users, Briefcase, Wallet, Megaphone, 
  Activity, BarChart2, Shield, AlertTriangle, FileText, CreditCard, 
  ChevronDown, Check, X, RefreshCw, Scale, MessageSquare, Info, 
  ShieldCheck, ShieldAlert, Star, ArrowUpRight, ArrowDownRight, Globe, 
  Lock, Download, Mail, Phone, MoreHorizontal, CheckCircle, Settings
} from 'lucide-react';

import dynamic from 'next/dynamic';

const AdminDisputesView = dynamic(() => import('./components/AdminDisputesView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminSettingsView = dynamic(() => import('./components/AdminSettingsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminBrandsView = dynamic(() => import('./components/AdminBrandsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminCreatorsView = dynamic(() => import('./components/AdminCreatorsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminAgenciesView = dynamic(() => import('./components/AdminAgenciesView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminCampaignsView = dynamic(() => import('./components/AdminCampaignsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminDealsView = dynamic(() => import('./components/AdminDealsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminProjectsView = dynamic(() => import('./components/AdminProjectsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminEscrowView = dynamic(() => import('./components/AdminEscrowView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminContractsView = dynamic(() => import('./components/AdminContractsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminPaymentsView = dynamic(() => import('./components/AdminPaymentsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminPayoutsView = dynamic(() => import('./components/AdminPayoutsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminAnalyticsView = dynamic(() => import('./components/AdminAnalyticsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminReportsView = dynamic(() => import('./components/AdminReportsView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});
const AdminRiskView = dynamic(() => import('./components/AdminRiskView'), {
  loading: () => <div className="animate-pulse h-[500px] rounded-2xl bg-stone-100 dark:bg-stone-900/40" />,
});

export default function AdminDashboardPage() {
  const { currency } = useCurrency();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  
  const { theme } = useTheme();
  const [showQuickActionDropdown, setShowQuickActionDropdown] = useState(false);

  // States for row/milestone modifications
  const [payouts, setPayouts] = useState([
    { id: 1, name: 'Riya Mishra', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', project: 'Gloxo Campaign', amountINR: 125000, amountUSD: 1500, milestone: 'Content Review', state: 'Pending', method: 'UPI' },
    { id: 2, name: 'Aman Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', project: 'StyleNova Launch', amountINR: 85000, amountUSD: 1020, milestone: 'Final Delivery', state: 'Pending', method: 'Bank Transfer' },
    { id: 3, name: 'Neha Kapoor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', project: 'FitLife Challenge', amountINR: 95000, amountUSD: 1140, milestone: 'Awaiting Approval', state: 'Review', method: 'UPI' },
    { id: 4, name: 'Digital Sparks', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100', project: 'TechNova Review', amountINR: 150000, amountUSD: 1800, milestone: 'Completed', state: 'Pending', method: 'Bank Transfer' },
    { id: 5, name: 'Travel Tribe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', project: 'UrbanTrail Series', amountINR: 65000, amountUSD: 780, milestone: 'Content Review', state: 'Pending', method: 'UPI' }
  ]);

  useEffect(() => {
  }, []);

  const isLight = theme === 'light';
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const accentColor = '#EC4899';
  const shadowStyle = 'var(--shadow-style)';

  const formatCurrency = (inrVal: number, usdVal: number) => {
    return currency === 'INR' ? `₹${inrVal.toLocaleString('en-IN')}` : `$${usdVal.toLocaleString('en-US')}`;
  };

  const handleApprovePayout = (id: number) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, state: 'Approved' } : p));
  };

  const handleHoldPayout = (id: number) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, state: 'Hold' } : p));
  };

  // 1. Escrow Disputes View
  if (view === 'disputes') {
    return (
      <AdminDisputesView
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

  // 2. System Configs Settings View
  if (view === 'settings') {
    return (
      <AdminSettingsView
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

  // 3. Brands Directory View
  if (view === 'brands') {
    return (
      <AdminBrandsView
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

  // 4. Creators Directory View
  if (view === 'creators') {
    return (
      <AdminCreatorsView
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

  // 5. Agencies Directory View
  if (view === 'agencies') {
    return (
      <AdminAgenciesView
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

  // 6. Campaigns View
  if (view === 'campaigns') {
    return (
      <AdminCampaignsView
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

  // 7. Deals View
  if (view === 'deals') {
    return (
      <AdminDealsView
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

  // 8. Projects View
  if (view === 'projects') {
    return (
      <AdminProjectsView
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

  // 9. Escrow Auditing View
  if (view === 'escrow') {
    return (
      <AdminEscrowView
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

  // 10. Contracts Registry View
  if (view === 'contracts') {
    return (
      <AdminContractsView
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

  // 11. Payments Inbound Log View
  if (view === 'payments') {
    return (
      <AdminPaymentsView
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

  // 12. Payouts Outbound Queue View
  if (view === 'payouts') {
    return (
      <AdminPayoutsView
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

  // 13. Platform Growth Analytics View
  if (view === 'analytics') {
    return (
      <AdminAnalyticsView
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

  // 14. Statements Reports Export View
  if (view === 'reports') {
    return (
      <AdminReportsView
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

  // 15. Risk Assessment Supervision View
  if (view === 'risk') {
    return (
      <AdminRiskView
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

  // 3. Main Screenshot Replicated Dashboard
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      {/* Top Navigation / Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left Search Bar */}
        <div style={{ position: 'relative', width: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
          <input
            type="text"
            placeholder="Search users, gigs, brands, campaigns, deals..."
            style={{
              width: '100%',
              height: '42px',
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              paddingLeft: '44px',
              paddingRight: '40px',
              fontSize: '13px',
              color: primaryText,
              outline: 'none',
              boxShadow: shadowStyle,
            }}
          />
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: 'var(--hover-bg)', border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '2px 6px', fontSize: '9px', color: mutedText, fontWeight: 700 }}>
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        {/* Right Header items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Date range */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            padding: '8px 16px',
            fontSize: '13px',
            color: primaryText,
            boxShadow: shadowStyle
          }}>
            <Calendar size={15} color={accentColor} />
            <span style={{ fontWeight: 650 }}>22 May 2024 - 21 Jun 2024</span>
          </div>

          {/* Notifications bell */}
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: primaryText,
            position: 'relative',
            cursor: 'pointer',
            boxShadow: shadowStyle
          }}>
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontSize: '8px',
              fontWeight: 800,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>9+</span>
          </button>

          {/* Quick Action Button */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowQuickActionDropdown(!showQuickActionDropdown)}
              style={{
                height: '40px',
                padding: '0 18px',
                borderRadius: '12px',
                backgroundColor: accentColor,
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.25)'
              }}
            >
              <span>+ Quick Action</span>
              <ChevronDown size={14} />
            </button>

            {showQuickActionDropdown && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '180px',
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                zIndex: 100,
                padding: '6px',
                animation: 'fadeIn 0.15s ease-out'
              }}>
                {[
                  { label: 'Audit Gig Queue', href: '/admin/gigs' },
                  { label: 'Verify User Identity', href: '/admin/users' },
                  { label: 'Resolve Dispute', href: '/admin/dashboard?view=disputes' },
                  { label: 'Adjust Platform Fees', href: '/admin/dashboard?view=settings' }
                ].map((act, i) => (
                  <Link 
                    key={i} 
                    href={act.href}
                    onClick={() => setShowQuickActionDropdown(false)}
                    style={{
                      display: 'block',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      color: primaryText,
                      textDecoration: 'none',
                      fontWeight: 550,
                      textAlign: 'left'
                    }}
                    className="hover-bg-white-002"
                  >
                    {act.label}
                  </Link>
                ))}
              </div>
            )}
          </div>


        </div>

      </div>

      {/* Main Supervision Dashboard Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>Platform Supervision</h1>
        <p style={{ color: mutedText, fontSize: '14.5px', marginTop: '4px', opacity: 0.8 }}>
          Monitor deals, campaigns, escrow accounts, payouts, compliance and platform performance.
        </p>
      </div>

      {/* 8 Metric Cards Grid */}
      <div className="metric-scroll-container" style={{ width: '100%', overflowX: 'auto', display: 'flex', paddingBottom: '4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '14px', width: '100%', minWidth: '1280px' }}>
          {[
            { label: 'Platform Volume (GMV)', valINR: 487520000, valUSD: 5850000, change: '▲ 12.6%', type: 'increase', icon: '₹', iconColor: '#8B5CF6' },
            { label: 'Funds in Escrow', valINR: 189240000, valUSD: 2270000, change: '▲ 9.4%', type: 'increase', icon: '💼', iconColor: '#10B981' },
            { label: 'Active Campaigns', val: '386', change: '▲ 8.7%', type: 'increase', icon: '📢', iconColor: '#F59E0B' },
            { label: 'Live Gigs', val: '1,248', change: '▲ 11.3%', type: 'increase', icon: '📊', iconColor: '#EC4899' },
            { label: 'Active Deals', val: '642', change: '▲ 10.2%', type: 'increase', icon: '🤝', iconColor: '#3B82F6' },
            { label: 'Pending Payouts', valINR: 42560000, valUSD: 510000, change: '▲ 7.8%', type: 'increase', icon: '💰', iconColor: '#A855F7' },
            { label: 'Platform Revenue', valINR: 14875200, valUSD: 178000, change: '▲ 14.1%', type: 'increase', icon: '📈', iconColor: '#22C55E' },
            { label: 'Open Disputes / Alerts', val: '28', change: '▼ 12.5%', type: 'decrease', icon: '🛡️', iconColor: '#EF4444' }
          ].map((m, idx) => {
            const isFinancial = m.valINR !== undefined;
            const displayVal = isFinancial ? formatCurrency(m.valINR!, m.valUSD!) : m.val;

            return (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ 
                  padding: '16px', 
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '16px',
                  boxShadow: shadowStyle,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  minHeight: '100px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 700, lineHeight: 1.3, height: '28px', overflow: 'hidden' }}>{m.label}</span>
                  <span style={{ fontSize: '14px' }}>{m.icon}</span>
                </div>
                <span style={{ fontSize: '16.5px', fontWeight: 850, color: primaryText, letterSpacing: '-0.01em', marginTop: '2px' }}>{displayVal}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: m.type === 'increase' ? '#10B981' : '#EF4444' }}>{m.change}</span>
                  <span style={{ fontSize: '9px', color: mutedText, fontWeight: 550 }}>vs last 30d</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 1: Live Deals Table (Left) + Quick Actions & Snapshot (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }} className="super-admin-row-1">
        
        {/* Live Deals & Campaign Oversight Table */}
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: shadowStyle,
          overflowX: 'auto'
        }} className="inner-scroller">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Live Deals & Campaign Oversight</h3>
            </div>
            <Link href="/admin/dashboard?view=deals" style={{ fontSize: '12px', fontWeight: 700, color: accentColor, textDecoration: 'none' }} className="hover-underline">
              View all deals →
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', height: '36px' }}>
                <th style={{ padding: '8px' }}>Brand / Campaign</th>
                <th style={{ padding: '8px' }}>Creators Assigned</th>
                <th style={{ padding: '8px' }}>Total Budget</th>
                <th style={{ padding: '8px' }}>Escrow Status</th>
                <th style={{ padding: '8px' }}>Progress</th>
                <th style={{ padding: '8px' }}>Payout Status</th>
                <th style={{ padding: '8px' }}>Deadline</th>
                <th style={{ padding: '8px' }}>Overall Status</th>
                <th style={{ padding: '8px' }}></th>
              </tr>
            </thead>
            <tbody>
              {[
                { brand: 'Gloxo', logo: 'G', logoBg: 'rgba(139, 92, 246, 0.08)', logoCol: '#8B5CF6', title: 'Summer Glow Campaign', count: 3, budgetINR: 1800000, budgetUSD: 22000, escrow: 'Funded', progress: 75, payout: 'Awaiting Approval', deadline: '28 Jun 2024', status: 'In Progress', statusColor: '#3B82F6' },
                { brand: 'StyleNova', logo: 'S', logoBg: 'rgba(236, 72, 153, 0.08)', logoCol: '#EC4899', title: 'New Drop Launch', count: 4, budgetINR: 2250000, budgetUSD: 27000, escrow: 'Funded', progress: 60, payout: 'Ready to Release', deadline: '25 Jun 2024', status: 'Awaiting Approval', statusColor: '#F97316' },
                { brand: 'FitLife India', logo: 'F', logoBg: 'rgba(59, 130, 246, 0.08)', logoCol: '#3B82F6', title: 'Fitness Challenge', count: 2, budgetINR: 1200000, budgetUSD: 14400, escrow: 'Funded', progress: 90, payout: 'Ready to Release', deadline: '22 Jun 2024', status: 'In Progress', statusColor: '#3B82F6' },
                { brand: 'TechNova', logo: 'T', logoBg: 'rgba(16, 185, 129, 0.08)', logoCol: '#10B981', title: 'Gadget Review Series', count: 5, budgetINR: 3000000, budgetUSD: 36000, escrow: 'Partially Funded', progress: 40, payout: 'On Hold', deadline: '30 Jun 2024', status: 'At Risk', statusColor: '#EF4444' },
                { brand: 'Greenly', logo: 'G', logoBg: 'rgba(34, 197, 94, 0.08)', logoCol: '#22C55E', title: 'Sustainability Drive', count: 3, budgetINR: 850000, budgetUSD: 10200, escrow: 'Funded', progress: 100, payout: 'Released', deadline: '18 Jun 2024', status: 'Completed', statusColor: '#10B981' },
                { brand: 'UrbanTrail', logo: 'U', logoBg: 'rgba(249, 115, 22, 0.08)', logoCol: '#F97316', title: 'Travel Diaries', count: 2, budgetINR: 675000, budgetUSD: 8100, escrow: 'Funded', progress: 20, payout: 'Pending', deadline: '05 Jul 2024', status: 'In Progress', statusColor: '#3B82F6' }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid ${borderColor}`, height: '56px', fontSize: '12.5px' }} className="hover-row-bg">
                  <td style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: row.logoBg,
                        color: row.logoCol,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}>{row.logo}</div>
                      <div>
                        <span style={{ fontWeight: 750, color: primaryText, display: 'block' }}>{row.brand}</span>
                        <span style={{ fontSize: '10.5px', color: mutedText, display: 'block', marginTop: '2px' }}>{row.title}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(Math.min(row.count, 3))].map((_, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            width: '22px', 
                            height: '22px', 
                            borderRadius: '50%', 
                            border: '1.5px solid var(--card-bg)',
                            marginLeft: i > 0 ? '-6px' : '0', 
                            overflow: 'hidden',
                            backgroundColor: '#E4E4E7'
                          }}
                        >
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + (i * 1000000)}?w=40&auto=format&fit=crop&q=60`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
                        </div>
                      ))}
                      {row.count > 3 && (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: mutedText, marginLeft: '4px' }}>+{row.count - 3}</span>
                      )}
                    </div>
                  </td>

                  <td style={{ padding: '8px', fontWeight: 750, color: primaryText }}>
                    {formatCurrency(row.budgetINR, row.budgetUSD)}
                  </td>

                  <td style={{ padding: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: row.escrow.includes('Partially') ? '#F97316' : '#10B981',
                      backgroundColor: row.escrow.includes('Partially') ? 'rgba(249,115,22,0.06)' : 'rgba(16,185,129,0.06)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: `1px solid ${row.escrow.includes('Partially') ? 'rgba(249,115,22,0.1)' : 'rgba(16,185,129,0.1)'}`
                    }}>{row.escrow}</span>
                  </td>

                  <td style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '90px' }}>
                      <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${row.progress}%`, height: '100%', backgroundColor: row.progress === 100 ? '#10B981' : accentColor, borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '10.5px', fontWeight: 700, color: primaryText }}>{row.progress}%</span>
                    </div>
                  </td>

                  <td style={{ padding: '8px', fontWeight: 650, color: row.payout === 'Released' ? '#10B981' : row.payout === 'On Hold' ? '#EF4444' : primaryText }}>
                    {row.payout}
                  </td>

                  <td style={{ padding: '8px', color: secondaryText, fontSize: '11.5px' }}>
                    {row.deadline}
                  </td>

                  <td style={{ padding: '8px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: `${row.statusColor}08`,
                      color: row.statusColor,
                      border: `1px solid ${row.statusColor}18`
                    }}>{row.status}</span>
                  </td>

                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', color: mutedText, cursor: 'pointer', padding: '4px' }} className="hover-white-icon">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions (Right Column) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Actions Panel */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: shadowStyle
          }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: '0 0 16px 0' }}>Quick Actions</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Approve Release', icon: <CheckCircle size={18} />, col: '#10B981', bg: 'rgba(16,185,129,0.06)', href: '/admin/applications' },
                { label: 'Freeze Escrow', icon: <Lock size={18} />, col: '#EF4444', bg: 'rgba(239,68,68,0.06)', href: '/admin/dashboard?view=disputes' },
                { label: 'Review Dispute', icon: <Scale size={18} />, col: '#F97316', bg: 'rgba(249,115,22,0.06)', href: '/admin/dashboard?view=disputes' },
                { label: 'Export Report', icon: <Download size={18} />, col: '#3B82F6', bg: 'rgba(59,130,246,0.06)', href: '/admin/dashboard?view=reports' },
                { label: 'Broadcast Update', icon: <Megaphone size={18} />, col: '#8B5CF6', bg: 'rgba(139,92,246,0.06)', href: '/admin/dashboard?view=settings' },
                { label: 'System Settings', icon: <Settings size={18} />, col: '#71717A', bg: 'var(--hover-bg)', href: '/admin/dashboard?view=settings' }
              ].map((act, i) => (
                <Link
                  key={i}
                  href={act.href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 8px',
                    borderRadius: '16px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: cardBg,
                    textAlign: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  className="quick-action-box"
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: act.bg,
                    color: act.col,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }} className="icon-wrap">{act.icon}</div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: primaryText }}>{act.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Financial Snapshot */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: shadowStyle
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Financial Snapshot</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: mutedText, fontSize: '11px', fontWeight: 650 }}>
                <span>This Month</span>
                <ChevronDown size={12} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Total Escrow Balance', valINR: 189240000, valUSD: 2270000, col: '#8B5CF6', bg: 'rgba(139,92,246,0.06)' },
                { label: 'Released This Week', valINR: 48560000, valUSD: 580000, col: '#10B981', bg: 'rgba(16,185,129,0.06)' },
                { label: 'Pending Settlements', valINR: 42560000, valUSD: 510000, col: '#F59E0B', bg: 'rgba(245,158,11,0.06)' },
                { label: 'Failed Transfers', valINR: 45000, valUSD: 540, col: '#EF4444', bg: 'rgba(239,68,68,0.06)' }
              ].map((f, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: idx < 3 ? '12px' : '0', borderBottom: idx < 3 ? `1px solid ${borderColor}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: f.col }} />
                    <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 550 }}>{f.label}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: primaryText }}>
                    {formatCurrency(f.valINR, f.valUSD)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Section 2: Escrow Control Center (Left) + Payout & Transfer Queue (Middle) + Risk / Health (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'start' }} className="super-admin-row-2">
        
        {/* Escrow Control Center */}
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: shadowStyle,
          overflowX: 'auto',
          minHeight: '380px'
        }} className="inner-scroller">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Escrow Control Center</h3>
            <Link href="/admin/dashboard?view=escrow" style={{ fontSize: '11.5px', fontWeight: 700, color: accentColor, textDecoration: 'none' }} className="hover-underline">
              View all escrow →
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, color: mutedText, height: '32px', fontWeight: 700 }}>
                <th style={{ padding: '6px', textAlign: 'left' }}>Brand</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Total Funded</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Locked</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Releasable</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Released</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Gloxo', totalINR: 4500000, totalUSD: 54000, lockedINR: 1800000, lockedUSD: 21500, releasableINR: 620000, releasableUSD: 7400, releasedINR: 1980000, releasedUSD: 23700 },
                { name: 'StyleNova', totalINR: 6000000, totalUSD: 72000, lockedINR: 2250000, lockedUSD: 27000, releasableINR: 875000, releasableUSD: 10500, releasedINR: 2725000, releasedUSD: 32600 },
                { name: 'TechNova', totalINR: 4000000, totalUSD: 48000, lockedINR: 1500000, lockedUSD: 18000, releasableINR: 300000, releasableUSD: 3600, releasedINR: 1800000, releasedUSD: 21600 },
                { name: 'FitLife India', totalINR: 2500000, totalUSD: 30000, lockedINR: 1200000, lockedUSD: 14400, releasableINR: 450000, releasableUSD: 5400, releasedINR: 750000, releasedUSD: 9000 }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${borderColor}`, height: '44px' }}>
                  <td style={{ padding: '6px', fontWeight: 700, color: primaryText }}>{row.name}</td>
                  <td style={{ padding: '6px', textAlign: 'right', color: secondaryText }}>{formatCurrency(row.totalINR, row.totalUSD)}</td>
                  <td style={{ padding: '6px', textAlign: 'right', color: secondaryText }}>{formatCurrency(row.lockedINR, row.lockedUSD)}</td>
                  <td style={{ padding: '6px', textAlign: 'right', color: '#10B981', fontWeight: 650 }}>{formatCurrency(row.releasableINR, row.releasableUSD)}</td>
                  <td style={{ padding: '6px', textAlign: 'right', color: secondaryText }}>{formatCurrency(row.releasedINR, row.releasedUSD)}</td>
                </tr>
              ))}
              {/* Total row */}
              <tr style={{ height: '48px', fontWeight: 800, color: primaryText }}>
                <td style={{ padding: '6px' }}>Total</td>
                <td style={{ padding: '6px', textAlign: 'right' }}>{formatCurrency(17000000, 204000)}</td>
                <td style={{ padding: '6px', textAlign: 'right' }}>{formatCurrency(6750000, 80900)}</td>
                <td style={{ padding: '6px', textAlign: 'right', color: '#10B981' }}>{formatCurrency(2245000, 26900)}</td>
                <td style={{ padding: '6px', textAlign: 'right' }}>{formatCurrency(7255000, 87000)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payout & Transfer Queue */}
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: shadowStyle,
          overflowX: 'auto',
          minHeight: '380px'
        }} className="inner-scroller">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Payout & Transfer Queue</h3>
            <Link href="/admin/dashboard?view=payouts" style={{ fontSize: '11.5px', fontWeight: 700, color: accentColor, textDecoration: 'none' }} className="hover-underline">
              View all payouts →
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${borderColor}`, color: mutedText, height: '32px', fontWeight: 700 }}>
                <th style={{ padding: '6px', textAlign: 'left' }}>Recipient</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '6px', textAlign: 'center' }}>Milestone</th>
                <th style={{ padding: '6px', textAlign: 'center' }}>Approval</th>
                <th style={{ padding: '6px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((row) => (
                <tr key={row.id} style={{ borderBottom: `1px solid ${borderColor}`, height: '48px' }}>
                  <td style={{ padding: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={row.avatar} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} alt="Avatar" />
                      <span style={{ fontWeight: 700, color: primaryText }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '6px', textAlign: 'right', fontWeight: 750, color: primaryText }}>
                    {formatCurrency(row.amountINR, row.amountUSD)}
                  </td>
                  <td style={{ padding: '6px', textAlign: 'center', color: secondaryText }}>
                    {row.milestone}
                  </td>
                  <td style={{ padding: '6px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: row.state === 'Approved' ? 'rgba(16,185,129,0.06)' : row.state === 'Hold' ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)',
                      color: row.state === 'Approved' ? '#10B981' : row.state === 'Hold' ? '#EF4444' : '#F59E0B'
                    }}>{row.state}</span>
                  </td>
                  <td style={{ padding: '6px', textAlign: 'right' }}>
                    {row.state === 'Pending' || row.state === 'Review' ? (
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleApprovePayout(row.id)}
                          style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: 'none', color: '#10B981', padding: '3px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 800, cursor: 'pointer' }}
                        >Approve</button>
                        <button 
                          onClick={() => handleHoldPayout(row.id)}
                          style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: 'none', color: '#EF4444', padding: '3px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 800, cursor: 'pointer' }}
                        >Hold</button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '10px', color: mutedText, fontWeight: 600 }}>Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Risk & Alerts + Platform Health Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Risk & Alerts */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '20px 24px',
            boxShadow: shadowStyle
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: primaryText, margin: 0 }}>Risk & Alerts</h3>
              <Link href="/admin/dashboard?view=risk" style={{ fontSize: '11px', color: accentColor, fontWeight: 700, textDecoration: 'none' }} className="hover-underline">
                View all →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'At Risk Campaigns', count: 7, col: '#EF4444', bg: 'rgba(239,68,68,0.06)' },
                { label: 'Delayed Projects', count: 12, col: '#F97316', bg: 'rgba(249,115,22,0.06)' },
                { label: 'Disputes Pending', count: 28, col: '#EF4444', bg: 'rgba(239,68,68,0.06)' },
                { label: 'KYC Incomplete', count: 15, col: '#3B82F6', bg: 'rgba(59,130,246,0.06)' },
                { label: 'Low Escrow Balance', count: 6, col: '#F97316', bg: 'rgba(249,115,22,0.06)' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
                  <span style={{ fontSize: '12px', color: secondaryText, fontWeight: 550 }}>{item.label}</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: item.col,
                    backgroundColor: item.bg,
                    width: '24px',
                    height: '20px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${item.col}15`
                  }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '20px 24px',
            boxShadow: shadowStyle
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: primaryText, margin: 0 }}>Platform Health</h3>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>99.98% Uptime</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Payment Gateway', status: 'Healthy' },
                { label: 'Escrow Service', status: 'Healthy' },
                { label: 'Notification Service', status: 'Healthy' },
                { label: 'Database Performance', status: 'Healthy' },
                { label: 'API Response Time', status: '142 ms' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    <span style={{ fontSize: '11.5px', color: secondaryText, fontWeight: 550 }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: primaryText, fontWeight: 700 }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Section 3: Bottom Analytics Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '24px', alignItems: 'start' }} className="super-admin-row-3">
        
        {/* Column 1: Platform Volume Overview */}
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: shadowStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Platform Volume Overview</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: mutedText, fontSize: '11px', fontWeight: 650 }}>
              <span>Last 30 Days</span>
              <ChevronDown size={12} />
            </div>
          </div>

          {/* SVG Multi Line Chart */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Chart Legend */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '8px', fontSize: '10px', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EC4899' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EC4899' }} />
                <span>Volume (GMV)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8B5CF6' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
                <span>Revenue</span>
              </div>
            </div>

            <svg viewBox="0 0 400 130" style={{ overflow: 'visible', width: '100%' }}>
              {/* Grid Lines */}
              <line x1="0" y1="10" x2="400" y2="10" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />
              <line x1="0" y1="60" x2="400" y2="60" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />
              <line x1="0" y1="110" x2="400" y2="110" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />

              {/* GMV Line (Pink) */}
              <path 
                d="M 10 100 L 60 90 L 110 80 L 160 95 L 210 70 L 260 65 L 310 40 L 360 30" 
                fill="none" 
                stroke="#EC4899" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <circle cx="360" cy="30" r="3.5" fill="#EC4899" />

              {/* Revenue Line (Purple) */}
              <path 
                d="M 10 115 L 60 108 L 110 95 L 160 105 L 210 85 L 260 80 L 310 58 L 360 48" 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <circle cx="360" cy="48" r="3.5" fill="#8B5CF6" />
            </svg>

            {/* X-Axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 4px 0 4px', borderTop: `1px solid ${borderColor}`, marginTop: '8px', fontSize: '9px', color: mutedText, fontWeight: 700 }}>
              <span>22 May</span>
              <span>26 May</span>
              <span>30 May</span>
              <span>3 Jun</span>
              <span>7 Jun</span>
              <span>11 Jun</span>
              <span>15 Jun</span>
              <span>19 Jun</span>
            </div>
          </div>
        </div>

        {/* Column 2: Campaign Status Distribution */}
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: shadowStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Campaign Status Distribution</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* SVG Doughnut Ring */}
            <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
              <svg width="100%" height="100%" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.91" fill="none" stroke={isLight ? '#F3F4F6' : 'rgba(255,255,255,0.05)'} strokeWidth="3.5" />
                
                {/* Segment 1: In Progress 38% (offset 0) */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="38 100" strokeDashoffset="0" />
                
                {/* Segment 2: Awaiting Approval 22% (offset 100-38 = 62) */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#F97316" strokeWidth="3.5" strokeDasharray="22 100" strokeDashoffset="-38" />
                
                {/* Segment 3: Completed 20% */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10B981" strokeWidth="3.5" strokeDasharray="20 100" strokeDashoffset="-60" />
                
                {/* Segment 4: At Risk 10% */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="10 100" strokeDashoffset="-80" />

                {/* Segment 5: On Hold 6% */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#A855F7" strokeWidth="3.5" strokeDasharray="6 100" strokeDashoffset="-90" />

                {/* Segment 6: Cancelled 4% */}
                <circle cx="18" cy="18" r="15.91" fill="none" stroke="#71717A" strokeWidth="3.5" strokeDasharray="4 100" strokeDashoffset="-96" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: '15px', fontWeight: 850, color: primaryText, lineHeight: 1 }}>386</span>
              </div>
            </div>

            {/* Legends list */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', width: '100%' }}>
              {[
                { label: 'In Progress', pct: '38%', count: 147, col: '#3B82F6' },
                { label: 'Awaiting', pct: '22%', count: 85, col: '#F97316' },
                { label: 'Completed', pct: '20%', count: 77, col: '#10B981' },
                { label: 'At Risk', pct: '10%', count: 39, col: '#EF4444' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.col }} />
                    <span style={{ color: secondaryText, fontWeight: 550 }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: 750, color: primaryText }}>{item.pct} ({item.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Application Funnel */}
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: shadowStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Application Funnel</h3>
          
          {/* Funnel Layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Applications', count: '24,850', pct: '100%', width: '100%', bg: 'rgba(139,92,246,0.15)', col: '#8B5CF6' },
              { label: 'Shortlisted', count: '8,420', pct: '33.9%', width: '80%', bg: 'rgba(236,72,153,0.15)', col: '#EC4899' },
              { label: 'Invited', count: '4,120', pct: '16.6%', width: '60%', bg: 'rgba(249,115,22,0.15)', col: '#F97316' },
              { label: 'Hired/Selected', count: '2,148', pct: '8.6%', width: '45%', bg: 'rgba(16,185,129,0.15)', col: '#10B981' }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '80px', fontSize: '11px', color: secondaryText, fontWeight: 550 }}>{f.label}</div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: f.width,
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: f.bg,
                    border: `1px solid ${f.col}25`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: f.col }}>{f.count}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: f.col }}>{f.pct}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .metric-scroll-container::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .metric-scroll-container {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        .hover-row-bg:hover {
          background-color: var(--hover-bg) !important;
        }

        .quick-action-box:hover {
          transform: translateY(-2px);
          border-color: ${accentColor}30 !important;
        }
        .quick-action-box:hover .icon-wrap {
          transform: scale(1.05);
        }

        @media (max-width: 1200px) {
          .super-admin-row-1 {
            grid-template-columns: 1fr !important;
          }
          .super-admin-row-2 {
            grid-template-columns: 1fr !important;
          }
          .super-admin-row-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
