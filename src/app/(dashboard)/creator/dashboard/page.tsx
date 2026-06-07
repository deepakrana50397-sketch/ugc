'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { creatorDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { Star, CheckCircle, Clock, AlertTriangle, Play, Sparkles, ArrowRight } from 'lucide-react';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';

export default function CreatorDashboardPage() {
  const { currency } = useCurrency();
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);

  useEffect(() => {
    setActiveGigs(getGigs().filter(g => g.isFeatured || g.isUrgent).slice(0, 2));
  }, []);

  const stats = creatorDashboardData.stats;
  const profileSteps = creatorDashboardData.profileSteps;
  const completion = creatorDashboardData.profileCompletion;

  const getStatValue = (stat: typeof stats[0]) => {
    if (typeof stat.value === 'object') {
      return stat.value[currency as keyof typeof stat.value];
    }
    return stat.value;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Welcome Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '32px', 
          background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, rgba(124, 58, 237, 0.02) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Welcome Back, Neha!</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            You have 2 shortlisted opportunities waiting for verification connection details.
          </p>
        </div>
        <Link
          href="/creator/gigs"
          style={{
            backgroundColor: '#ec4899',
            color: '#0f172a',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 10px rgba(236,72,153,0.3)',
          }}
          className="glow-button"
        >
          <span>Browse Active Gigs</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', border: '1px solid var(--card-border)' }}>
            <span style={{ color: '#64748b', fontSize: '13px', display: 'block', fontWeight: 500 }}>{stat.label}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {getStatValue(stat)}
              </span>
              <span 
                style={{ 
                  fontSize: '11px', 
                  fontWeight: 600,
                  color: stat.type === 'increase' ? '#10b981' : stat.type === 'warning' ? '#f59e0b' : '#3b82f6' 
                }}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recommended Feed & Profile Checklist */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          alignItems: 'start',
        }}
        className="creator-dashboard-body-grid"
      >
        {/* Left Side: Gigs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Recommended Gigs</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeGigs.map((gig) => (
              <div 
                key={gig.id} 
                className="glass-panel" 
                style={{ padding: '24px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '10px', backgroundColor: 'rgba(99, 102, 241, 0.08)', color: 'rgb(99, 102, 241)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
                      {gig.category === 'video_creator' ? 'UGC Video' : 'Editing'}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '8px', color: '#0f172a' }}>{gig.title}</h3>
                    <span style={{ color: '#64748b', fontSize: '12.5px', display: 'block', marginTop: '4px' }}>by {gig.brandName}</span>
                  </div>
                  <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '15px' }}>
                    {displayPrice(gig.price, currency)}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {gig.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontSize: '10px', color: '#64748b', backgroundColor: 'rgba(0,0,0,0.02)', padding: '2px 6px', borderRadius: '4px' }}>{tag}</span>
                    ))}
                  </div>
                  <Link 
                    href={`/gigs/${gig.slug}`} 
                    style={{ fontSize: '12px', color: '#ec4899', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>View Gig Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Profile completion & tasks */}
        <div className="glass-panel" style={{ padding: '28px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Profile Vetting Score</h3>
            <p style={{ color: '#64748b', fontSize: '12.5px', marginTop: '2px' }}>Complete checklist to unlock Verified Checkmark badge.</p>
          </div>

          {/* Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
              <span style={{ color: '#ec4899' }}>{completion}% Completed</span>
              <span style={{ color: '#0f172a' }}>4/5 Steps Done</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${completion}%`, height: '100%', backgroundColor: '#ec4899', borderRadius: '4px' }} />
            </div>
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />

          {/* Checklist items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {profileSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                {step.done ? (
                  <CheckCircle size={16} style={{ color: '#10b981' }} />
                ) : (
                  <Clock size={16} style={{ color: '#64748b' }} />
                )}
                <span style={{ color: step.done ? '#94a3b8' : '#cbd5e1', textDecoration: step.done ? 'line-through' : 'none' }}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 992px) {
          .creator-dashboard-body-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
