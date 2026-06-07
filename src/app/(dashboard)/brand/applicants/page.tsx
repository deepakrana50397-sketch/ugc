'use client';

import React, { useState, useEffect } from 'react';
import { brandDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { CheckCircle2, Play, Users, MessageSquare, ShieldCheck } from 'lucide-react';

interface Applicant {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  creatorTitle: string;
  gigTitle: string;
  gigId: string;
  pitch: string;
  rate: { INR: number; USD: number };
  appliedAt: string;
  status: 'pending' | 'shortlisted' | 'unlocked' | string;
}

export default function BrandApplicantsPage() {
  const { currency } = useCurrency();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [activeUnlock, setActiveUnlock] = useState<Applicant | null>(null);

  useEffect(() => {
    // Load local storage applicants or seed default ones
    const local = localStorage.getItem('igigster_brand_applicants');
    if (local) {
      setApplicants(JSON.parse(local));
    } else {
      setApplicants(brandDashboardData.applicants);
    }
  }, []);

  const handleShortlist = (id: string) => {
    const updated = applicants.map(app => {
      if (app.id === id) {
        return { ...app, status: 'shortlisted' };
      }
      return app;
    });
    setApplicants(updated);
    localStorage.setItem('igigster_brand_applicants', JSON.stringify(updated));
  };

  const handleUnlockConnection = (id: string) => {
    const updated = applicants.map(app => {
      if (app.id === id) {
        return { ...app, status: 'unlocked' };
      }
      return app;
    });
    setApplicants(updated);
    localStorage.setItem('igigster_brand_applicants', JSON.stringify(updated));
    setActiveUnlock(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Campaign Applicants</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Evaluate creator pitches and video reels. Shortlist matches and unlock contact details.
        </p>
      </div>

      {applicants.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {applicants.map((appl) => (
            <div 
              key={appl.id} 
              className="glass-panel" 
              style={{
                padding: '32px',
                border: '1px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Profile Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img src={appl.creatorAvatar} alt={appl.creatorName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{appl.creatorName}</h3>
                    <span style={{ color: 'rgb(99, 102, 241)', fontSize: '12.5px' }}>{appl.creatorTitle}</span>
                  </div>
                </div>

                <div style={{ direction: 'ltr', textAlign: 'right' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', display: 'block' }}>
                    {displayPrice(appl.rate, currency)}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Bid rate card</span>
                </div>
              </div>

              {/* Campaign applied info */}
              <div style={{ backgroundColor: 'rgba(0,0,0,0.01)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.02)', fontSize: '13px', color: '#64748b' }}>
                Applied to: <strong style={{ color: '#0f172a' }}>{appl.gigTitle}</strong>
              </div>

              {/* Proposal Pitch Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 650, color: '#64748b', textTransform: 'uppercase' }}>Proposal Pitch</span>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>"{appl.pitch}"</p>
              </div>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Applied {new Date(appl.appliedAt).toLocaleDateString()}</span>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  {appl.status === 'pending' && (
                    <button
                      onClick={() => handleShortlist(appl.id)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--card-border)',
                        color: '#0f172a',
                        padding: '8px 16px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      className="hover-bg-white-01"
                    >
                      Shortlist Creator
                    </button>
                  )}

                  {appl.status === 'shortlisted' && (
                    <button
                      onClick={() => setActiveUnlock(appl)}
                      style={{
                        backgroundColor: 'rgb(var(--primary))',
                        color: '#ffffff',
                        padding: '8px 16px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(124, 58, 237, 0.2)',
                      }}
                      className="glow-button"
                    >
                      Unlock Contact (INR 99 / $2)
                    </button>
                  )}

                  {appl.status === 'unlocked' && (
                    <div style={{ fontSize: '13.5px', color: '#10b981', fontWeight: 600 }}>
                      ✓ unlocked: neha.kapoor@ugc.com • +91 9988776655
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>No candidates have applied to your campaign briefs yet.</p>
        </div>
      )}

      {/* Brand Unlock Connection Payment Modal */}
      {activeUnlock && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px',
          }}
        >
          <div 
            className="glass-panel"
            style={{
              backgroundColor: '#f8fafc',
              maxWidth: '480px',
              width: '100%',
              borderRadius: '20px',
              border: '1px solid var(--card-border)',
              padding: '32px',
              color: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'rgb(var(--primary))', textTransform: 'uppercase' }}>Hiring unlock</span>
              <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Unlock Contact Coordinates</h2>
              <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.5 }}>
                Pay the flat unlock connection fee to retrieve direct phone, email, and script worksheets for <strong>{activeUnlock.creatorName}</strong>.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#475569' }}>Unlock connection fee:</span>
              <strong style={{ fontSize: '18px', color: 'rgb(var(--primary))', fontFamily: 'var(--font-display)' }}>
                {currency === 'INR' ? '₹99 INR' : '$2 USD'}
              </strong>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={() => setActiveUnlock(null)}
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--card-border)',
                  color: '#0f172a',
                  padding: '12px',
                  borderRadius: '24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnlockConnection(activeUnlock.id)}
                style={{
                  flex: 2,
                  backgroundColor: 'rgb(var(--primary))',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                }}
                className="glow-button"
              >
                Pay & Reveal Contact
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
