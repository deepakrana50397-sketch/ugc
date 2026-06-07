'use client';

import React, { useState, useEffect } from 'react';
import { getGigs, updateGigStatus } from '@/lib/services';
import { Gig } from '@/types/gig';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { Calendar, UserCheck, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default function AdminGigsPage() {
  const { currency } = useCurrency();
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    setGigs(getGigs());
  }, []);

  const handleStatusChange = (gigId: string, status: Gig['status']) => {
    updateGigStatus(gigId, status);
    setGigs(getGigs());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Campaign Brief Audit Vetting</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Verify that brand briefs conform to UGC pricing day-rate baselines and contain no contacts before unlocks.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {gigs.map((gig) => (
          <div 
            key={gig.id} 
            className="glass-panel" 
            style={{
              padding: '24px',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{gig.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
                <span>Brand: <strong>{gig.brandName}</strong></span>
                <span>•</span>
                <span>Budget: <strong>{displayPrice(gig.price, currency)}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {new Date(gig.postedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: gig.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  color: gig.status === 'active' ? '#10b981' : '#ef4444',
                  border: gig.status === 'active' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)',
                }}
              >
                {gig.status}
              </span>

              {gig.status !== 'active' ? (
                <button
                  onClick={() => handleStatusChange(gig.id, 'active')}
                  style={{
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    color: '#10b981',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircle size={14} />
                  <span>Approve & Publish</span>
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange(gig.id, 'rejected')}
                  style={{
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#ef4444',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <XCircle size={14} />
                  <span>Reject / Delist</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
