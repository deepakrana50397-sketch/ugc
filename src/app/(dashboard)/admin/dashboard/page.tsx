'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { ShieldCheck, Compass, Users, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { getGigs, updateGigStatus } from '@/lib/services';
import { Gig } from '@/types/gig';

export default function AdminDashboardPage() {
  const { currency } = useCurrency();
  const [pendingGigs, setPendingGigs] = useState<Gig[]>([]);

  useEffect(() => {
    // Gigs that are pending approval
    setPendingGigs(getGigs().filter(g => g.status === 'active').slice(0, 2));
  }, []);

  const metrics = adminDashboardData.metrics;
  const pendingApps = adminDashboardData.pendingApplications;

  const getMetricValue = (metric: typeof metrics[0]) => {
    if (typeof metric.value === 'object') {
      return metric.value[currency as keyof typeof metric.value];
    }
    return metric.value;
  };

  const handleApprove = (gigId: string) => {
    updateGigStatus(gigId, 'active');
    setPendingGigs(prev => prev.filter(g => g.id !== gigId));
  };

  const handleReject = (gigId: string) => {
    updateGigStatus(gigId, 'rejected');
    setPendingGigs(prev => prev.filter(g => g.id !== gigId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Platform Administration</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Vetting dashboards and overall metrics for iGigster matches and revenue collections.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {metrics.map((m, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', border: '1px solid var(--card-border)' }}>
            <span style={{ color: '#64748b', fontSize: '13px', display: 'block', fontWeight: 500 }}>{m.label}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {getMetricValue(m)}
              </span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Approvals Queue & Match status */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          alignItems: 'start',
        }}
        className="admin-dashboard-body-grid"
      >
        {/* Left: Vetting Approval list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Pending Gig Approvals</h2>
            <Link href="/admin/gigs" style={{ fontSize: '12.5px', color: 'rgb(var(--primary))', fontWeight: 600 }}>View Vetting queue</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pendingGigs.length > 0 ? (
              pendingGigs.map((gig) => (
                <div 
                  key={gig.id} 
                  className="glass-panel" 
                  style={{ padding: '24px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0f172a' }}>{gig.title}</h3>
                      <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginTop: '4px' }}>by {gig.brandName} • Budget: {displayPrice(gig.price, currency)}</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleApprove(gig.id)}
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
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(gig.id)}
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
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '24px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)', textAlign: 'center', fontSize: '13.5px', color: '#64748b' }}>
                All posted briefs are currently approved and live!
              </div>
            )}
          </div>
        </div>

        {/* Right: Matches Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Matches Verification Queue</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pendingApps.map((app, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ padding: '20px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{app.creatorName}</h4>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Applied to {app.gigTitle}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600, backgroundColor: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '10px' }}>Verification Pending</span>
                  <Link href="/admin/applications" style={{ fontSize: '12.5px', color: 'rgb(var(--primary))', fontWeight: 650 }}>
                    Audit Match
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @media (min-width: 992px) {
          .admin-dashboard-body-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
