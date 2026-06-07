'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { brandDashboardData } from '@/data/dashboard';
import { displayPrice } from '@/lib/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';
import { PlusCircle, Users, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BrandDashboardPage() {
  const { currency } = useCurrency();
  const [activeGigs, setActiveGigs] = useState<Gig[]>([]);
  
  useEffect(() => {
    setActiveGigs(getGigs().filter(g => g.brandId === 'brand-skinglow' || g.brandId === 'brand-generic').slice(0, 2));
  }, []);

  const stats = brandDashboardData.stats;
  const applicants = brandDashboardData.applicants;

  const getStatValue = (stat: typeof stats[0]) => {
    if (typeof stat.value === 'object') {
      return stat.value[currency as keyof typeof stat.value];
    }
    return stat.value;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Welcome banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '32px', 
          background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.02) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Welcome Back, SkinGlow!</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            Review candidate video reels and pitches. Post a new campaign brief instantly.
          </p>
        </div>
        <Link
          href="/brand/post-gig"
          style={{
            backgroundColor: 'rgb(var(--primary))',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 10px rgba(124, 58, 237, 0.3)',
          }}
          className="glow-button"
        >
          <PlusCircle size={14} />
          <span>Post New UGC Gig</span>
        </Link>
      </div>

      {/* Stats cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', border: '1px solid var(--card-border)' }}>
            <span style={{ color: '#64748b', fontSize: '13px', display: 'block', fontWeight: 500 }}>{stat.label}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {getStatValue(stat)}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Active Gigs and Recent Candidates */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          alignItems: 'start',
        }}
        className="brand-dashboard-body-grid"
      >
        {/* Left Side: Active Gigs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Your Active Campaigns</h2>
            <Link href="/brand/gigs" style={{ fontSize: '12.5px', color: 'rgb(var(--primary))', fontWeight: 600 }}>Manage All</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeGigs.map((gig) => (
              <div 
                key={gig.id} 
                className="glass-panel" 
                style={{ padding: '24px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{gig.title}</h3>
                    <span style={{ color: '#64748b', fontSize: '12.5px', display: 'block', marginTop: '4px' }}>Posted {new Date(gig.postedAt).toLocaleDateString()}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '3px 8px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                    Active
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b' }}>
                    <Users size={14} style={{ color: 'rgb(var(--primary))' }} />
                    {gig.applicantsCount} Applicants
                  </span>
                  <Link 
                    href="/brand/applicants" 
                    style={{ fontSize: '12.5px', color: 'rgb(var(--primary))', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Review Candidates</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Recent Candidates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Recent Applicants</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {applicants.slice(0, 2).map((appl, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ padding: '20px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={appl.creatorAvatar} alt={appl.creatorName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{appl.creatorName}</h4>
                    <span style={{ color: 'rgb(99, 102, 241)', fontSize: '12px' }}>{appl.creatorTitle}</span>
                  </div>
                </div>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{appl.pitch}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Bid: {displayPrice(appl.rate, currency)}</span>
                  <Link href="/brand/applicants" style={{ fontSize: '12.5px', color: 'rgb(var(--primary))', fontWeight: 650 }}>
                    Review Pitch
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @media (min-width: 992px) {
          .brand-dashboard-body-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
