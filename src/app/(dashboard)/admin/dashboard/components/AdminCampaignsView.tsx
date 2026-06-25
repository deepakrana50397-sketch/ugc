'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';
import { Search, Megaphone, Calendar, Users, Award, ShieldAlert } from 'lucide-react';
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

export default function AdminCampaignsView({
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
  const [campaigns, setCampaigns] = useState<Gig[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCampaigns(getGigs());
  }, []);

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Campaigns Supervision</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Monitor active advertising campaigns, evaluate match application sizes, and check funding metrics.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search campaigns..."
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
        {filteredCampaigns.map((c) => (
          <div key={c.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(236,72,153,0.06)',
                color: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Megaphone size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 750, color: primaryText, margin: 0 }}>
                  {c.title}
                </h3>
                <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>Brand: {c.brandName}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: secondaryText }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Budget Allocated:</span>
                <span style={{ fontWeight: 700, color: primaryText }}>{displayPrice(c.price, currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Verification State:</span>
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: c.status === 'active' ? '#10B981' : '#EF4444',
                  textTransform: 'uppercase'
                }}>{c.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Launch Date:</span>
                <span style={{ fontWeight: 600, color: primaryText, display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {new Date(c.postedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: mutedText }}>
              <span>ID: {c.id}</span>
              <Link href="/admin/gigs" style={{ color: accentColor, fontWeight: 700, textDecoration: 'none' }}>Audit Brief</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
