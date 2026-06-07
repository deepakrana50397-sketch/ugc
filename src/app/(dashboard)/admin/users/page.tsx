'use client';

import React, { useState, useEffect } from 'react';
import { getCreators, getGigs } from '@/lib/services';
import { Creator } from '@/types/creator';
import { CheckCircle2, Shield, User, Trash2 } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

export default function AdminUsersPage() {
  const { currency } = useCurrency();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCreators(getCreators());
    setLoading(false);
  }, []);

  const handleToggleVerify = (id: string, isVerified: boolean) => {
    const updated = creators.map(c => {
      if (c.id === id) {
        return { ...c, isVerified: !isVerified };
      }
      return c;
    });
    setCreators(updated);
    localStorage.setItem('igigster_creators', JSON.stringify(updated));
  };

  if (loading) return <div>Loading users directory...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Platform Users Manager</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Grant verification checkmarks to UGC profiles that have submitted identity worksheets.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {creators.map((c) => (
          <div 
            key={c.id} 
            className="glass-panel" 
            style={{
              padding: '24px',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={c.avatar} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {c.name}
                  {c.isVerified && <CheckCircle2 size={14} fill="#10b981" color="#ffffff" />}
                </h3>
                <span style={{ color: 'rgb(99, 102, 241)', fontSize: '12px' }}>{c.title}</span>
              </div>
            </div>

            {/* Profile values summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.02)', padding: '12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748b' }}>
                <span>Day rate:</span>
                <strong style={{ color: '#0f172a' }}>{displayPrice(c.startingRate, currency)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748b' }}>
                <span>Completed:</span>
                <strong style={{ color: '#0f172a' }}>{c.completedJobs} matches</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748b' }}>
                <span>Location:</span>
                <strong style={{ color: '#0f172a' }}>{c.location}</strong>
              </div>
            </div>

            {/* Verification action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button
                onClick={() => handleToggleVerify(c.id, c.isVerified || false)}
                style={{
                  backgroundColor: c.isVerified ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  border: c.isVerified ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)',
                  color: c.isVerified ? '#ef4444' : '#10b981',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {c.isVerified ? 'Unverify Account' : 'Verify Creator Profile'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
