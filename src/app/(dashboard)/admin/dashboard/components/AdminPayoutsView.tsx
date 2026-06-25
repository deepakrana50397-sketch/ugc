'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, Search, CheckCircle2, AlertCircle, Play, StopCircle, RefreshCw } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface PayoutItem {
  id: string;
  creatorName: string;
  avatar: string;
  projectName: string;
  amountINR: number;
  amountUSD: number;
  date: string;
  routeType: 'UPI' | 'Bank Transfer';
  routeDetails: string;
  status: 'Succeeded' | 'Processing' | 'Hold' | 'Pending Approval';
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

export default function AdminPayoutsView({
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
  const [payouts, setPayouts] = useState<PayoutItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_payouts');
    if (cached) {
      setPayouts(JSON.parse(cached));
    } else {
      const defaultPayouts: PayoutItem[] = [
        { id: 'pay-7701', creatorName: 'Riya Mishra', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80', projectName: 'Gloxo Summer Campaign', amountINR: 125000, amountUSD: 1500, date: '2026-06-25', routeType: 'UPI', routeDetails: 'riya@okhdfcbank', status: 'Pending Approval' },
        { id: 'pay-7702', creatorName: 'Aman Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80', projectName: 'StyleNova Winter Video', amountINR: 85000, amountUSD: 1020, date: '2026-06-24', routeType: 'Bank Transfer', routeDetails: 'A/c **4021 - HDFC', status: 'Processing' },
        { id: 'pay-7703', creatorName: 'Neha Kapoor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&auto=format&fit=crop&q=80', projectName: 'FitLife Challenge Post', amountINR: 95000, amountUSD: 1140, date: '2026-06-25', routeType: 'UPI', routeDetails: 'nehak@oksbi', status: 'Pending Approval' },
        { id: 'pay-7704', creatorName: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&auto=format&fit=crop&q=80', projectName: 'Greenly Drive Reel', amountINR: 65000, amountUSD: 780, date: '2026-06-20', routeType: 'UPI', routeDetails: 'ananya@okaxis', status: 'Succeeded' }
      ];
      setPayouts(defaultPayouts);
      localStorage.setItem('igigster_admin_payouts', JSON.stringify(defaultPayouts));
    }
  }, []);

  const handleUpdateStatus = (id: string, nextStatus: 'Succeeded' | 'Processing' | 'Hold' | 'Pending Approval') => {
    const updated = payouts.map(p => p.id === id ? { ...p, status: nextStatus } : p);
    setPayouts(updated);
    localStorage.setItem('igigster_admin_payouts', JSON.stringify(updated));
  };

  const getPrice = (inr: number, usd: number) => {
    return displayPrice({ INR: inr, USD: usd }, currency);
  };

  const filtered = payouts.filter(p => 
    p.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Creator Payout Settlement Center</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Process pending creator payouts, freeze settlements under compliance audit, and trigger transfers.
        </p>
      </div>

      {/* Payout metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Pending Settlement Volume', valINR: payouts.reduce((a, b) => a + (b.status === 'Pending Approval' || b.status === 'Processing' ? b.amountINR : 0), 0), valUSD: payouts.reduce((a, b) => a + (b.status === 'Pending Approval' || b.status === 'Processing' ? b.amountUSD : 0), 0), color: '#F59E0B' },
          { label: 'Settled Payout Volume', valINR: payouts.reduce((a, b) => a + (b.status === 'Succeeded' ? b.amountINR : 0), 0), valUSD: payouts.reduce((a, b) => a + (b.status === 'Succeeded' ? b.amountUSD : 0), 0), color: '#10B981' },
          { label: 'Payout Holds Volume', valINR: payouts.reduce((a, b) => a + (b.status === 'Hold' ? b.amountINR : 0), 0), valUSD: payouts.reduce((a, b) => a + (b.status === 'Hold' ? b.amountUSD : 0), 0), color: '#EF4444' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: shadowStyle }}>
            <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700 }}>{stat.label}</span>
            <span style={{ fontSize: '18px', fontWeight: 850, color: stat.color }}>{getPrice(stat.valINR, stat.valUSD)}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search creator payouts..."
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
              <th style={{ padding: '8px' }}>Payout ID / Date</th>
              <th style={{ padding: '8px' }}>Creator / Campaign</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Transfer Amount</th>
              <th style={{ padding: '8px' }}>Settlement Channel</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Payout State</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Override Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${borderColor}`, height: '56px' }}>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 750, color: primaryText, display: 'block' }}>{p.id}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>{p.date}</span>
                </td>
                <td style={{ padding: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={p.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                    <div>
                      <span style={{ fontWeight: 650, color: primaryText, display: 'block' }}>{p.creatorName}</span>
                      <span style={{ fontSize: '10.5px', color: mutedText, display: 'block', marginTop: '1px' }}>{p.projectName}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 750, color: primaryText }}>
                  {getPrice(p.amountINR, p.amountUSD)}
                </td>
                <td style={{ padding: '8px', color: secondaryText }}>
                  <span style={{ display: 'block', fontWeight: 600 }}>{p.routeType}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '1px' }}>{p.routeDetails}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 
                      p.status === 'Succeeded' ? 'rgba(16,185,129,0.06)' :
                      p.status === 'Hold' ? 'rgba(239,68,68,0.06)' :
                      p.status === 'Processing' ? 'rgba(59,130,246,0.06)' : 'rgba(245,158,11,0.06)',
                    color: 
                      p.status === 'Succeeded' ? '#10B981' :
                      p.status === 'Hold' ? '#EF4444' :
                      p.status === 'Processing' ? '#3B82F6' : '#F59E0B',
                    border: `1px solid ${
                      p.status === 'Succeeded' ? 'rgba(16,185,129,0.1)' :
                      p.status === 'Hold' ? 'rgba(239,68,68,0.1)' :
                      p.status === 'Processing' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)'
                    }`
                  }}>{p.status}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    {(p.status === 'Pending Approval' || p.status === 'Processing' || p.status === 'Hold') && (
                      <>
                        {p.status !== 'Processing' && (
                          <button
                            onClick={() => handleUpdateStatus(p.id, 'Processing')}
                            style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: 'none', color: '#3B82F6', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Set Processing
                          </button>
                        )}
                        <button
                          onClick={() => handleUpdateStatus(p.id, 'Succeeded')}
                          style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: 'none', color: '#10B981', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Approve Release
                        </button>
                        {p.status !== 'Hold' ? (
                          <button
                            onClick={() => handleUpdateStatus(p.id, 'Hold')}
                            style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: 'none', color: '#EF4444', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Hold Payout
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(p.id, 'Pending Approval')}
                            style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: 'none', color: '#F59E0B', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Release Hold
                          </button>
                        )}
                      </>
                    )}
                    {p.status === 'Succeeded' && (
                      <span style={{ fontSize: '11px', color: mutedText, fontWeight: 550 }}>Transferred ✓</span>
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
