'use client';

import React, { useState, useEffect } from 'react';
import { getCreators } from '@/lib/services';
import { Creator } from '@/types/creator';
import { Search, CheckCircle2, MapPin, Star, UserCheck, ShieldAlert } from 'lucide-react';
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

export default function AdminCreatorsView({
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
  const [creators, setCreators] = useState<Creator[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getCreators().then(setCreators).catch(console.error);
  }, []);

  const handleToggleVerify = (id: string) => {
    const updated = creators.map(c => {
      if (c.id === id) {
        return { ...c, isVerified: !c.isVerified };
      }
      return c;
    });
    setCreators(updated);
    localStorage.setItem('igigster_creators', JSON.stringify(updated));
  };

  const filteredCreators = creators.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>UGC Creators Directory</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Grant verified badges, review day-rate starting prices, and search candidate niches.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search creators..."
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
        {filteredCreators.map((c) => (
          <div key={c.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={c.avatar} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} alt={c.name} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 750, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {c.name} {c.isVerified && <CheckCircle2 size={14} fill="#10B981" color="#FFFFFF" />}
                </h3>
                <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>{c.title}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: secondaryText }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Location:</span>
                <span style={{ fontWeight: 600, color: primaryText }}>{c.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Rating:</span>
                <span style={{ fontWeight: 600, color: primaryText, display: 'flex', alignItems: 'center', gap: '3px' }}><Star size={12} fill="#EAB308" color="#EAB308" /> {c.rating} ({c.completedJobs} reviews)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Starting Price Rate:</span>
                <span style={{ fontWeight: 700, color: accentColor }}>{displayPrice(c.startingRate, currency)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: mutedText }}>ID: {c.id}</span>
              <button
                onClick={() => handleToggleVerify(c.id)}
                style={{
                  height: '30px',
                  borderRadius: '6px',
                  border: c.isVerified ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(16,185,129,0.2)',
                  backgroundColor: c.isVerified ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.06)',
                  color: c.isVerified ? '#EF4444' : '#10B981',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '0 12px',
                  cursor: 'pointer'
                }}
              >
                {c.isVerified ? 'Revoke Vetting' : 'Verify Creator'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
