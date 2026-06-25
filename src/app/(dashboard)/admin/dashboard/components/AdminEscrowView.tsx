'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, Search, CheckCircle2, Lock, Unlock, AlertCircle, RefreshCw } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface EscrowLedgerItem {
  id: string;
  brandName: string;
  creatorName: string;
  dealTitle: string;
  totalINR: number;
  totalUSD: number;
  lockedINR: number;
  lockedUSD: number;
  releasableINR: number;
  releasableUSD: number;
  status: 'Secured' | 'Releasing' | 'Hold' | 'Completed';
  lastUpdated: string;
}

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

export default function AdminEscrowView({
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
  const [ledgers, setLedgers] = useState<EscrowLedgerItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_escrow');
    if (cached) {
      setLedgers(JSON.parse(cached));
    } else {
      const defaultLedgers: EscrowLedgerItem[] = [
        { id: 'esc-001', brandName: 'Mamaearth Cosmetics', creatorName: 'Ananya Sharma', dealTitle: 'Serum Reels Campaign', totalINR: 150000, totalUSD: 1800, lockedINR: 150000, lockedUSD: 1800, releasableINR: 0, releasableUSD: 0, status: 'Secured', lastUpdated: '2026-06-24' },
        { id: 'esc-002', brandName: 'FitLife Wellness', creatorName: 'Karan Mehra', dealTitle: 'Yoga Challenge Series', totalINR: 90000, totalUSD: 1080, lockedINR: 0, lockedUSD: 0, releasableINR: 90000, releasableUSD: 1080, status: 'Releasing', lastUpdated: '2026-06-25' },
        { id: 'esc-003', brandName: 'boAt Lifestyle', creatorName: 'Neha Kapoor', dealTitle: 'Airdopes Launch Review', totalINR: 250000, totalUSD: 3000, lockedINR: 250000, lockedUSD: 3000, releasableINR: 0, releasableUSD: 0, status: 'Hold', lastUpdated: '2026-06-23' },
        { id: 'esc-004', brandName: 'Mamaearth Cosmetics', creatorName: 'Riya Mishra', dealTitle: 'Hair Oil Integration', totalINR: 120000, totalUSD: 1440, lockedINR: 0, lockedUSD: 0, releasableINR: 0, releasableUSD: 0, status: 'Completed', lastUpdated: '2026-06-21' }
      ];
      setLedgers(defaultLedgers);
      localStorage.setItem('igigster_admin_escrow', JSON.stringify(defaultLedgers));
    }
  }, []);

  const handleUpdateStatus = (id: string, nextStatus: 'Secured' | 'Releasing' | 'Hold' | 'Completed') => {
    const updated = ledgers.map(l => {
      if (l.id === id) {
        let lockedI = l.lockedINR;
        let lockedU = l.lockedUSD;
        let relI = l.releasableINR;
        let relU = l.releasableUSD;
        if (nextStatus === 'Completed') {
          lockedI = 0; lockedU = 0; relI = 0; relU = 0;
        } else if (nextStatus === 'Hold') {
          lockedI = l.totalINR; lockedU = l.totalUSD; relI = 0; relU = 0;
        } else if (nextStatus === 'Releasing') {
          lockedI = 0; lockedU = 0; relI = l.totalINR; relU = l.totalUSD;
        } else {
          lockedI = l.totalINR; lockedU = l.totalUSD; relI = 0; relU = 0;
        }
        return { ...l, status: nextStatus, lockedINR: lockedI, lockedUSD: lockedU, releasableINR: relI, releasableUSD: relU, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return l;
    });
    setLedgers(updated);
    localStorage.setItem('igigster_admin_escrow', JSON.stringify(updated));
  };

  const getPrice = (inr: number, usd: number) => {
    return displayPrice({ INR: inr, USD: usd }, currency);
  };

  const filtered = ledgers.filter(l => 
    l.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.dealTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Escrow Ledger & Financial Auditor</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Inspect secured advertising capital pools, apply manual locks, or force release funds to creators.
        </p>
      </div>

      {/* Stats Summary cards specific to escrow */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Total Capital Audited', valINR: ledgers.reduce((a, b) => a + b.totalINR, 0), valUSD: ledgers.reduce((a, b) => a + b.totalUSD, 0), color: '#8B5CF6' },
          { label: 'Active Locked Escrow', valINR: ledgers.reduce((a, b) => a + (b.status === 'Secured' || b.status === 'Hold' ? b.lockedINR : 0), 0), valUSD: ledgers.reduce((a, b) => a + (b.status === 'Secured' || b.status === 'Hold' ? b.lockedUSD : 0), 0), color: '#3B82F6' },
          { label: 'Releasable Funds', valINR: ledgers.reduce((a, b) => a + b.releasableINR, 0), valUSD: ledgers.reduce((a, b) => a + b.releasableUSD, 0), color: '#10B981' },
          { label: 'Disputed Hold Funds', valINR: ledgers.reduce((a, b) => a + (b.status === 'Hold' ? b.totalINR : 0), 0), valUSD: ledgers.reduce((a, b) => a + (b.status === 'Hold' ? b.totalUSD : 0), 0), color: '#EF4444' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: shadowStyle }}>
            <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700 }}>{stat.label}</span>
            <span style={{ fontSize: '18px', fontWeight: 850, color: stat.color }}>{getPrice(stat.valINR, stat.valUSD)}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search escrow agreements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            height: '38px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            paddingLeft: '38px',
            fontSize: '13px',
            color: primaryText,
            outline: 'none'
          }}
        />
      </div>

      <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '20px 24px', boxShadow: shadowStyle, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '11px', color: mutedText, textTransform: 'uppercase', height: '36px', fontWeight: 700 }}>
              <th style={{ padding: '8px' }}>Escrow ID / Deal</th>
              <th style={{ padding: '8px' }}>Brand / Creator</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Total Contract Value</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Locked Bal</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Releasable Bal</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Audit Status</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Overriding Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} style={{ borderBottom: `1px solid ${borderColor}`, height: '56px' }}>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 750, color: primaryText, display: 'block' }}>{l.id}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>{l.dealTitle}</span>
                </td>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 650, color: primaryText, display: 'block' }}>{l.brandName}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>To: {l.creatorName}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 750, color: primaryText }}>
                  {getPrice(l.totalINR, l.totalUSD)}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: secondaryText }}>
                  {getPrice(l.lockedINR, l.lockedUSD)}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#10B981', fontWeight: 650 }}>
                  {getPrice(l.releasableINR, l.releasableUSD)}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 
                      l.status === 'Completed' ? 'rgba(16,185,129,0.06)' :
                      l.status === 'Hold' ? 'rgba(239,68,68,0.06)' :
                      l.status === 'Releasing' ? 'rgba(59,130,246,0.06)' : 'rgba(245,158,11,0.06)',
                    color: 
                      l.status === 'Completed' ? '#10B981' :
                      l.status === 'Hold' ? '#EF4444' :
                      l.status === 'Releasing' ? '#3B82F6' : '#F59E0B',
                    border: `1px solid ${
                      l.status === 'Completed' ? 'rgba(16,185,129,0.1)' :
                      l.status === 'Hold' ? 'rgba(239,68,68,0.1)' :
                      l.status === 'Releasing' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)'
                    }`
                  }}>{l.status}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    {l.status !== 'Completed' && (
                      <>
                        {l.status !== 'Releasing' && (
                          <button
                            onClick={() => handleUpdateStatus(l.id, 'Releasing')}
                            style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: 'none', color: '#10B981', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Unlock size={12} /> Force Release
                          </button>
                        )}
                        {l.status !== 'Hold' && (
                          <button
                            onClick={() => handleUpdateStatus(l.id, 'Hold')}
                            style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: 'none', color: '#EF4444', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Lock size={12} /> Lock Escrow
                          </button>
                        )}
                        {l.status === 'Hold' && (
                          <button
                            onClick={() => handleUpdateStatus(l.id, 'Secured')}
                            style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: 'none', color: '#F59E0B', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <RefreshCw size={12} /> Unlock
                          </button>
                        )}
                      </>
                    )}
                    {l.status === 'Completed' && (
                      <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 550 }}>Fully Disbursed</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
