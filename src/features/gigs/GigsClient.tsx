'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, SlidersHorizontal, Star } from 'lucide-react';
import { Gig, GigCategory } from '@/types/gig';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import { formatRelativeTime } from '@/lib/utils';
import { servicesData } from '@/data/services';

interface GigsClientProps {
  initialGigs: Gig[];
}

export default function GigsClient({ initialGigs }: GigsClientProps) {
  const { currency } = useCurrency();
  const [gigs, setGigs] = useState<Gig[]>(initialGigs);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'budget-desc' | 'budget-asc'>('newest');

  // Reload gigs dynamically if user created any in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('igigster_gigs');
      if (stored) {
        setGigs(JSON.parse(stored));
      }
    }
  }, []);

  // Filter & Sort Logic
  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = 
      gig.title.toLowerCase().includes(search.toLowerCase()) || 
      gig.description.toLowerCase().includes(search.toLowerCase()) ||
      gig.brandName.toLowerCase().includes(search.toLowerCase()) ||
      gig.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = category === 'all' || gig.category === category;
    const matchesUrgent = !showUrgentOnly || gig.isUrgent;

    return matchesSearch && matchesCategory && matchesUrgent;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    }
    const priceA = a.price[currency] || 0;
    const priceB = b.price[currency] || 0;
    if (sortBy === 'budget-desc') {
      return priceB - priceA;
    }
    if (sortBy === 'budget-asc') {
      return priceA - priceB;
    }
    return 0;
  });

  const categories = [
    { id: 'all', name: 'All Categories' },
    ...servicesData.map(s => ({ id: s.id, name: s.name }))
  ];

  return (
    <div style={{ padding: '48px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%', color: '#0f172a' }}>
      
      {/* Search and Filter Panel */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '32px',
          border: '1px solid var(--card-border)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="filter-top-row">
          {/* Search Input */}
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} 
            />
            <input
              type="text"
              placeholder="Search gigs by title, brand, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: '24px',
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                color: '#0f172a',
                outline: 'none',
                fontSize: '14px',
                transition: 'border-color 0.2s',
              }}
              className="focus-border-primary"
            />
          </div>

          {/* Sort Selection */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <SlidersHorizontal size={16} style={{ color: '#64748b' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '10px 16px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(9,9,11,0.95)',
                color: '#0f172a',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="newest">Newest Gigs</option>
              <option value="budget-desc">Highest Budget</option>
              <option value="budget-asc">Lowest Budget</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          }}
          className="no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '16px',
                backgroundColor: category === cat.id ? 'rgb(var(--primary))' : 'rgba(0,0,0,0.02)',
                color: category === cat.id ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s',
              }}
              className={category !== cat.id ? 'hover-bg-white-005' : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Checkbox Filter */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#64748b', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showUrgentOnly}
            onChange={(e) => setShowUrgentOnly(e.target.checked)}
            style={{
              accentColor: 'rgb(var(--primary))',
              width: '16px',
              height: '16px',
            }}
          />
          <span>Show 🔥 <strong>Urgent Gigs</strong> only</span>
        </label>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '14px', color: '#64748b' }}>
        <span>Showing {filteredGigs.length} gig{filteredGigs.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Gigs List */}
      {filteredGigs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="stagger-container">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="glass-panel gig-row-item"
              style={{
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                borderLeft: gig.isUrgent ? '4px solid var(--danger)' : '1px solid var(--card-border)',
              }}
            >
              {/* Top Meta info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(99, 102, 241, 0.08)', color: 'rgb(99, 102, 241)', padding: '4px 10px', borderRadius: '12px' }}>
                    {categories.find(c => c.id === gig.category)?.name || gig.category}
                  </span>
                  {gig.isUrgent && (
                    <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '4px 10px', borderRadius: '12px' }}>
                      🔥 Urgent
                    </span>
                  )}
                  {gig.isFeatured && (
                    <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', padding: '4px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-display)' }}>
                  {displayPrice(gig.price, currency)}
                </span>
              </div>

              {/* Title & Brand */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  <Link href={`/gigs/${gig.slug}`} style={{ transition: 'color 0.2s' }} className="hover-text-primary">
                    {gig.title}
                  </Link>
                </h3>
                <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                  {gig.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                  <span>by <strong>{gig.brandName}</strong></span>
                  <span>•</span>
                  <span>{formatRelativeTime(gig.postedAt)}</span>
                </div>
              </div>

              {/* Tags & Action Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginTop: '4px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {gig.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '11px', color: '#64748b', backgroundColor: 'rgba(0, 0, 0, 0.02)', padding: '2px 8px', borderRadius: '4px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#64748b' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} />
                    {gig.applicantsCount} Applicants
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    Due {gig.deadline || 'ASAP'}
                  </span>
                  <Link
                    href={`/gigs/${gig.slug}`}
                    style={{
                      backgroundColor: 'rgb(var(--primary))',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      fontWeight: 600,
                      fontSize: '12.5px',
                    }}
                    className="glow-button"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>No gigs found matching your active filters. Try adjustments or search keywords.</p>
        </div>
      )}

      <style jsx global>{`
        .gig-row-item:hover {
          transform: scale(1.01);
          border-color: rgba(124, 58, 237, 0.2) !important;
          background-color: rgba(0, 0, 0, 0.02) !important;
        }
        .hover-bg-white-005:hover {
          background-color: rgba(0, 0, 0, 0.06) !important;
          color: #ffffff !important;
        }
        @media (min-width: 768px) {
          .filter-top-row { grid-template-columns: 1fr auto !important; }
          .gig-row-item {
            grid-template-columns: auto 1fr auto !important;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
