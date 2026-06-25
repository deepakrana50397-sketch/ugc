'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator, Copy, Check, Info, Save, FileText, ArrowRight,
  TrendingUp, Award, Clock, HelpCircle, ShieldAlert, CheckCircle2
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';

interface RateCalculatorViewProps {
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

export default function CreatorRateCalculatorView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: RateCalculatorViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';
  const { creator, updateCreatorProfile } = useDashboardStore();

  // --- STATE VARIABLES FOR CALCULATOR ---
  // Base Production Effort
  const [hourlyRate, setHourlyRate] = useState<number>(isINR ? 2000 : 30);
  const [filmingHours, setFilmingHours] = useState<number>(3);
  const [editingHours, setEditingHours] = useState<number>(3);

  // Content Specifications
  const [videoCount, setVideoCount] = useState<number>(1);
  const [videoLength, setVideoLength] = useState<'15s' | '30s' | '60s'>('30s');
  const [extraHooks, setExtraHooks] = useState<number>(0);
  const [includeRawFootage, setIncludeRawFootage] = useState<boolean>(false);

  // Licensing & Usage Rights
  const [usageScope, setUsageScope] = useState<'organic' | 'ads-30' | 'ads-90' | 'perpetual'>('organic');
  const [exclusivity, setExclusivity] = useState<'none' | 'excl-30' | 'excl-90'>('none');

  // Delivery Speed
  const [turnaround, setTurnaround] = useState<'standard' | 'express' | 'rush'>('standard');

  // UI Utilities
  const [copiedProposal, setCopiedProposal] = useState<boolean>(false);
  const [savingBaseRate, setSavingBaseRate] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [brandNameInput, setBrandNameInput] = useState<string>('Mamaearth');

  // Adjust base hourly rates on currency switch
  useEffect(() => {
    setHourlyRate(isINR ? 2000 : 30);
  }, [currency]);

  // --- LOGICAL CALCULATOR RULES ---
  // Base effort: hours * rate
  const baseEffortCost = (filmingHours + editingHours) * hourlyRate;

  // Video Length Multipliers
  const lengthMultipliers = { '15s': 1.0, '30s': 1.2, '60s': 1.5 };
  const baseVideoCost = baseEffortCost * lengthMultipliers[videoLength];

  // Bulk Discounting for multiple videos (e.g. 2 videos = 1.9x, 3 = 2.7x, etc.)
  const bulkMultipliers = [0, 1.0, 1.9, 2.7, 3.5, 4.2]; // mapped to indices 1 to 5
  const activeVideoMultiplier = bulkMultipliers[Math.min(videoCount, 5)] || (videoCount * 0.8);
  const totalProductionCost = baseVideoCost * activeVideoMultiplier;

  // Extra Hook Fees
  const hookCostPerUnit = isINR ? 1500 : 20;
  const totalHooksCost = extraHooks * hookCostPerUnit;

  // Raw Footage Fee (Markup of 40% on production cost)
  const rawFootageFee = includeRawFootage ? totalProductionCost * 0.40 : 0;

  // Licensing Fees (Surcharge on production cost)
  const licensingRates = {
    organic: 0,
    'ads-30': 0.20,
    'ads-90': 0.40,
    perpetual: 1.0
  };
  const licensingFee = totalProductionCost * licensingRates[usageScope];

  // Exclusivity Fees (Surcharge on production cost)
  const exclusivityRates = {
    none: 0,
    'excl-30': 0.30,
    'excl-90': 0.60
  };
  const exclusivityFee = totalProductionCost * exclusivityRates[exclusivity];

  // Turnaround Time Rush Fees
  const turnaroundRates = {
    standard: 0,
    express: 0.15,
    rush: 0.35
  };
  const turnaroundFee = totalProductionCost * turnaroundRates[turnaround];

  // FINAL CALCULATED TOTAL
  const finalTotal = Math.round(
    totalProductionCost + totalHooksCost + rawFootageFee + licensingFee + exclusivityFee + turnaroundFee
  );

  // Rate Tier evaluation
  const getRateTier = () => {
    const thresholdBase = isINR ? 8000 : 100;
    const thresholdPremium = isINR ? 25000 : 350;
    
    if (finalTotal < thresholdBase) return { label: 'Competitive / Entry Rate', color: '#10B981', desc: 'A budget-friendly price point. Great for building relationships with new brands.' };
    if (finalTotal < thresholdPremium) return { label: 'Market Standard Rate', color: '#3B82F6', desc: 'Standard value for experienced creators. Reflects professional editing and effort.' };
    return { label: 'Premium Quote', color: '#EC4899', desc: 'Reflects specialized niche skills, active paid advertising rights, or complex visual hooks.' };
  };

  const rateTier = getRateTier();

  // Generate copyable text script for brand proposals
  const generateProposalPitch = () => {
    const lines = [
      `Hi ${brandNameInput} Team!`,
      `Here is my custom UGC rate quote details for the proposed campaign:`,
      `---------------------------------------`,
      `📦 Deliverables:`,
      `• ${videoCount}x UGC Video (${videoLength} length, ${toneDescription()})`,
      extraHooks > 0 ? `• +${extraHooks} extra hook variants (total high-retention options)` : null,
      includeRawFootage ? `• Includes full raw unedited footage delivery rights` : null,
      `• Turnaround time: ${turnaroundLabel()}`,
      `---------------------------------------`,
      `🔑 Licensing & Exclusivity:`,
      `• Usage: ${licensingLabel()}`,
      `• Exclusivity: ${exclusivityLabel()}`,
      `---------------------------------------`,
      `💰 Campaign Investment:`,
      `Total Rate: ${isINR ? '₹' : '$'}${finalTotal.toLocaleString()}`,
      `---------------------------------------`,
      `Looking forward to collaborating with ${brandNameInput}! Let me know if you would like to proceed with the contract setup.`
    ].filter(Boolean);
    return lines.join('\n');
  };

  const toneDescription = () => {
    if (videoLength === '15s') return 'fast-paced and high energy';
    if (videoLength === '30s') return 'balanced hook and demo breakdown';
    return 'comprehensive deep-dive showcase';
  };

  const turnaroundLabel = () => {
    if (turnaround === 'standard') return 'Standard Delivery (5-7 Days)';
    if (turnaround === 'express') return 'Express Delivery (3-4 Days) (+15%)';
    return 'Rush Priority (48 Hours) (+35%)';
  };

  const licensingLabel = () => {
    if (usageScope === 'organic') return 'Organic posting only (Included)';
    if (usageScope === 'ads-30') return 'Paid Advertising Rights (30 Days) (+20%)';
    if (usageScope === 'ads-90') return 'Paid Advertising Rights (90 Days) (+40%)';
    return 'Full Perpetual Ad Rights (+100%)';
  };

  const exclusivityLabel = () => {
    if (exclusivity === 'none') return 'None (Included)';
    if (exclusivity === 'excl-30') return 'Category Exclusivity (30 Days) (+30%)';
    return 'Category Exclusivity (90 Days) (+60%)';
  };

  // Copy handler
  const handleCopyProposal = () => {
    navigator.clipboard.writeText(generateProposalPitch());
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  // Save to profile
  const handleSaveToProfile = () => {
    setSavingBaseRate(true);
    setSaveSuccess(false);

    setTimeout(() => {
      // update user profile's starting rate in global state
      const existingRate = creator.profile?.startingRate || { INR: 0, USD: 0 };
      const updatedRate = isINR 
        ? { ...existingRate, INR: finalTotal }
        : { ...existingRate, USD: finalTotal };

      updateCreatorProfile({
        startingRate: updatedRate
      });

      setSavingBaseRate(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: primaryText }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calculator size={24} style={{ color: accentColor }} /> UGC Rate Calculator
        </h1>
        <p style={{ color: mutedText, fontSize: '14px', margin: '4px 0 0 0' }}>
          Estimate logical quotes for campaign applications using filming time, raw footages, licensing rights, and turnaround speeds.
        </p>
      </div>

      {/* Main Grid split */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Column: Form parameters */}
        <div style={{ flex: '3 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Production effort */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: 750, display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎥 1. Base Production Effort
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              
              {/* Hourly rate input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  YOUR HOURLY RATE ({currency})
                </label>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', color: mutedText, fontSize: '13.5px', fontWeight: 600 }}>
                    {isINR ? '₹' : '$'}
                  </span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 24px',
                      borderRadius: '10px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#FAF9FB' : '#141416',
                      color: primaryText,
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Filming Hours */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  FILMING TIME (HOURS)
                </label>
                <select
                  value={filmingHours}
                  onChange={(e) => setFilmingHours(parseInt(e.target.value))}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#FAF9FB' : '#141416',
                    color: primaryText,
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(h => (
                    <option key={h} value={h}>{h} hr{h > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Editing Hours */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  EDITING TIME (HOURS)
                </label>
                <select
                  value={editingHours}
                  onChange={(e) => setEditingHours(parseInt(e.target.value))}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#FAF9FB' : '#141416',
                    color: primaryText,
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 8].map(h => (
                    <option key={h} value={h}>{h} hr{h > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Card 2: Deliverables specifications */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: 750 }}>
              📦 2. Deliverables Specifications
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              
              {/* Video Count */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>NUMBER OF VIDEOS</label>
                  {videoCount > 1 && (
                    <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
                      Bulk Discount Applied
                    </span>
                  )}
                </div>
                <select
                  value={videoCount}
                  onChange={(e) => setVideoCount(parseInt(e.target.value))}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#FAF9FB' : '#141416',
                    color: primaryText,
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  {[1, 2, 3, 4, 5].map(v => (
                    <option key={v} value={v}>{v} Video{v > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Video Length */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>VIDEO LENGTH</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { key: '15s', label: '15s (1x)' },
                    { key: '30s', label: '30s (1.2x)' },
                    { key: '60s', label: '60s (1.5x)' }
                  ].map(item => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setVideoLength(item.key as any)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: `1px solid ${videoLength === item.key ? accentColor : borderColor}`,
                        backgroundColor: videoLength === item.key ? (isLight ? '#FDF2F8' : 'rgba(236,72,153,0.06)') : 'transparent',
                        color: videoLength === item.key ? accentColor : secondaryText,
                        fontSize: '12.5px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Hook Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  EXTRA HOOK VARIATIONS
                </label>
                <select
                  value={extraHooks}
                  onChange={(e) => setExtraHooks(parseInt(e.target.value))}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#FAF9FB' : '#141416',
                    color: primaryText,
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  {[0, 1, 2, 3, 5].map(h => (
                    <option key={h} value={h}>+{h} Hook{h > 1 || h === 0 ? 's' : ''} ({isINR ? `₹${(h * 1500).toLocaleString()}` : `$${h * 20}`})</option>
                  ))}
                </select>
              </div>

              {/* Raw Footage Delivery */}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', paddingBottom: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', cursor: 'pointer', fontWeight: 550 }}>
                  <input
                    type="checkbox"
                    checked={includeRawFootage}
                    onChange={(e) => setIncludeRawFootage(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: accentColor,
                      cursor: 'pointer'
                    }}
                  />
                  <span>Deliver Raw Footage (+40%)</span>
                </label>
              </div>

            </div>
          </div>

          {/* Card 3: Licensing & Add-ons */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: 750 }}>
              🔑 3. Licensing, Exclusivity & turnaround
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Paid Ad Rights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  PAID ADVERTISING RIGHTS / LICENSING
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {[
                    { key: 'organic', label: 'Organic (Post Only)' },
                    { key: 'ads-30', label: 'Ads (30 Days) (+20%)' },
                    { key: 'ads-90', label: 'Ads (90 Days) (+40%)' },
                    { key: 'perpetual', label: 'Full Perpetual (+100%)' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setUsageScope(opt.key as any)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '8px',
                        border: `1px solid ${usageScope === opt.key ? accentColor : borderColor}`,
                        backgroundColor: usageScope === opt.key ? (isLight ? '#FDF2F8' : 'rgba(236,72,153,0.06)') : 'transparent',
                        color: usageScope === opt.key ? accentColor : secondaryText,
                        fontSize: '12px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Exclusivity */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  COMPETITOR EXCLUSIVITY CLAUSE
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  {[
                    { key: 'none', label: 'No Exclusivity (Default)' },
                    { key: 'excl-30', label: 'Category Exclusivity (30 Days) (+30%)' },
                    { key: 'excl-90', label: 'Category Exclusivity (90 Days) (+60%)' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setExclusivity(opt.key as any)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${exclusivity === opt.key ? accentColor : borderColor}`,
                        backgroundColor: exclusivity === opt.key ? (isLight ? '#FDF2F8' : 'rgba(236,72,153,0.06)') : 'transparent',
                        color: exclusivity === opt.key ? accentColor : secondaryText,
                        fontSize: '12px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Turnaround time */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText }}>
                  TURNAROUND SPEED
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                  {[
                    { key: 'standard', label: 'Standard (5-7 Days)' },
                    { key: 'express', label: 'Express (3-4 Days) (+15%)' },
                    { key: 'rush', label: 'Rush (48 Hours) (+35%)' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setTurnaround(opt.key as any)}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: `1px solid ${turnaround === opt.key ? accentColor : borderColor}`,
                        backgroundColor: turnaround === opt.key ? (isLight ? '#FDF2F8' : 'rgba(236,72,153,0.06)') : 'transparent',
                        color: turnaround === opt.key ? accentColor : secondaryText,
                        fontSize: '12px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Live summary & Quote Breakdown */}
        <div style={{ flex: '2 1 400px', minWidth: 320, display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '20px' }}>
          
          {/* Main Pricing Settle card */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 750 }}>
              🧾 Rate Calculator Estimate
            </span>

            {/* Glowing quote box */}
            <div style={{
              background: isLight ? 'linear-gradient(135deg, #FDF2F8, #F3E8FF)' : 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(139,92,246,0.15))',
              border: `1px solid ${isLight ? '#F0D0E8' : 'rgba(236,72,153,0.2)'}`,
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 750, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estimated Campaign Quote
              </span>
              <div style={{ fontSize: '42px', fontWeight: 900, color: primaryText, letterSpacing: '-0.02em' }}>
                {isINR ? '₹' : '$'}{finalTotal.toLocaleString()}
              </div>
              <div style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: '20px', backgroundColor: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.04)', color: rateTier.color, fontSize: '12.5px', fontWeight: 750, gap: '6px', justifyContent: 'center', alignItems: 'center', margin: '6px auto 0 auto' }}>
                <Award size={14} />
                {rateTier.label}
              </div>
            </div>

            {/* Live math items list breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', marginBottom: '4px' }}>
                Estimate Details Breakdown
              </span>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: secondaryText }}>Production Base effort ({filmingHours + editingHours} hrs):</span>
                <span style={{ fontWeight: 600 }}>{isINR ? '₹' : '$'}{baseEffortCost.toLocaleString()}</span>
              </div>

              {videoLength !== '15s' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Video length markup ({videoLength} Length):</span>
                  <span style={{ fontWeight: 600, color: accentColor }}>
                    +{Math.round((lengthMultipliers[videoLength] - 1.0) * 100)}%
                  </span>
                </div>
              )}

              {videoCount > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Bulk video count scale ({videoCount} Videos):</span>
                  <span style={{ fontWeight: 600, color: '#8B5CF6' }}>
                    {activeVideoMultiplier}x (x{videoCount} base effort)
                  </span>
                </div>
              )}

              {extraHooks > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Extra Hook variants (+{extraHooks}):</span>
                  <span style={{ fontWeight: 600 }}>+{isINR ? '₹' : '$'}{totalHooksCost.toLocaleString()}</span>
                </div>
              )}

              {includeRawFootage && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Raw Footage delivery fee (+40%):</span>
                  <span style={{ fontWeight: 600 }}>+{isINR ? '₹' : '$'}{Math.round(rawFootageFee).toLocaleString()}</span>
                </div>
              )}

              {usageScope !== 'organic' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Licensing surcharge:</span>
                  <span style={{ fontWeight: 600 }}>+{isINR ? '₹' : '$'}{Math.round(licensingFee).toLocaleString()}</span>
                </div>
              )}

              {exclusivity !== 'none' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Competitor exclusivity:</span>
                  <span style={{ fontWeight: 600 }}>+{isINR ? '₹' : '$'}{Math.round(exclusivityFee).toLocaleString()}</span>
                </div>
              )}

              {turnaround !== 'standard' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: secondaryText }}>Rush priority delivery fee:</span>
                  <span style={{ fontWeight: 600, color: '#EF4444' }}>+{isINR ? '₹' : '$'}{Math.round(turnaroundFee).toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Sync actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <button
                onClick={handleSaveToProfile}
                disabled={savingBaseRate}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: saveSuccess ? '#10B981' : (isLight ? '#1F2937' : 'rgba(255,255,255,0.06)'),
                  color: '#FFFFFF',
                  fontWeight: 650,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {saveSuccess ? <CheckCircle2 size={15} /> : <Save size={15} />}
                {savingBaseRate ? 'Updating rate...' : saveSuccess ? 'Updated Starting Rate!' : 'Save as Start Rate'}
              </button>

              <p style={{ color: mutedText, fontSize: '11.5px', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
                💡 Click "Save as Start Rate" to update your starting portfolio rate shown to brands in grids.
              </p>
            </div>
          </div>

          {/* Proposal draft builder card */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} style={{ color: accentColor }} /> Pitch Proposal Proposal Builder
              </span>
              <button
                onClick={handleCopyProposal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: copiedProposal ? '#10B981' : accentColor,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '11.5px'
                }}
              >
                {copiedProposal ? <Check size={12} /> : <Copy size={12} />}
                {copiedProposal ? 'Copied Pitch' : 'Copy Pitch'}
              </button>
            </div>

            {/* Target Brand Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10.5px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
                Target Brand Name
              </label>
              <input
                type="text"
                value={brandNameInput}
                onChange={(e) => setBrandNameInput(e.target.value)}
                placeholder="e.g. Mamaearth, boAt"
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '12.5px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Code Box Proposal */}
            <textarea
              readOnly
              rows={8}
              value={generateProposalPitch()}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)',
                border: `1px dashed ${borderColor}`,
                fontFamily: 'monospace',
                fontSize: '11.5px',
                color: secondaryText,
                lineHeight: 1.45,
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

        </div>

      </div>

    </div>
  );
}
