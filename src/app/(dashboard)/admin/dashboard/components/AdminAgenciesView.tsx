'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Search, CheckCircle2, Star, Award, ShieldAlert } from 'lucide-react';

interface AgencyItem {
  id: string;
  name: string;
  avatar: string;
  principal: string;
  email: string;
  location: string;
  contractedCreators: number;
  commissionPercent: number;
  isVerified: boolean;
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

export default function AdminAgenciesView({
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
  const [agencies, setAgencies] = useState<AgencyItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_agencies');
    if (cached) {
      setAgencies(JSON.parse(cached));
    } else {
      const defaultAgencies: AgencyItem[] = [
        { id: 'ag-1', name: 'Alpha UGC Talent Agency', avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&auto=format&fit=crop&q=60', principal: 'Anirudh Roy', email: 'anirudh@alphaugc.com', location: 'New Delhi, India', contractedCreators: 42, commissionPercent: 15, isVerified: true },
        { id: 'ag-2', name: 'Vibe Creator Management', avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&auto=format&fit=crop&q=60', principal: 'Elena Croft', email: 'elena@vibeagents.com', location: 'Bengaluru, India', contractedCreators: 28, commissionPercent: 12, isVerified: false }
      ];
      setAgencies(defaultAgencies);
      localStorage.setItem('igigster_admin_agencies', JSON.stringify(defaultAgencies));
    }
  }, []);

  const handleToggleVerify = (id: string) => {
    const updated = agencies.map(a => a.id === id ? { ...a, isVerified: !a.isVerified } : a);
    setAgencies(updated);
    localStorage.setItem('igigster_admin_agencies', JSON.stringify(updated));
  };

  const handleUpdateCommission = (id: string, pct: number) => {
    const updated = agencies.map(a => a.id === id ? { ...a, commissionPercent: pct } : a);
    setAgencies(updated);
    localStorage.setItem('igigster_admin_agencies', JSON.stringify(updated));
  };

  const filteredAgencies = agencies.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.principal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Influencer & UGC Agencies</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Moderate agency accounts, verify talent pool configurations, and audit commission fee scales.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search agencies..."
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
        {filteredAgencies.map((a) => (
          <div key={a.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={a.avatar} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} alt={a.name} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 750, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {a.name} {a.isVerified && <CheckCircle2 size={14} fill="#10B981" color="#FFFFFF" />}
                </h3>
                <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>Principal: {a.principal}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: secondaryText }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Location:</span>
                <span style={{ fontWeight: 600, color: primaryText }}>{a.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Contracted Creators:</span>
                <span style={{ fontWeight: 600, color: primaryText }}>{a.contractedCreators} profiles</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Commission Percentage:</span>
                <input
                  type="number"
                  min="5"
                  max="40"
                  value={a.commissionPercent}
                  onChange={(e) => handleUpdateCommission(a.id, parseInt(e.target.value) || 15)}
                  style={{
                    width: '60px',
                    height: '24px',
                    borderRadius: '4px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: 'var(--hover-bg)',
                    color: primaryText,
                    textAlign: 'center',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: mutedText }}>ID: {a.id}</span>
              <button
                onClick={() => handleToggleVerify(a.id)}
                style={{
                  height: '30px',
                  borderRadius: '6px',
                  border: a.isVerified ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(16,185,129,0.2)',
                  backgroundColor: a.isVerified ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.06)',
                  color: a.isVerified ? '#EF4444' : '#10B981',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '0 12px',
                  cursor: 'pointer'
                }}
              >
                {a.isVerified ? 'Revoke Vetting' : 'Verify Agency'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
