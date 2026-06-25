'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { FileText, TrendingUp, Users, ArrowUpRight, BarChart2, DollarSign, Download, Sparkles, AlertCircle } from 'lucide-react';

interface ReportsViewProps {
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

interface CampaignPerformance {
  id: string;
  title: string;
  creatorCount: number;
  spendINR: number;
  spendUSD: number;
  impressions: string;
  engagement: string;
  roiMultiplier: string;
}

export default function BrandReportsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ReportsViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  const [campaignPerformances, setCampaignPerformances] = useState<CampaignPerformance[]>([
    { id: 'perf_1', title: 'Mamaearth Vitamin C Serum ASMR', creatorCount: 5, spendINR: 85000, spendUSD: 1062, impressions: '680K', engagement: '4.8%', roiMultiplier: '3.6x' },
    { id: 'perf_2', title: 'boAt Rockerz Launch Review', creatorCount: 3, spendINR: 42000, spendUSD: 525, impressions: '340K', engagement: '5.2%', roiMultiplier: '4.2x' },
    { id: 'perf_3', title: 'Wow Skin Organic Try-On', creatorCount: 2, spendINR: 24000, spendUSD: 300, impressions: '180K', engagement: '3.9%', roiMultiplier: '2.9x' }
  ]);

  const [weeklySpendData, setWeeklySpendData] = useState<number[]>([
    24000, 36000, 18000, 48000, 32000
  ]);

  const formatPrice = (inrVal: number, usdVal: number) => {
    return isINR ? `₹${inrVal.toLocaleString()}` : `$${usdVal.toLocaleString()}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
          Reports & ROI Analysis
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
          Inspect comprehensive visual billing graphs, creator performance metrics, and organic reach outputs.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        
        {/* Metric 1 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Estimated Campaign ROI</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, marginTop: '10px' }}>3.5x Multiplier</span>
          <span style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', fontWeight: 550 }}>▲ 12.4% vs industry standard</span>
        </div>

        {/* Metric 2 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Total Campaign Reach</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, marginTop: '10px' }}>1.2M Impressions</span>
          <span style={{ fontSize: '11px', color: '#8B5CF6', marginTop: '4px', fontWeight: 550 }}>Across Reels, TikTok & Shorts</span>
        </div>

        {/* Metric 3 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Average Engagement</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: primaryText, marginTop: '10px' }}>4.6% Ratio</span>
          <span style={{ fontSize: '11px', color: mutedText, marginTop: '4px', fontWeight: 550 }}>Likes, comments, shares</span>
        </div>

      </div>

      {/* Main split details: Left Weekly spend chart, Right campaign ROI details list */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Side: Weekly Spend Graph */}
        <div style={{ flex: '1.2 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Weekly Campaign Outflow Trend</h3>
          
          {/* Simple Visual SVG Bar Chart */}
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', padding: '10px 0' }}>
            {weeklySpendData.map((val, idx) => {
              const maxVal = Math.max(...weeklySpendData);
              const heightPercent = (val / maxVal) * 100;
              const convertedVal = formatPrice(val, val / 80);
              
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: secondaryText }}>{convertedVal}</span>
                  <div style={{
                    width: '100%',
                    height: `${heightPercent * 0.7}%`,
                    backgroundColor: idx === 3 ? accentColor : (isLight ? '#E5E7EB' : 'rgba(255,255,255,0.08)'),
                    borderRadius: '6px',
                    transition: 'all 0.3s'
                  }} />
                  <span style={{ fontSize: '11px', color: mutedText, fontWeight: 650 }}>Week {idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Performance Summary List */}
        <div style={{ flex: '1.5 1 450px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Campaign Yield Breakdown</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {campaignPerformances.map((perf) => (
              <div key={perf.id} style={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: shadowStyle,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: primaryText, margin: 0 }}>{perf.title}</h4>
                  <span style={{ fontSize: '11.5px', color: secondaryText, display: 'block', marginTop: '3px' }}>
                    Creators: {perf.creatorCount} • Spend: {formatPrice(perf.spendINR, perf.spendUSD)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText, display: 'block' }}>Reach: {perf.impressions}</span>
                    <span style={{ fontSize: '11px', color: '#10B981', display: 'block', marginTop: '2px', fontWeight: 650 }}>Yield: {perf.roiMultiplier}</span>
                  </div>

                  <button
                    onClick={() => alert(`Exporting visual performance report PDF statement for "${perf.title}"...`)}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${borderColor}`,
                      color: primaryText,
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    className="hover-white-bg"
                  >
                    <Download size={13} />
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
      `}</style>

    </div>
  );
}
