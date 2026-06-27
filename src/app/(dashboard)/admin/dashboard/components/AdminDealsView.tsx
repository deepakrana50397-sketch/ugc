'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getApplications } from '@/lib/services';
import { Application } from '@/types/common';
import { Search, Briefcase, Calendar, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
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

export default function AdminDealsView({
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
  const [deals, setDeals] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getApplications()
      .then((apps) => {
        setDeals(apps.filter(a => a.status === 'accepted' || a.status === 'unlocked' || a.status === 'shortlisted'));
      })
      .catch(console.error);
  }, []);

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return '#10B981';
      case 'unlocked': return '#10B981';
      case 'shortlisted': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  const filteredDeals = deals.filter(d => 
    d.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Matched Deals Ledger</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Inspect creator-brand matching contracts, budgets, escrow triggers, and deal locks.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search matches/deals..."
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredDeals.map((d) => (
          <div key={d.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(59,130,246,0.06)',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 750, color: primaryText, margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                  {d.gigTitle}
                </h3>
                <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>Match: {d.creatorName} ↔ {d.brandName}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: secondaryText }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Budget:</span>
                <span style={{ fontWeight: 700, color: primaryText }}>{displayPrice(d.rate, currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Deal Progress:</span>
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: getStatusColor(d.status),
                  textTransform: 'uppercase'
                }}>{d.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Match Made:</span>
                <span style={{ fontWeight: 600, color: primaryText, display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {new Date(d.appliedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: mutedText }}>
              <span>Deal ID: {d.id}</span>
              <Link href="/admin/applications" style={{ color: accentColor, fontWeight: 700, textDecoration: 'none' }}>Verify Deal</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
