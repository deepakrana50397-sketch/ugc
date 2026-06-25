'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Search, ArrowDownLeft, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface PaymentDepositItem {
  id: string;
  brandName: string;
  amountINR: number;
  amountUSD: number;
  feeINR: number;
  feeUSD: number;
  date: string;
  method: string;
  invoiceId: string;
  status: 'Succeeded' | 'Pending Verification' | 'Failed';
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

export default function AdminPaymentsView({
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
  const [payments, setPayments] = useState<PaymentDepositItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_payments');
    if (cached) {
      setPayments(JSON.parse(cached));
    } else {
      const defaultPayments: PaymentDepositItem[] = [
        { id: 'dep-9021', brandName: 'Mamaearth Cosmetics', amountINR: 150000, amountUSD: 1800, feeINR: 7500, feeUSD: 90, date: '2026-06-24', method: 'NetBanking', invoiceId: 'INV-2026-042', status: 'Succeeded' },
        { id: 'dep-9022', brandName: 'FitLife Wellness', amountINR: 90000, amountUSD: 1080, feeINR: 4500, feeUSD: 54, date: '2026-06-25', method: 'UPI Pay', invoiceId: 'INV-2026-043', status: 'Pending Verification' },
        { id: 'dep-9023', brandName: 'boAt Lifestyle', amountINR: 250000, amountUSD: 3000, feeINR: 12500, feeUSD: 150, date: '2026-06-23', method: 'Corporate Card', invoiceId: 'INV-2026-044', status: 'Succeeded' },
        { id: 'dep-9024', brandName: 'FitLife Wellness', amountINR: 50000, amountUSD: 600, feeINR: 2500, feeUSD: 30, date: '2026-06-20', method: 'UPI Pay', invoiceId: 'INV-2026-041', status: 'Failed' }
      ];
      setPayments(defaultPayments);
      localStorage.setItem('igigster_admin_payments', JSON.stringify(defaultPayments));
    }
  }, []);

  const handleVerify = (id: string) => {
    const updated = payments.map(p => p.id === id ? { ...p, status: 'Succeeded' as const } : p);
    setPayments(updated);
    localStorage.setItem('igigster_admin_payments', JSON.stringify(updated));
  };

  const getPrice = (inr: number, usd: number) => {
    return displayPrice({ INR: inr, USD: usd }, currency);
  };

  const filtered = payments.filter(p => 
    p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Incoming Deposits & Payments Log</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Monitor inbound advertising budget deposits, platform transaction fees, and verify payment slips.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Total Volume Deposited', valINR: payments.reduce((a, b) => a + (b.status === 'Succeeded' ? b.amountINR : 0), 0), valUSD: payments.reduce((a, b) => a + (b.status === 'Succeeded' ? b.amountUSD : 0), 0), subText: 'Succeeded deposits only' },
          { label: 'Platform Revenue Collected', valINR: payments.reduce((a, b) => a + (b.status === 'Succeeded' ? b.feeINR : 0), 0), valUSD: payments.reduce((a, b) => a + (b.status === 'Succeeded' ? b.feeUSD : 0), 0), subText: 'Avg 5.0% platform fee' }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: shadowStyle }}>
            <span style={{ fontSize: '11.5px', color: mutedText, fontWeight: 700 }}>{stat.label}</span>
            <span style={{ fontSize: '20px', fontWeight: 850, color: primaryText }}>{getPrice(stat.valINR, stat.valUSD)}</span>
            <span style={{ fontSize: '10px', color: mutedText, fontWeight: 550, marginTop: '2px' }}>{stat.subText}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search deposits..."
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
              <th style={{ padding: '8px' }}>Ref ID / Date</th>
              <th style={{ padding: '8px' }}>Brand Depositor</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Deposit Amount</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Platform Fee</th>
              <th style={{ padding: '8px' }}>Method</th>
              <th style={{ padding: '8px' }}>Invoice ID</th>
              <th style={{ padding: '8px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${borderColor}`, height: '56px' }}>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontWeight: 750, color: primaryText, display: 'block' }}>{p.id}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>{p.date}</span>
                </td>
                <td style={{ padding: '8px', fontWeight: 650, color: primaryText }}>
                  {p.brandName}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 750, color: primaryText }}>
                  {getPrice(p.amountINR, p.amountUSD)}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', color: accentColor, fontWeight: 600 }}>
                  {getPrice(p.feeINR, p.feeUSD)}
                </td>
                <td style={{ padding: '8px', color: secondaryText, fontSize: '12px' }}>
                  {p.method}
                </td>
                <td style={{ padding: '8px', color: secondaryText }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={13} /> {p.invoiceId}
                  </span>
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 
                      p.status === 'Succeeded' ? 'rgba(16,185,129,0.06)' :
                      p.status === 'Failed' ? 'rgba(239,68,68,0.06)' : 'rgba(245,158,11,0.06)',
                    color: 
                      p.status === 'Succeeded' ? '#10B981' :
                      p.status === 'Failed' ? '#EF4444' : '#F59E0B',
                    border: `1px solid ${
                      p.status === 'Succeeded' ? 'rgba(16,185,129,0.1)' :
                      p.status === 'Failed' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)'
                    }`
                  }}>{p.status}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  {p.status === 'Pending Verification' ? (
                    <button
                      onClick={() => handleVerify(p.id)}
                      style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: 'none', color: '#10B981', borderRadius: '6px', padding: '6px 12px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Verify Deposit
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', color: mutedText, fontWeight: 550 }}>Logged</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
