'use client';

import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '@/lib/services';
import { Application } from '@/types/common';
import { Calendar, HelpCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

export default function AdminApplicationsPage() {
  const { currency } = useCurrency();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleStatusChange = (appId: string, status: Application['status']) => {
    updateApplicationStatus(appId, status);
    setApplications(getApplications());
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
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Platform Matchmaking Monitor</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Inspect application bids, shortlists, and payouts. Manually resolve vetting matches if required.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {applications.map((app) => (
          <div 
            key={app.id} 
            className="glass-panel" 
            style={{
              padding: '24px',
              border: '1px solid var(--card-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{app.gigTitle}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', color: '#64748b', fontSize: '12.5px', marginTop: '4px' }}>
                  <span>Creator: <strong>{app.creatorName}</strong></span>
                  <span>•</span>
                  <span>Brand: <strong>{app.brandName}</strong></span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'block' }}>
                  {displayPrice(app.rate, currency)}
                </span>
                <span style={{ color: '#64748b', fontSize: '11px', display: 'block', textAlign: 'right' }}>Bid amount</span>
              </div>
            </div>

            {/* Pitch Text preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'rgba(0,0,0,0.01)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Candidate Pitch Excerpt</span>
              <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.5 }}>"{app.pitch}"</p>
            </div>

            {/* Actions row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
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

              <div style={{ display: 'flex', gap: '8px' }}>
                {app.status !== 'accepted' && app.status !== 'unlocked' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'accepted')}
                    style={{
                      backgroundColor: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.2)',
                      color: '#10b981',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Force Approve
                  </button>
                )}
                {app.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'rejected')}
                    style={{
                      backgroundColor: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      color: '#ef4444',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Force Reject
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
