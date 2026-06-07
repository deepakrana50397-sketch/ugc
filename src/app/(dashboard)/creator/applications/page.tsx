'use client';

import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '@/lib/services';
import { Application } from '@/types/common';
import { Briefcase, Calendar, CheckCircle, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';

export default function CreatorApplicationsPage() {
  const { currency } = useCurrency();
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeUnlockApp, setActiveUnlockApp] = useState<Application | null>(null);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handlePayConnectionFee = (appId: string) => {
    updateApplicationStatus(appId, 'accepted');
    setApplications(getApplications());
    setActiveUnlockApp(null);
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return '#10b981';
      case 'unlocked': return '#10b981';
      case 'shortlisted': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Campaign Application Hub</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Monitor your status. If shortlisted, pay the connection fee to reveal brand coordinates.
        </p>
      </div>

      {/* Applications list */}
      {applications.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applications.map((app) => (
            <div 
              key={app.id} 
              className="glass-panel" 
              style={{
                padding: '28px',
                border: '1px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Top Row: Title, Date, Rate */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>{app.gigTitle}</h3>
                  <span style={{ color: '#64748b', fontSize: '13px', display: 'block', marginTop: '4px' }}>Brand: {app.brandName}</span>
                </div>
                <div style={{ direction: 'ltr', textAlign: 'right' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', display: 'block' }}>
                    {displayPrice(app.rate, currency)}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Bid Amount</span>
                </div>
              </div>

              {/* Status & Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                  <Calendar size={14} />
                  <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Status Pill */}
                  <span 
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: `${getStatusColor(app.status)}15`,
                      color: getStatusColor(app.status),
                      border: `1px solid ${getStatusColor(app.status)}30`,
                    }}
                  >
                    {app.status}
                  </span>

                  {/* Unlock connection trigger */}
                  {app.status === 'shortlisted' && (
                    <button
                      onClick={() => setActiveUnlockApp(app)}
                      style={{
                        backgroundColor: '#f59e0b',
                        color: '#000000',
                        padding: '6px 14px',
                        borderRadius: '16px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(245, 158, 11, 0.2)',
                      }}
                      className="hover-opacity-90"
                    >
                      Verify Connection (INR 49 / $1)
                    </button>
                  )}

                  {(app.status === 'accepted' || app.status === 'unlocked') && (
                    <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>
                      ✓ Connection Unlocked! support@skinglow.com
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>You haven't submitted any campaign applications yet.</p>
        </div>
      )}

      {/* Verification Shortlist Payment Drawer Modal */}
      {activeUnlockApp && (
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
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>Secure Gateway</span>
              <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Unlock Shortlist Connection</h2>
              <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.5 }}>
                Pay the small shortlist validation fee to instantly retrieve email coordinates for <strong>{activeUnlockApp.brandName}</strong>.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#475569' }}>Shortlist connection fee:</span>
              <strong style={{ fontSize: '18px', color: '#f59e0b', fontFamily: 'var(--font-display)' }}>
                {currency === 'INR' ? '₹49 INR' : '$1 USD'}
              </strong>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={() => setActiveUnlockApp(null)}
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
                onClick={() => handlePayConnectionFee(activeUnlockApp.id)}
                style={{
                  flex: 2,
                  backgroundColor: '#f59e0b',
                  color: '#000000',
                  padding: '12px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                }}
              >
                Pay & Unlock Contact
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
