'use client';

import React, { useState, useEffect } from 'react';
import { getGigs, updateGigStatus } from '@/lib/services';
import { Gig } from '@/types/gig';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { ListFilter, Calendar, Users, SlidersHorizontal, Trash2, Power, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BrandGigsManagementPage() {
  const { currency } = useCurrency();
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    // Show Skinglow brand's gigs
    setGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic'));
  }, []);

  const handleToggleStatus = (gigId: string, currentStatus: Gig['status']) => {
    const nextStatus = currentStatus === 'active' ? 'rejected' : 'active';
    updateGigStatus(gigId, nextStatus);
    setGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic'));
  };

  const handleDeleteGig = (gigId: string) => {
    if (confirm('Are you sure you want to delete this campaign brief?')) {
      const stored = JSON.parse(localStorage.getItem('igigster_gigs') || '[]');
      const filtered = stored.filter((g: Gig) => g.id !== gigId);
      localStorage.setItem('igigster_gigs', JSON.stringify(filtered));
      setGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic'));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Manage Campaign Gigs</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Toggle status, view applicant submissions, or delete outdated campaign briefs.
        </p>
      </div>

      {gigs.length > 0 ? (
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
              {/* Left details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{gig.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {new Date(gig.postedAt).toLocaleDateString()}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={13} fill="currentColor" /> {gig.applicantsCount} applicants</span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>{displayPrice(gig.price, currency)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {/* Status Indicator */}
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

                <Link
                  href={`/gigs/${gig.slug}`}
                  target="_blank"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border: '1px solid var(--card-border)',
                    color: '#0f172a',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Eye size={14} />
                  <span>View</span>
                </Link>

                <button
                  onClick={() => handleToggleStatus(gig.id, gig.status)}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    border: '1px solid var(--card-border)',
                    color: gig.status === 'active' ? '#ef4444' : '#10b981',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Power size={14} />
                  <span>{gig.status === 'active' ? 'Pause' : 'Activate'}</span>
                </button>

                <button
                  onClick={() => handleDeleteGig(gig.id)}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>You haven't posted any campaign briefs yet.</p>
        </div>
      )}

    </div>
  );
}
