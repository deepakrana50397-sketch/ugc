'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, User, Briefcase, FileText, Check, X,
  RefreshCw, DollarSign, Scale, MessageSquare, Info
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface DisputeItem {
  id: string;
  brandName: string;
  creatorName: string;
  campaignTitle: string;
  escrowINR: number;
  escrowUSD: number;
  reason: string;
  creatorArgument: string;
  brandArgument: string;
  milestoneTitle: string;
  submittedFile: string;
  status: 'pending' | 'resolved_refunded' | 'resolved_released' | 'resolved_split';
  splitBrandPercent?: number;
  splitCreatorPercent?: number;
}

interface AdminDisputesViewProps {
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

export default function AdminDisputesView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: AdminDisputesViewProps) {
  const { currency } = useCurrency();
  const [disputes, setDisputes] = useState<DisputeItem[]>([]);
  const [selectedDispute, setSelectedDispute] = useState<DisputeItem | null>(null);
  
  // Custom split state
  const [splitRatio, setSplitRatio] = useState<number>(50); // creator gets X%, brand gets 100-X%
  const [resolving, setResolving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Initialize mock disputes in localStorage
  useEffect(() => {
    const cached = localStorage.getItem('igigster_disputes');
    if (cached) {
      setDisputes(JSON.parse(cached));
    } else {
      const defaultDisputes: DisputeItem[] = [
        {
          id: 'disp-101',
          brandName: 'LunaCare Cosmeceuticals',
          creatorName: 'Ananya Sharma',
          campaignTitle: 'Collagen Serum Video Review',
          escrowINR: 15000,
          escrowUSD: 180,
          reason: 'Under-delivered video duration and lighting issues.',
          brandArgument: 'The video delivered is only 15 seconds instead of the agreed 30 seconds guidelines, and is recorded in a poorly lit bedroom which does not match our premium brand guidelines.',
          creatorArgument: 'I sent a 15-second hook version as requested in chat. The lighting is natural morning sun which we agreed upon. The brand has read my replies but refuses to unlock escrow.',
          milestoneTitle: 'Final Video Reel Deliverable',
          submittedFile: 'luna_collagen_final_v1.mp4',
          status: 'pending'
        },
        {
          id: 'disp-102',
          brandName: 'FitLife India',
          creatorName: 'Karan Malhotra',
          campaignTitle: 'Whey Protein Gym Shorts Campaign',
          escrowINR: 25000,
          escrowUSD: 300,
          reason: 'Missed mandatory script talking points.',
          brandArgument: 'Creator did not mention the 15% discount code and did not show the label clearly in the video.',
          creatorArgument: 'The video caption has the discount code prominently written. Showing the raw product is more authentic than flashing labels, which fits organic content styles.',
          milestoneTitle: 'Instagram Reel Upload',
          submittedFile: 'fitlife_whey_draft.mp4',
          status: 'pending'
        }
      ];
      setDisputes(defaultDisputes);
      localStorage.setItem('igigster_disputes', JSON.stringify(defaultDisputes));
    }
  }, []);

  useEffect(() => {
    if (disputes.length > 0 && !selectedDispute) {
      const firstPending = disputes.find(d => d.status === 'pending');
      setSelectedDispute(firstPending || disputes[0]);
    }
  }, [disputes]);

  const handleResolve = (type: 'refund' | 'release' | 'split') => {
    if (!selectedDispute) return;
    setResolving(true);
    
    setTimeout(() => {
      let resolutionText = '';
      const updated = disputes.map(d => {
        if (d.id === selectedDispute.id) {
          if (type === 'refund') {
            resolutionText = `Dispute resolved. Escrow amount refunded in full to ${selectedDispute.brandName}.`;
            return { ...d, status: 'resolved_refunded' as const };
          }
          if (type === 'release') {
            resolutionText = `Dispute resolved. Escrow amount released in full to ${selectedDispute.creatorName}.`;
            return { ...d, status: 'resolved_released' as const };
          }
          resolutionText = `Dispute resolved. Escrow amount split: ${splitRatio}% to ${selectedDispute.creatorName} and ${100 - splitRatio}% to ${selectedDispute.brandName}.`;
          return { 
            ...d, 
            status: 'resolved_split' as const, 
            splitCreatorPercent: splitRatio, 
            splitBrandPercent: 100 - splitRatio 
          };
        }
        return d;
      });

      setDisputes(updated);
      localStorage.setItem('igigster_disputes', JSON.stringify(updated));
      
      const resItem = updated.find(d => d.id === selectedDispute.id);
      if (resItem) {
        setSelectedDispute(resItem);
      }
      
      setResolving(false);
      setSuccessMsg(resolutionText);
      setTimeout(() => setSuccessMsg(null), 4000);
    }, 1200);
  };

  const getPrice = (inr: number, usd: number) => {
    return displayPrice({ INR: inr, USD: usd }, currency);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Escrow Dispute Mediation</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Mediate funding disagreements between Brands and Creators. Inspect terms, guidelines, and issue payouts.
        </p>
      </div>

      {successMsg && (
        <div style={{
          backgroundColor: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          padding: '16px 20px',
          borderRadius: '16px',
          color: '#10b981',
          fontSize: '13.5px',
          fontWeight: 650,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <ShieldCheck size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid: Disputes list (left) + Detail mediation inspector (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '24px', alignItems: 'start' }} className="admin-disputes-grid">
        
        {/* Left Column: Disputes list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Dispute Ledger</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {disputes.map((d) => {
              const isSelected = selectedDispute?.id === d.id;
              const isPending = d.status === 'pending';

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDispute(d)}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${isSelected ? accentColor : borderColor}`,
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: shadowStyle,
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', color: mutedText, fontWeight: 700 }}>ID: {d.id}</span>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: isPending ? 'rgba(245,158,11,0.06)' : 'rgba(16,185,129,0.06)',
                      color: isPending ? '#F59E0B' : '#10B981',
                      border: isPending ? '1px solid rgba(245,158,11,0.1)' : '1px solid rgba(16,185,129,0.1)'
                    }}>
                      {isPending ? 'Pending Audit' : 'Resolved'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '13.5px', fontWeight: 750, color: primaryText, margin: '0 0 4px 0' }}>{d.campaignTitle}</h4>
                  <span style={{ fontSize: '11.5px', color: secondaryText, display: 'block' }}>Creator: {d.creatorName}</span>
                  <span style={{ fontSize: '11.5px', color: secondaryText, display: 'block', marginTop: '2px' }}>Brand: {d.brandName}</span>
                  
                  <div style={{ borderTop: `1px solid ${borderColor}`, marginTop: '12px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: mutedText }}>Escrow Value</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: primaryText }}>{getPrice(d.escrowINR, d.escrowUSD)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dispute Inspector */}
        {selectedDispute ? (
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
            {/* Header info */}
            <div>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>Auditing Dispute Details</span>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: primaryText, marginTop: '4px', marginBottom: '8px' }}>
                {selectedDispute.campaignTitle}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: 'var(--hover-bg)', padding: '12px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                <div>
                  <span style={{ fontSize: '10px', color: mutedText, display: 'block' }}>Escrow Funding</span>
                  <span style={{ fontSize: '14px', fontWeight: 850, color: primaryText, marginTop: '2px', display: 'block' }}>
                    {getPrice(selectedDispute.escrowINR, selectedDispute.escrowUSD)}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: mutedText, display: 'block' }}>Milestone Trigger</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText, marginTop: '3px', display: 'block' }}>
                    {selectedDispute.milestoneTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Correspondence */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Case Statements</span>
              
              {/* Brand statement */}
              <div style={{ borderLeft: '3px solid #EC4899', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#EC4899', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Brand Reject Reason ({selectedDispute.brandName})
                </span>
                <p style={{ fontSize: '12.5px', color: secondaryText, margin: '6px 0 0 0', lineHeight: '1.4' }}>
                  "{selectedDispute.brandArgument}"
                </p>
              </div>

              {/* Creator statement */}
              <div style={{ borderLeft: '3px solid #8B5CF6', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#8B5CF6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Creator Defense ({selectedDispute.creatorName})
                </span>
                <p style={{ fontSize: '12.5px', color: secondaryText, margin: '6px 0 0 0', lineHeight: '1.4' }}>
                  "{selectedDispute.creatorArgument}"
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--hover-bg)', padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}`, marginTop: '8px', fontSize: '11px', color: primaryText }}>
                  <FileText size={12} color={accentColor} />
                  <span>Submitted Reel draft: <strong>{selectedDispute.submittedFile}</strong></span>
                </div>
              </div>
            </div>

            {/* Arbitration Panel */}
            {selectedDispute.status === 'pending' ? (
              <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Scale size={13} color="#F59E0B" /> Resolve Funding Distribution
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    onClick={() => handleResolve('release')}
                    disabled={resolving}
                    style={{
                      height: '38px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: resolving ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Check size={14} /> Release to Creator (100%)
                  </button>

                  <button
                    onClick={() => handleResolve('refund')}
                    disabled={resolving}
                    style={{
                      height: '38px',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: resolving ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <X size={14} /> Refund Brand (100%)
                  </button>
                </div>

                {/* Custom Split Option */}
                <div style={{ backgroundColor: 'var(--hover-bg)', padding: '16px', borderRadius: '16px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: primaryText }}>Apply Custom Arbitrated Split</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: accentColor }}>{splitRatio}% / {100 - splitRatio}%</span>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="95"
                    step="5"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      accentColor: accentColor
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: mutedText, fontWeight: 600 }}>
                    <span>Creator: {getPrice(selectedDispute.escrowINR * (splitRatio / 100), selectedDispute.escrowUSD * (splitRatio / 100))}</span>
                    <span>Brand: {getPrice(selectedDispute.escrowINR * ((100 - splitRatio) / 100), selectedDispute.escrowUSD * ((100 - splitRatio) / 100))}</span>
                  </div>

                  <button
                    onClick={() => handleResolve('split')}
                    disabled={resolving}
                    style={{
                      height: '34px',
                      backgroundColor: 'transparent',
                      border: `1.5px solid ${accentColor}`,
                      color: accentColor,
                      borderRadius: '8px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: resolving ? 'not-allowed' : 'pointer',
                      marginTop: '4px',
                      transition: 'all 0.2s'
                    }}
                    className="hover-white-bg"
                  >
                    Execute Split Resolution
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                borderTop: `1px solid ${borderColor}`,
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#10B981'
              }}>
                <Check size={18} />
                <span style={{ fontSize: '13.5px', fontWeight: 750 }}>
                  Case Closed. {selectedDispute.status === 'resolved_released' ? 'Escrow released in full to creator.' :
                    selectedDispute.status === 'resolved_refunded' ? 'Escrow refunded in full to brand.' :
                      `Escrow split completed (${selectedDispute.splitCreatorPercent}% creator / ${selectedDispute.splitBrandPercent}% brand).`}
                </span>
              </div>
            )}

          </div>
        ) : (
          <div style={{ padding: '40px', backgroundColor: cardBg, borderRadius: '24px', border: `1px solid ${borderColor}`, textAlign: 'center', color: mutedText }}>
            No active disputes found on platform ledger.
          </div>
        )}

      </div>

      <style jsx global>{`
        .hover-white-bg:hover {
          background-color: ${accentColor}06 !important;
        }
        @media (max-width: 992px) {
          .admin-disputes-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
