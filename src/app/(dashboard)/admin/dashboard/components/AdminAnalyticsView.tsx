'use client';

import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Calendar, ArrowUpRight, DollarSign } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface ViewProps {
  theme: 'dark' | 'light';
  isLight: boolean;
  cardBg: string;
  borderColor: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  accentColor: string;
  shadowStyle: string;
}

export default function AdminAnalyticsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ViewProps) {
  const { currency } = useCurrency();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '1y'>('30d');

  const getPrice = (inr: number, usd: number) => {
    return displayPrice({ INR: inr, USD: usd }, currency);
  };

  // Dynamic values depending on timeRange
  const stats = {
    '7d': { gmvINR: 12000000, gmvUSD: 144000, revINR: 600000, revUSD: 7200, users: 48, ret: '94.2%' },
    '30d': { gmvINR: 487520000, gmvUSD: 5850000, revINR: 14875200, revUSD: 178000, users: 218, ret: '96.5%' },
    '1y': { gmvINR: 5850000000, gmvUSD: 70200000, revINR: 292500000, revUSD: 3510000, users: 2480, ret: '98.1%' }
  }[timeRange];

  const chartPaths = {
    '7d': {
      gmv: "M 10 110 L 60 95 L 110 90 L 160 80 L 210 70 L 260 50 L 310 40 L 360 20",
      rev: "M 10 115 L 60 108 L 110 102 L 160 95 L 210 90 L 260 78 L 310 65 L 360 48"
    },
    '30d': {
      gmv: "M 10 100 L 60 90 L 110 80 L 160 95 L 210 70 L 260 65 L 310 40 L 360 30",
      rev: "M 10 115 L 60 108 L 110 95 L 160 105 L 210 85 L 260 80 L 310 58 L 360 48"
    },
    '1y': {
      gmv: "M 10 120 L 60 115 L 110 98 L 160 90 L 210 82 L 260 60 L 310 35 L 360 15",
      rev: "M 10 125 L 60 120 L 110 110 L 160 102 L 210 92 L 260 78 L 310 50 L 360 30"
    }
  }[timeRange];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Platform Volume & Growth Analytics</h1>
          <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
            Audit gross merchandising values, commission splits, user acquisition velocities, and cohorts.
          </p>
        </div>

        {/* Time filters */}
        <div style={{
          display: 'flex',
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '10px',
          padding: '2px',
          boxShadow: shadowStyle
        }}>
          {(['7d', '30d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              style={{
                border: 'none',
                backgroundColor: timeRange === r ? accentColor : 'transparent',
                color: timeRange === r ? '#FFFFFF' : secondaryText,
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'Last 1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Main KPI metrics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Platform GMV Volume', val: getPrice(stats.gmvINR, stats.gmvUSD), change: '+12.4%', icon: <TrendingUp size={16} color="#EC4899" /> },
          { label: 'Commission Revenue', val: getPrice(stats.revINR, stats.revUSD), change: '+14.1%', icon: <TrendingUp size={16} color="#8B5CF6" /> },
          { label: 'New Creators Recruited', val: `${stats.users} profiles`, change: '+8.2%', icon: <Users size={16} color="#3B82F6" /> },
          { label: 'Brand Retention Cohort', val: stats.ret, change: '+1.5%', icon: <ArrowUpRight size={16} color="#10B981" /> }
        ].map((kpi, idx) => (
          <div key={idx} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700 }}>{kpi.label}</span>
              {kpi.icon}
            </div>
            <span style={{ fontSize: '20px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em' }}>{kpi.val}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px' }}>
              <span style={{ color: '#10B981', fontWeight: 800 }}>{kpi.change}</span>
              <span style={{ color: mutedText, fontWeight: 550 }}>vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Growth Chart */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Escrow & Volume Trend</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '10.5px', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EC4899' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EC4899' }} />
                <span>GMV Volume</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8B5CF6' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
                <span>Revenue Flow</span>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '200px', position: 'relative' }}>
            <svg viewBox="0 0 400 150" style={{ overflow: 'visible', width: '100%', height: '100%' }}>
              <line x1="0" y1="10" x2="400" y2="10" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />
              <line x1="0" y1="75" x2="400" y2="75" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />
              <line x1="0" y1="140" x2="400" y2="140" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />

              {/* GMV Trend line */}
              <path 
                d={chartPaths.gmv} 
                fill="none" 
                stroke="#EC4899" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                style={{ transition: 'd 0.3s ease' }}
              />
              {/* Revenue flow line */}
              <path 
                d={chartPaths.rev} 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                style={{ transition: 'd 0.3s ease' }}
              />
            </svg>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: mutedText, fontWeight: 700, borderTop: `1px solid ${borderColor}`, paddingTop: '8px' }}>
            <span>Start Period</span>
            <span>Midpoint</span>
            <span>Current Month</span>
          </div>
        </div>

        {/* Subscription Plan Mix */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Plan Distribution</h3>
          
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
            <svg width="100%" height="100%" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="none" stroke={borderColor} strokeWidth="3" opacity="0.2" />
              {/* Agency: 40% */}
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#8B5CF6" strokeWidth="3.5" strokeDasharray="40 100" strokeDashoffset="0" />
              {/* Pro: 35% */}
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#EC4899" strokeWidth="3.5" strokeDasharray="35 100" strokeDashoffset="-40" />
              {/* Basic: 15% */}
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="15 100" strokeDashoffset="-75" />
              {/* Free: 10% */}
              <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10B981" strokeWidth="3.5" strokeDasharray="10 100" strokeDashoffset="-90" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Agency Plan', pct: '40%', val: '₹14.8k / mo', col: '#8B5CF6' },
              { label: 'Pro Creator', pct: '35%', val: '₹7.5k / mo', col: '#EC4899' },
              { label: 'Basic Brand', pct: '15%', val: '₹3.2k / mo', col: '#3B82F6' },
              { label: 'Free Tier', pct: '10%', val: 'None', col: '#10B981' }
            ].map((plan, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: plan.col }} />
                  <span style={{ color: secondaryText, fontWeight: 550 }}>{plan.label}</span>
                </div>
                <span style={{ fontWeight: 700, color: primaryText }}>{plan.pct} ({plan.val})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
