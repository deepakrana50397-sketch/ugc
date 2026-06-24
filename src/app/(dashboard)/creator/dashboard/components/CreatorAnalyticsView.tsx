'use client';

import React, { useState } from 'react';
import {
  TrendingUp, Eye, Send, CheckCircle, Trophy, Info, 
  Calendar, ChevronDown, Sparkles, FolderOpen, ShieldCheck, X
} from 'lucide-react';

interface AnalyticsViewProps {
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

export default function CreatorAnalyticsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: AnalyticsViewProps) {
  const [lineChartHoverIndex, setLineChartHoverIndex] = useState<number | null>(null);
  const [barChartHoverIndex, setBarChartHoverIndex] = useState<number | null>(null);

  // Mock data for Line Chart: Profile Views (30 days)
  const lineData = [
    220, 260, 250, 310, 340, 300, 290, 330, 280, 250, 300, 380, 420, 390, 330, 310, 360, 350, 290, 370, 400, 460, 420, 380, 430, 410, 440, 410, 380, 330
  ];

  const lineDates = [
    '22 May', '23 May', '24 May', '25 May', '26 May', '27 May', '28 May', '29 May', '30 May', '31 May',
    '1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun', '8 Jun', '9 Jun', '10 Jun',
    '11 Jun', '12 Jun', '13 Jun', '14 Jun', '15 Jun', '16 Jun', '17 Jun', '18 Jun', '19 Jun', '20 Jun', '21 Jun'
  ];

  // Mock data for Bar Chart: Applications Trend (30 days)
  const barData = [
    18, 22, 14, 25, 20, 12, 19, 28, 15, 10, 18, 24, 29, 21, 15, 12, 22, 26, 17, 21,
    25, 31, 23, 19, 27, 24, 28, 22, 20, 15
  ];

  // SVG coordinates calculations for line chart
  const svgWidth = 720;
  const svgHeight = 220;
  const padding = 20;

  const getCoordinates = () => {
    const maxVal = Math.max(...lineData);
    const minVal = Math.min(...lineData);
    const range = maxVal - minVal;
    
    return lineData.map((val, idx) => {
      const x = padding + (idx * (svgWidth - padding * 2)) / (lineData.length - 1);
      const y = svgHeight - padding - ((val - minVal) * (svgHeight - padding * 2)) / range;
      return { x, y, val, date: lineDates[idx] };
    });
  };

  const points = getCoordinates();

  // Create path string for SVG line
  const linePath = points.reduce((path, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`;
  }, '');

  // Create smooth area path string
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: primaryText, transition: 'all 0.3s' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.02em', margin: 0 }}>
            Analytics
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Track your performance and growth on igigster
          </p>
        </div>

        {/* Date Filter Selector */}
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 600,
            color: secondaryText,
            cursor: 'pointer',
            boxShadow: shadowStyle
          }}
        >
          <Calendar size={14} style={{ color: mutedText }} />
          <span>22 May 2024 - 21 Jun 2024</span>
        </div>
      </div>

      {/* Grid: 5 Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', overflowX: 'auto' }} className="inner-scroller">
        
        {/* Metric 1: Profile Views */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: isLight ? '#F3E8FF' : 'rgba(139,92,246,0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderOpen size={16} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Profile Views</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '12px' }}>
            2,543
          </div>
          <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px' }}>
            ▲ 18.6% <span style={{ color: mutedText, fontWeight: 500 }}>vs last 30 days</span>
          </div>
          {/* Mini Sparkline Chart */}
          <div style={{ height: '24px', marginTop: '12px' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path d="M 0 18 Q 20 8 40 16 T 80 6 T 100 12" fill="none" stroke="#8B5CF6" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Metric 2: Gig Views */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: isLight ? '#FCE7F3' : 'rgba(236,72,153,0.1)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={16} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Gig Views</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '12px' }}>
            8,921
          </div>
          <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px' }}>
            ▲ 24.8% <span style={{ color: mutedText, fontWeight: 500 }}>vs last 30 days</span>
          </div>
          {/* Mini Sparkline Chart */}
          <div style={{ height: '24px', marginTop: '12px' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path d="M 0 15 Q 15 22 35 10 T 70 18 T 100 8" fill="none" stroke="#EC4899" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Metric 3: Applications */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: isLight ? '#FFEDD5' : 'rgba(249,115,22,0.1)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={16} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Applications</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '12px' }}>
            147
          </div>
          <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px' }}>
            ▲ 12.8% <span style={{ color: mutedText, fontWeight: 500 }}>vs last 30 days</span>
          </div>
          {/* Mini Sparkline Chart */}
          <div style={{ height: '24px', marginTop: '12px' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path d="M 0 20 Q 25 15 50 18 T 85 8 T 100 14" fill="none" stroke="#F97316" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Metric 4: Shortlisted */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: isLight ? '#DCFCE7' : 'rgba(34,197,94,0.1)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={16} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Shortlisted</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '12px' }}>
            38
          </div>
          <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px' }}>
            ▲ 26.7% <span style={{ color: mutedText, fontWeight: 500 }}>vs last 30 days</span>
          </div>
          {/* Mini Sparkline Chart */}
          <div style={{ height: '24px', marginTop: '12px' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path d="M 0 16 Q 30 18 60 10 T 90 14 T 100 6" fill="none" stroke="#22C55E" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Metric 5: Projects Won */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', minWidth: '160px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: isLight ? '#DBEAFE' : 'rgba(59,130,246,0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={16} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>Projects Won</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: primaryText, marginTop: '12px' }}>
            12
          </div>
          <div style={{ fontSize: '10.5px', color: '#22C55E', fontWeight: 750, marginTop: '4px' }}>
            ▲ 33.3% <span style={{ color: mutedText, fontWeight: 500 }}>vs last 30 days</span>
          </div>
          {/* Mini Sparkline Chart */}
          <div style={{ height: '24px', marginTop: '12px' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path d="M 0 22 Q 20 12 40 18 T 75 8 T 100 10" fill="none" stroke="#3B82F6" strokeWidth="2" />
            </svg>
          </div>
        </div>

      </div>

      {/* Main Split Layout: Left Section (Charts) & Right Section (Sources & Top Gigs) */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: Large charts (approx 70%) */}
        <div style={{ flex: '3 1 700px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card 1: Profile Views Line Chart */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>
                  Profile Views
                </h3>
                <Info size={13} style={{ color: mutedText, opacity: 0.6 }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.03)', border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: secondaryText, cursor: 'pointer' }}>
                <span>Daily</span>
                <ChevronDown size={12} style={{ opacity: 0.7 }} />
              </div>
            </div>

            {/* View numbers overview */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '26px', fontWeight: 850, color: primaryText }}>
                  2,543
                </span>
                <span style={{ fontSize: '11.5px', color: '#22C55E', fontWeight: 750 }}>
                  ▲ 18.6% <span style={{ color: mutedText, fontWeight: 500 }}>vs previous 30 days</span>
                </span>
              </div>
            </div>

            {/* Line Chart Area (handcrafted SVG) */}
            <div 
              style={{ width: '100%', position: 'relative', overflow: 'hidden' }}
              onMouseLeave={() => setLineChartHoverIndex(null)}
            >
              <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
                <defs>
                  {/* Gradient for area under line */}
                  <linearGradient id="purple-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 1, 2, 3, 4].map((grid, idx) => {
                  const y = padding + (idx * (svgHeight - padding * 2)) / 4;
                  return (
                    <line
                      key={idx}
                      x1={padding}
                      y1={y}
                      x2={svgWidth - padding}
                      y2={y}
                      stroke={borderColor}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Y Axis Values (Labels on left) */}
                <text x={padding - 5} y={padding + 4} fill={mutedText} fontSize="10" textAnchor="end">800</text>
                <text x={padding - 5} y={padding + (svgHeight - padding * 2) * 0.25 + 4} fill={mutedText} fontSize="10" textAnchor="end">600</text>
                <text x={padding - 5} y={padding + (svgHeight - padding * 2) * 0.5 + 4} fill={mutedText} fontSize="10" textAnchor="end">400</text>
                <text x={padding - 5} y={padding + (svgHeight - padding * 2) * 0.75 + 4} fill={mutedText} fontSize="10" textAnchor="end">200</text>
                <text x={padding - 5} y={svgHeight - padding + 4} fill={mutedText} fontSize="10" textAnchor="end">0</text>

                {/* Area Fill */}
                <path d={areaPath} fill="url(#purple-gradient)" />

                {/* Line Path */}
                <path d={linePath} fill="none" stroke="#8B5CF6" strokeWidth="2.5" />

                {/* Interactive Hover Vertical Guide and circle point */}
                {lineChartHoverIndex !== null && points[lineChartHoverIndex] && (
                  <>
                    <line
                      x1={points[lineChartHoverIndex].x}
                      y1={padding}
                      x2={points[lineChartHoverIndex].x}
                      y2={svgHeight - padding}
                      stroke="#8B5CF6"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <circle
                      cx={points[lineChartHoverIndex].x}
                      cy={points[lineChartHoverIndex].y}
                      r="6"
                      fill="#8B5CF6"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                  </>
                )}

                {/* Hotspots for hover triggers */}
                {points.map((pt, idx) => (
                  <rect
                    key={idx}
                    x={pt.x - 12}
                    y={padding}
                    width="24"
                    height={svgHeight - padding * 2}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setLineChartHoverIndex(idx)}
                  />
                ))}
              </svg>

              {/* Floating Tooltip Card */}
              {lineChartHoverIndex !== null && points[lineChartHoverIndex] && (
                <div
                  style={{
                    position: 'absolute',
                    top: Math.max(10, points[lineChartHoverIndex].y - 65),
                    left: Math.max(10, Math.min(svgWidth - 110, points[lineChartHoverIndex].x - 50)),
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '6px 10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '10.5px', color: mutedText, fontWeight: 500 }}>
                    {points[lineChartHoverIndex].date}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>
                    {points[lineChartHoverIndex].val} views
                  </span>
                </div>
              )}

            </div>

            {/* X Axis Dates bottom labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px 0 10px', fontSize: '10.5px', color: mutedText, fontWeight: 600 }}>
              <span>22 May</span>
              <span>27 May</span>
              <span>1 Jun</span>
              <span>6 Jun</span>
              <span>11 Jun</span>
              <span>16 Jun</span>
              <span>21 Jun</span>
            </div>

          </div>

          {/* Double Column Row: Applications Trend & Application Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* Card 2: Applications Trend Bar Chart */}
            <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
                    Applications Trend
                  </h3>
                  <Info size={13} style={{ color: mutedText, opacity: 0.6 }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.03)', border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: secondaryText, cursor: 'pointer' }}>
                  <span>Daily</span>
                  <ChevronDown size={12} style={{ opacity: 0.7 }} />
                </div>
              </div>

              {/* Trend Values stats */}
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 850, color: primaryText }}>
                    147
                  </span>
                  <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: 750 }}>
                    ▲ 12.8% <span style={{ color: mutedText, fontWeight: 500 }}>vs previous 30 days</span>
                  </span>
                </div>
              </div>

              {/* Bar Chart bars container */}
              <div 
                style={{ 
                  height: '140px', 
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  justifyContent: 'space-between', 
                  borderBottom: `1px solid ${borderColor}`,
                  paddingBottom: '2px',
                  gap: '4px',
                  position: 'relative'
                }}
                onMouseLeave={() => setBarChartHoverIndex(null)}
              >
                {barData.map((val, idx) => {
                  const maxVal = Math.max(...barData);
                  const heightPercent = `${(val / maxVal) * 90}%`;
                  const isHovered = barChartHoverIndex === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setBarChartHoverIndex(idx)}
                      style={{
                        flex: 1,
                        height: heightPercent,
                        backgroundColor: isHovered ? '#EC4899' : '#F472B6',
                        borderRadius: '2px 2px 0 0',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s, transform 0.2s',
                        transform: isHovered ? 'scaleX(1.15)' : 'none'
                      }}
                    />
                  );
                })}

                {/* Bar Tooltip */}
                {barChartHoverIndex !== null && barData[barChartHoverIndex] && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: `${Math.max(10, Math.min(90, (barChartHoverIndex / barData.length) * 100))}%`,
                      transform: 'translateX(-50%)',
                      backgroundColor: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      padding: '4px 8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 10,
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '9px', color: mutedText }}>{lineDates[barChartHoverIndex]}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: primaryText, marginTop: '2px' }}>{barData[barChartHoverIndex]} sent</span>
                  </div>
                )}

              </div>

              {/* X Axis Dates bottom labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: mutedText, fontWeight: 600 }}>
                <span>22 May</span>
                <span>27 May</span>
                <span>1 Jun</span>
                <span>6 Jun</span>
                <span>11 Jun</span>
                <span>16 Jun</span>
                <span>21 Jun</span>
              </div>

            </div>

            {/* Card 3: Application Status Donut */}
            <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
                  Application Status
                </h3>
                <Info size={13} style={{ color: mutedText, opacity: 0.6 }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, flexWrap: 'wrap' }}>
                
                {/* SVG Donut */}
                <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0, margin: '0 auto' }}>
                  <svg width="130" height="130" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke={isLight ? '#F3F4F6' : 'rgba(255,255,255,0.03)'} strokeWidth="3" />
                    
                    {/* Slices: strokeDasharray="percent remaining" strokeDashoffset="starting offset" */}
                    {/* Applied (61.2%): stroke="blue" */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="3.2" strokeDasharray="61.2 38.8" strokeDashoffset="25" />
                    
                    {/* Shortlisted (25.9%): stroke="orange", offset = 25 - 61.2 = -36.2 */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F97316" strokeWidth="3.2" strokeDasharray="25.9 74.1" strokeDashoffset="-36.2" />
                    
                    {/* Interview (8.2%): stroke="green", offset = -36.2 - 25.9 = -62.1 */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="3.2" strokeDasharray="8.2 91.8" strokeDashoffset="-62.1" />
                    
                    {/* Rejected (4.7%): stroke="pink", offset = -62.1 - 8.2 = -70.3 */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EC4899" strokeWidth="3.2" strokeDasharray="4.7 95.3" strokeDashoffset="-70.3" />
                  </svg>
                  
                  {/* Inside Text */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 850, color: primaryText }}>147</span>
                    <span style={{ fontSize: '9px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>Total</span>
                  </div>
                </div>

                {/* Legend list */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Applied', val: '90', percent: '61.2%', color: '#3B82F6' },
                    { label: 'Shortlisted', val: '38', percent: '25.9%', color: '#F97316' },
                    { label: 'Interview', val: '12', percent: '8.2%', color: '#10B981' },
                    { label: 'Rejected', val: '7', percent: '4.7%', color: '#EC4899' }
                  ].map((leg, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: leg.color, flexShrink: 0 }} />
                        <span style={{ color: secondaryText, fontWeight: 600 }}>{leg.label}</span>
                      </div>
                      <span style={{ fontWeight: 750, color: primaryText }}>
                        {leg.val} <span style={{ color: mutedText, fontSize: '11px', fontWeight: 500 }}>({leg.percent})</span>
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

          {/* Footer Tip Banner */}
          <div 
            style={{ 
              backgroundColor: isLight ? '#EFF6FF' : 'rgba(59,130,246,0.06)', 
              border: `1px solid ${isLight ? '#BFDBFE' : 'rgba(59,130,246,0.12)'}`, 
              borderRadius: '12px', 
              padding: '12px 20px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '12px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={16} style={{ color: '#3B82F6', flexShrink: 0 }} />
              <p style={{ fontSize: '12.5px', color: isLight ? '#1E3A8A' : '#93C5FD', margin: 0, fontWeight: 550 }}>
                Tip: Keep your profile updated and active to get more visibility and applications.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/creator/profile'}
              style={{
                backgroundColor: 'transparent',
                color: '#3B82F6',
                border: `1.5px solid #3B82F6`,
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 750,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="hover-bg-blue-01"
            >
              Improve Profile
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Sources Pie and Top Gigs List (approx 30%) */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card 4: Profile Views by Source Donut */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>
                Profile Views by Source
              </h3>
              <Info size={13} style={{ color: mutedText, opacity: 0.6 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              
              {/* SVG Donut */}
              <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
                <svg width="130" height="130" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke={isLight ? '#F3F4F6' : 'rgba(255,255,255,0.03)'} strokeWidth="3.2" />
                  
                  {/* Slices details: */}
                  {/* igigster Search (48.9%): stroke="purple" */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8B5CF6" strokeWidth="3.2" strokeDasharray="48.9 51.1" strokeDashoffset="25" />
                  
                  {/* Direct (27.0%): stroke="pink", offset = 25 - 48.9 = -23.9 */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EC4899" strokeWidth="3.2" strokeDasharray="27 73" strokeDashoffset="-23.9" />
                  
                  {/* Gig Page (16.2%): stroke="orange", offset = -23.9 - 27 = -50.9 */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F97316" strokeWidth="3.2" strokeDasharray="16.2 83.8" strokeDashoffset="-50.9" />
                  
                  {/* External Search (5.6%): stroke="green", offset = -50.9 - 16.2 = -67.1 */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="3.2" strokeDasharray="5.6 94.4" strokeDashoffset="-67.1" />
                  
                  {/* Other (2.3%): stroke="blue", offset = -67.1 - 5.6 = -72.7 */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="3.2" strokeDasharray="2.3 97.7" strokeDashoffset="-72.7" />
                </svg>
                
                {/* Inside Text */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 850, color: primaryText }}>2,543</span>
                  <span style={{ fontSize: '9px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', marginTop: '2px' }}>Total</span>
                </div>
              </div>

              {/* Legend List */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'igigster Search', val: '1,243', percent: '48.9%', color: '#8B5CF6' },
                  { label: 'Direct / Profile Link', val: '687', percent: '27.0%', color: '#EC4899' },
                  { label: 'Gig Page', val: '412', percent: '16.2%', color: '#F97316' },
                  { label: 'External Search', val: '141', percent: '5.6%', color: '#10B981' },
                  { label: 'Other', val: '60', percent: '2.3%', color: '#3B82F6' }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span style={{ color: secondaryText, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                    </div>
                    <span style={{ fontWeight: 750, color: primaryText, flexShrink: 0 }}>
                      {item.val} <span style={{ color: mutedText, fontSize: '10.5px', fontWeight: 500 }}>({item.percent})</span>
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Card 5: Top Performing Gigs */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: primaryText, margin: 0 }}>
                  Top Performing Gigs
                </h3>
                <Info size={13} style={{ color: mutedText, opacity: 0.6 }} />
              </div>
              <button
                onClick={() => alert('Viewing all performances...')}
                style={{ background: 'none', border: 'none', color: accentColor, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                className="hover-underline"
              >
                View all
              </button>
            </div>

            {/* Performance List table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, paddingBottom: '6px', fontSize: '10.5px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
                <span style={{ flex: 1 }}>Gig Details</span>
                <span style={{ width: '60px', textAlign: 'right' }}>Views</span>
                <span style={{ width: '80px', textAlign: 'right' }}>Applications</span>
              </div>

              {[
                { title: 'UGC Creator for Skincare Brand', logo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60', views: '2,234', apps: '45' },
                { title: 'Instagram Reels - Fashion Brand', logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=80&auto=format&fit=crop&q=60', views: '1,892', apps: '34' },
                { title: 'Product Review - Tech Gadgets', logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&auto=format&fit=crop&q=60', views: '1,256', apps: '21' },
                { title: 'Campus Ambassador Program', logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=80&auto=format&fit=crop&q=60', views: '1,102', apps: '18' },
                { title: 'YouTube Shorts Creator', logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&auto=format&fit=crop&q=60', views: '907', apps: '15' }
              ].map((gig, idx) => (
                <div 
                  key={idx} 
                  style={{ display: 'flex', alignItems: 'center', fontSize: '12px', gap: '8px' }}
                >
                  <img
                    src={gig.logo}
                    alt={gig.title}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                      border: `1px solid ${borderColor}`
                    }}
                  />
                  <span 
                    style={{ flex: 1, fontWeight: 700, color: primaryText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '4px' }}
                    title={gig.title}
                  >
                    {gig.title}
                  </span>
                  <span style={{ width: '60px', textAlign: 'right', fontWeight: 650, color: primaryText }}>{gig.views}</span>
                  <span style={{ width: '80px', textAlign: 'right', fontWeight: 650, color: primaryText }}>{gig.apps}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
