'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Search, CheckCircle2, ShieldCheck, Mail, Globe, MapPin, DollarSign } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface BrandItem {
  id: string;
  name: string;
  avatar: string;
  contactName: string;
  email: string;
  location: string;
  activeCampaigns: number;
  totalSpendINR: number;
  totalSpendUSD: number;
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

export default function AdminBrandsView({
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
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_brands');
    if (cached) {
      setBrands(JSON.parse(cached));
    } else {
      const defaultBrands: BrandItem[] = [
        { id: 'br-1', name: 'Mamaearth Cosmetics', avatar: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60', contactName: 'Aditi Rao', email: 'aditi@mamaearth.in', location: 'Gurugram, India', activeCampaigns: 4, totalSpendINR: 4500000, totalSpendUSD: 54000, isVerified: true },
        { id: 'br-2', name: 'FitLife Wellness', avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&auto=format&fit=crop&q=60', contactName: 'Karan Mehra', email: 'karan@fitlife.co', location: 'Mumbai, India', activeCampaigns: 2, totalSpendINR: 2500000, totalSpendUSD: 30000, isVerified: false },
        { id: 'br-3', name: 'boAt Lifestyle', avatar: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&auto=format&fit=crop&q=60', contactName: 'Rohan Gupta', email: 'rohan@boat-lifestyle.com', location: 'Delhi, India', activeCampaigns: 6, totalSpendINR: 6500000, totalSpendUSD: 78000, isVerified: true }
      ];
      setBrands(defaultBrands);
      localStorage.setItem('igigster_admin_brands', JSON.stringify(defaultBrands));
    }
  }, []);

  const handleToggleVerify = (id: string) => {
    const updated = brands.map(b => b.id === id ? { ...b, isVerified: !b.isVerified } : b);
    setBrands(updated);
    localStorage.setItem('igigster_admin_brands', JSON.stringify(updated));
  };

  const getSpend = (inr: number, usd: number) => {
    return displayPrice({ INR: inr, USD: usd }, currency);
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>Registered Brands Directory</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Audit brand verification status, monitor total advertising budgets, and view contact profiles.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search brands..."
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
        {filteredBrands.map((b) => (
          <div key={b.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={b.avatar} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} alt={b.name} />
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 750, color: primaryText, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {b.name} {b.isVerified && <CheckCircle2 size={14} fill="#10B981" color="#FFFFFF" />}
                </h3>
                <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>Contact: {b.contactName}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: secondaryText }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Location:</span>
                <span style={{ fontWeight: 600, color: primaryText }}>{b.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Active Campaigns:</span>
                <span style={{ fontWeight: 600, color: primaryText }}>{b.activeCampaigns} campaigns</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Spend:</span>
                <span style={{ fontWeight: 700, color: accentColor }}>{getSpend(b.totalSpendINR, b.totalSpendUSD)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: mutedText }}>ID: {b.id}</span>
              <button
                onClick={() => handleToggleVerify(b.id)}
                style={{
                  height: '30px',
                  borderRadius: '6px',
                  border: b.isVerified ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(16,185,129,0.2)',
                  backgroundColor: b.isVerified ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.06)',
                  color: b.isVerified ? '#EF4444' : '#10B981',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '0 12px',
                  cursor: 'pointer'
                }}
              >
                {b.isVerified ? 'Revoke Vetting' : 'Verify Brand'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
