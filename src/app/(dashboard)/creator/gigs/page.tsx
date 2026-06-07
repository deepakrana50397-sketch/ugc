'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGigs } from '@/lib/services';
import { Gig } from '@/types/gig';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import { Search, MapPin, Calendar, Star, Compass } from 'lucide-react';

export default function CreatorBrowseGigsPage() {
  const { currency } = useCurrency();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setGigs(getGigs());
  }, []);

  const filteredGigs = gigs.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase()) ||
    g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Explore Campaign Gigs</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            Find active budgets matching your UGC day rates. Apply with a custom pitch.
          </p>
        </div>
        
        {/* Search bar */}
        <div style={{ position: 'relative', width: '300px' }} className="search-bar-wrap">
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search keywords, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '20px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', fontSize: '13px', outline: 'none' }}
            className="focus-border-primary"
          />
        </div>
      </div>

      {/* Suggested Matches feed */}
      {filteredGigs.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredGigs.map((gig) => (
            <div 
              key={gig.id} 
              className="glass-panel" 
              style={{ 
                padding: '28px', 
                border: '1px solid var(--card-border)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                borderLeft: gig.isUrgent ? '4px solid var(--danger)' : '1px solid var(--card-border)',
              }}
            >
              {/* Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', backgroundColor: 'rgba(99, 102, 241, 0.08)', color: 'rgb(99, 102, 241)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
                  {gig.category === 'video_creator' ? 'UGC Video' : 'Editing'}
                </span>
                {gig.isUrgent && (
                  <span style={{ fontSize: '10px', color: '#f87171', fontWeight: 700 }}>
                    🔥 Urgent Hiring
                  </span>
                )}
              </div>

              {/* Title & Brand */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{gig.title}</h3>
                <span style={{ color: '#64748b', fontSize: '12.5px', display: 'block', marginTop: '4px' }}>by {gig.brandName}</span>
              </div>

              {/* Budget card summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Active Budget:</span>
                <strong style={{ fontSize: '16px', color: '#0f172a', fontFamily: 'var(--font-display)' }}>
                  {displayPrice(gig.price, currency)}
                </strong>
              </div>

              {/* Action row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.02)', paddingTop: '16px', marginTop: 'auto' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Due {gig.deadline || 'ASAP'}</span>
                
                <Link
                  href={`/gigs/${gig.slug}`}
                  style={{
                    backgroundColor: 'rgb(var(--primary))',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                  className="glow-button"
                >
                  View & Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>No campaign gigs matched your search query.</p>
        </div>
      )}

    </div>
  );
}
