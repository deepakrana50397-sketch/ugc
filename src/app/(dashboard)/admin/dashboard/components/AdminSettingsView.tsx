'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, Percent, DollarSign, ShieldAlert, Check, Loader2, Save,
  Database, RefreshCw, Key
} from 'lucide-react';

interface AdminSettingsViewProps {
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

export default function AdminSettingsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: AdminSettingsViewProps) {
  // Config states
  const [creatorFee, setCreatorFee] = useState<number>(10);
  const [brandFee, setBrandFee] = useState<number>(5);
  const [minPriceUSD, setMinPriceUSD] = useState<number>(100);
  const [minPriceINR, setMinPriceINR] = useState<number>(8000);
  const [requireOTP, setRequireOTP] = useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number>(83.5);
  
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Load config from localStorage
    const savedCreatorFee = localStorage.getItem('igigster_config_creator_fee');
    const savedBrandFee = localStorage.getItem('igigster_config_brand_fee');
    const savedUSD = localStorage.getItem('igigster_config_min_usd');
    const savedINR = localStorage.getItem('igigster_config_min_inr');
    const savedOTP = localStorage.getItem('igigster_config_require_otp');
    const savedRate = localStorage.getItem('igigster_config_exchange_rate');

    if (savedCreatorFee) setCreatorFee(parseFloat(savedCreatorFee));
    if (savedBrandFee) setBrandFee(parseFloat(savedBrandFee));
    if (savedUSD) setMinPriceUSD(parseInt(savedUSD));
    if (savedINR) setMinPriceINR(parseInt(savedINR));
    if (savedOTP) setRequireOTP(savedOTP === 'true');
    if (savedRate) setExchangeRate(parseFloat(savedRate));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      localStorage.setItem('igigster_config_creator_fee', creatorFee.toString());
      localStorage.setItem('igigster_config_brand_fee', brandFee.toString());
      localStorage.setItem('igigster_config_min_usd', minPriceUSD.toString());
      localStorage.setItem('igigster_config_min_inr', minPriceINR.toString());
      localStorage.setItem('igigster_config_require_otp', requireOTP.toString());
      localStorage.setItem('igigster_config_exchange_rate', exchangeRate.toString());

      // Trigger configuration update event
      window.dispatchEvent(new Event('igigster-config-updated'));

      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>System Configurations</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Configure matching commission margins, threshold alert criteria, and verification policies.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
        
        {/* Fee Configs card */}
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
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Percent size={16} color={accentColor} /> Platform Commission Rates
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="settings-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Creator Matching Fee (%)</label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                value={creatorFee}
                onChange={(e) => setCreatorFee(parseFloat(e.target.value))}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Brand Escrow Fee (%)</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={brandFee}
                onChange={(e) => setBrandFee(parseFloat(e.target.value))}
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
          </div>
        </div>

        {/* Pricing Baselines card */}
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
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={16} color={accentColor} /> Minimum Day-Rate Baselines
          </h3>

          <p style={{ fontSize: '11px', color: mutedText, margin: 0 }}>
            Briefs created under these minimums will trigger alerts in the vetting dashboard to protect creator rates.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="settings-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>US Dollar Baseline ($)</label>
              <input
                type="number"
                min="10"
                max="1000"
                value={minPriceUSD}
                onChange={(e) => setMinPriceUSD(parseInt(e.target.value))}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Indian Rupee Baseline (₹)</label>
              <input
                type="number"
                min="500"
                max="50000"
                value={minPriceINR}
                onChange={(e) => setMinPriceINR(parseInt(e.target.value))}
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
          </div>
        </div>

        {/* System parameters card */}
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
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={16} color={accentColor} /> System Exchange & Policy Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Exchange Rate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Exchange Rate USD to INR</label>
              <input
                type="number"
                min="60"
                max="100"
                step="0.05"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                style={{
                  height: '38px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FFFFFF' : '#141417',
                  color: primaryText,
                  padding: '0 12px',
                  fontSize: '13px',
                  outline: 'none',
                  maxWidth: '300px'
                }}
              />
            </div>

            {/* OTP Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
              <input
                type="checkbox"
                id="otp_toggle"
                checked={requireOTP}
                onChange={(e) => setRequireOTP(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  accentColor: accentColor
                }}
              />
              <label htmlFor="otp_toggle" style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText, cursor: 'pointer' }}>
                Require mobile OTP validation for proposal submissions
              </label>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              height: '42px',
              backgroundColor: accentColor,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '21px',
              padding: '0 24px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.2)'
            }}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Rules...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Configurations</span>
              </>
            )}
          </button>

          {success && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '12.5px', fontWeight: 750 }}>
              <Check size={16} />
              <span>Configurations updated successfully!</span>
            </div>
          )}
        </div>

      </form>

      <style jsx global>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .settings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
