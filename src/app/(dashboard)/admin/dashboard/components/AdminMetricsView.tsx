'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, Wallet, ArrowUpRight, ArrowDownRight, 
  TrendingUp, Calendar, ChevronDown, CheckCircle, ShieldAlert, Sparkles 
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface AdminMetricsViewProps {
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

export default function AdminMetricsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: AdminMetricsViewProps) {
  const { currency } = useCurrency();
  const [selectedRange, setSelectedRange] = useState<'30d' | '90d' | '12m'>('30d');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Stats mock data
  const mainMetrics = [
    { label: 'Total Verified Users', val: '1,650', change: '+18% MoM', type: 'increase', icon: <Users size={18} />, iconColor: '#8B5CF6' },
    { label: 'Active Public Gigs', val: '48', change: '+12% this week', type: 'increase', icon: <Briefcase size={18} />, iconColor: '#EC4899' },
    { label: 'Locked Escrow', valINR: 125000, valUSD: 1500, change: 'Safe deposits', type: 'info', icon: <Wallet size={18} />, iconColor: '#3B82F6' },
    { label: 'Platform Net Revenue', valINR: 32490, valUSD: 412, change: '+24% MoM', type: 'increase', icon: <TrendingUp size={18} />, iconColor: '#10B981' }
  ];

  // Revenue SVG Mock Data points
  const revenuePoints = {
    '30d': [
      { label: 'May 28', inr: 12000, usd: 150 },
      { label: 'Jun 03', inr: 16000, usd: 200 },
      { label: 'Jun 10', inr: 21000, usd: 260 },
      { label: 'Jun 17', inr: 25000, usd: 310 },
      { label: 'Jun 25', inr: 32490, usd: 412 },
    ],
    '90d': [
      { label: 'Apr 01', inr: 8000, usd: 100 },
      { label: 'Apr 30', inr: 15000, usd: 190 },
      { label: 'May 30', inr: 24000, usd: 300 },
      { label: 'Jun 25', inr: 32490, usd: 412 },
    ],
    '12m': [
      { label: 'Jul 25', inr: 2000, usd: 25 },
      { label: 'Sep 25', inr: 6000, usd: 75 },
      { label: 'Nov 25', inr: 12000, usd: 150 },
      { label: 'Jan 25', inr: 18000, usd: 225 },
      { label: 'Mar 25', inr: 26000, usd: 330 },
      { label: 'Jun 25', inr: 32490, usd: 412 },
    ]
  };

  const chartData = revenuePoints[selectedRange];
  const maxVal = Math.max(...chartData.map(d => currency === 'INR' ? d.inr : d.usd)) * 1.15;

  // Render SVG Path generator
  const getSvgCoordinates = () => {
    const width = 500;
    const height = 150;
    const padding = 10;
    const stepX = (width - padding * 2) / (chartData.length - 1);
    
    return chartData.map((d, index) => {
      const val = currency === 'INR' ? d.inr : d.usd;
      const x = padding + index * stepX;
      const y = height - padding - (val / maxVal) * (height - padding * 2);
      return { x, y, ...d };
    });
  };

  const coordinates = getSvgCoordinates();
  const pathData = coordinates.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  const areaData = coordinates.length > 0 
    ? `${pathData} L ${coordinates[coordinates.length - 1].x} 150 L ${coordinates[0].x} 150 Z`
    : '';

  const getValDisplay = (inrVal: number, usdVal: number) => {
    return displayPrice({ INR: inrVal, USD: usdVal }, currency);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {mainMetrics.map((m, idx) => {
          const isFinancial = m.valINR !== undefined;
          const displayValue = isFinancial 
            ? getValDisplay(m.valINR!, m.valUSD!) 
            : m.val;

          return (
            <div 
              key={idx} 
              className="glass-panel" 
              style={{ 
                padding: '24px', 
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '20px',
                boxShadow: shadowStyle,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'transform 0.2s',
                cursor: 'default'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 650, color: mutedText }}>{m.label}</span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: `${m.iconColor}15`,
                  color: m.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {m.icon}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '26px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em' }}>
                  {displayValue}
                </span>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  color: m.type === 'increase' ? '#10b981' : '#3b82f6',
                  backgroundColor: m.type === 'increase' ? 'rgba(16,185,129,0.06)' : 'rgba(59,130,246,0.06)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Platform Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }} className="admin-metrics-grid">
        
        {/* Left: Platform Revenue Chart */}
        <div style={{ 
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          padding: '24px',
          boxShadow: shadowStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Platform Revenue Analytics</h3>
              <p style={{ fontSize: '11.5px', color: mutedText, margin: '4px 0 0 0' }}>Total accumulated commission fees across project escrows.</p>
            </div>
            
            {/* Time range selector */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--hover-bg)', padding: '3px', borderRadius: '10px', border: `1px solid ${borderColor}` }}>
              {(['30d', '90d', '12m'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setSelectedRange(r);
                    setHoverIndex(null);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: selectedRange === r ? (isLight ? '#FFFFFF' : 'rgba(255,255,255,0.08)') : 'transparent',
                    color: selectedRange === r ? primaryText : mutedText,
                    transition: 'all 0.2s',
                    boxShadow: selectedRange === r && isLight ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {r === '30d' ? '30 Days' : r === '90d' ? '90 Days' : '12 Months'}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Area Line Chart */}
          <div style={{ position: 'relative', width: '100%', padding: '10px 0 0 0' }}>
            <svg viewBox="0 0 500 150" style={{ overflow: 'visible', width: '100%' }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={isLight ? "0.15" : "0.25"} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="10" x2="500" y2="10" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />
              <line x1="0" y1="75" x2="500" y2="75" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke={borderColor} strokeDasharray="3,3" opacity="0.3" />

              {/* Area */}
              {areaData && <path d={areaData} fill="url(#areaGrad)" />}

              {/* Line */}
              {pathData && (
                <path 
                  d={pathData} 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              )}

              {/* Dots & Interactions */}
              {coordinates.map((pt, idx) => (
                <g key={idx}>
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={hoverIndex === idx ? "5" : "3.5"} 
                    fill={hoverIndex === idx ? "#10B981" : (isLight ? "#FFFFFF" : "#09090B")} 
                    stroke="#10B981" 
                    strokeWidth="2" 
                    style={{ transition: 'all 0.15s ease', cursor: 'pointer' }}
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                  {hoverIndex === idx && (
                    <g>
                      <rect 
                        x={pt.x - 55} 
                        y={pt.y - 36} 
                        width="110" 
                        height="26" 
                        rx="6" 
                        fill={isLight ? "#09090B" : "#FFFFFF"} 
                        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" 
                      />
                      <text 
                        x={pt.x} 
                        y={pt.y - 20} 
                        fill={isLight ? "#FFFFFF" : "#09090B"} 
                        fontSize="9.5" 
                        fontWeight="800" 
                        textAnchor="middle"
                      >
                        {getValDisplay(pt.inr, pt.usd)}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>

            {/* X Axis Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 6px 0 6px', borderTop: `1px solid ${borderColor}`, marginTop: '8px' }}>
              {chartData.map((d, idx) => (
                <span key={idx} style={{ fontSize: '10px', color: mutedText, fontWeight: 700 }}>
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Registration distribution & alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* User Signups split */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: shadowStyle
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: '0 0 16px 0' }}>Registration Split</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Creator */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  <span style={{ color: primaryText }}>Creators & Agencies</span>
                  <span style={{ color: '#8B5CF6' }}>1,230 (74.5%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '4px' }}>
                  <div style={{ width: '74.5%', height: '100%', backgroundColor: '#8B5CF6', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Brands */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  <span style={{ color: primaryText }}>Brand Accounts</span>
                  <span style={{ color: '#EC4899' }}>420 (25.5%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '4px' }}>
                  <div style={{ width: '25.5%', height: '100%', backgroundColor: '#EC4899', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Vetting Warning Panel */}
          <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '20px 24px',
            boxShadow: shadowStyle,
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              flexShrink: 0
            }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: primaryText, display: 'block' }}>Vetting Queue Warning</span>
              <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px', lineHeight: '1.4' }}>
                There are 4 pending briefs flagged with below-standard day rates. Check Audit Queue.
              </span>
            </div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .admin-metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
