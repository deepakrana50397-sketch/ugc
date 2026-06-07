'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, CheckCircle, SlidersHorizontal, ArrowLeft, Play, PhoneCall, ExternalLink } from 'lucide-react';
import { Creator, CreatorCategory } from '@/types/creator';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';

interface CreatorsClientProps {
  initialCreators: Creator[];
}

export default function CreatorsClient({ initialCreators }: CreatorsClientProps) {
  const { currency } = useCurrency();
  const [creators] = useState<Creator[]>(initialCreators);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Filter & Sort Logic
  const filteredCreators = creators.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.bio.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      c.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === 'all' || c.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Talent' },
    { id: 'video_creator', name: 'UGC Creators' },
    { id: 'editor', name: 'Video Editors' },
    { id: 'motion_designer', name: 'Motion Designers' },
    { id: 'voiceover', name: 'Voiceover Artists' },
  ];

  const getCategoryLabel = (cat: CreatorCategory) => {
    switch (cat) {
      case 'video_creator': return 'UGC Content Creator';
      case 'editor': return 'Short-Form Editor';
      case 'motion_designer': return 'UI/Motion Designer';
      case 'voiceover': return 'Voiceover Artist';
      case 'actor': return 'UGC Actor';
      default: return cat;
    }
  };

  return (
    <div style={{ padding: '48px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%', color: '#0f172a' }}>
      
      {/* Search and Filters */}
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
              placeholder="Search by name, skills, title, bio..."
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

          {/* Sort Selection indicator / placeholder */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <SlidersHorizontal size={16} style={{ color: '#64748b' }} />
            <span style={{ fontSize: '13px', color: '#64748b' }}>Filters Active</span>
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
                backgroundColor: category === cat.id ? '#ec4899' : 'rgba(0,0,0,0.02)',
                color: '#0f172a',
                transition: 'all 0.2s',
              }}
              className={category !== cat.id ? 'hover-bg-white-005' : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Creators */}
      {filteredCreators.length > 0 ? (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}
          className="stagger-container"
        >
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="glass-panel creator-card-item"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
              }}
            >
              {/* Profile Header */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ec4899' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: 600 }}>{creator.name}</h3>
                    {creator.isVerified && (
                      <CheckCircle size={16} fill="#ec4899" color="#ffffff" />
                    )}
                  </div>
                  <span style={{ color: 'rgb(99, 102, 241)', fontSize: '13px', fontWeight: 500 }}>
                    {getCategoryLabel(creator.category)}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '64px' }}>
                {creator.bio}
              </p>

              {/* Details (Rating, Completed Jobs, Rate) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {creator.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} fill="#fbbf24" color="#fbbf24" /> {creator.rating} ({creator.completedJobs} jobs)
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Starting rate:</span>
                  <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '16px' }}>
                    {displayPrice(creator.startingRate, currency)} {creator.startingRate.period ? `/${creator.startingRate.period}` : ''}
                  </span>
                </div>
              </div>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {creator.skills.slice(0, 3).map(skill => (
                  <span key={skill} style={{ fontSize: '11px', color: '#64748b', backgroundColor: 'rgba(0,0,0,0.02)', padding: '2px 8px', borderRadius: '4px' }}>
                    {skill}
                  </span>
                ))}
                {creator.skills.length > 3 && (
                  <span style={{ fontSize: '11px', color: '#64748b', padding: '2px 4px' }}>
                    +{creator.skills.length - 3} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '12px' }}>
                <button
                  onClick={() => setSelectedCreator(creator)}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    border: '1px solid var(--card-border)',
                    color: '#0f172a',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  className="hover-bg-white-01"
                >
                  View Portfolio
                </button>
                <Link
                  href={`/contact?hire=${creator.id}`}
                  style={{
                    backgroundColor: '#ec4899',
                    color: '#0f172a',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    fontSize: '13px',
                    textAlign: 'center',
                    boxShadow: '0 4px 10px rgba(236, 72, 153, 0.2)',
                  }}
                  className="glow-button"
                >
                  Hire Creator
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>No talent found matching your filter criteria. Try adjusting keywords.</p>
        </div>
      )}

      {/* Creator Detail Portfolio Modal */}
      {selectedCreator && (
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
          onClick={() => {
            setSelectedCreator(null);
            setActiveVideo(null);
          }}
        >
          <div 
            className="glass-panel"
            style={{
              backgroundColor: '#f8fafc',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              border: '1px solid var(--card-border)',
              padding: '32px',
              position: 'relative',
              color: '#0f172a',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img 
                  src={selectedCreator.avatar} 
                  alt={selectedCreator.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedCreator.name}
                    {selectedCreator.isVerified && <CheckCircle size={18} fill="#ec4899" color="#ffffff" />}
                  </h2>
                  <span style={{ color: 'rgb(99, 102, 241)', fontSize: '14px' }}>
                    {getCategoryLabel(selectedCreator.category)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedCreator(null);
                  setActiveVideo(null);
                }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Profile Bio */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>About Me</h4>
              <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: 1.6 }}>{selectedCreator.bio}</p>
            </div>

            {/* Skill Tags */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Expertise & Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCreator.skills.map(skill => (
                  <span key={skill} style={{ fontSize: '12px', color: '#0f172a', backgroundColor: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.2)', padding: '4px 12px', borderRadius: '16px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio Videos */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '12px' }}>Portfolio Work</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {selectedCreator.portfolio.map((item) => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div 
                      style={{
                        position: 'relative',
                        height: '180px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#18181b',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                      onClick={() => setActiveVideo(item.videoUrl)}
                    >
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div 
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(236,72,153,0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0f172a',
                          boxShadow: '0 0 15px rgba(236,72,153,0.5)',
                        }}
                      >
                        <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />
                      </div>
                      <span style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '11px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '8px', fontWeight: 600 }}>
                        {item.category || 'Reel/UGC'}
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Player Modal Overlay */}
            {activeVideo && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(9,9,11,0.95)',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <button 
                    onClick={() => setActiveVideo(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'none',
                      border: 'none',
                      color: '#ec4899',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    <ArrowLeft size={16} /> Back to Creator
                  </button>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                  <video 
                    src={activeVideo} 
                    controls 
                    autoPlay 
                    style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

            {/* Footer Summary & Contact */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', marginTop: '12px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Starting rate card:</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-display)' }}>
                  {displayPrice(selectedCreator.startingRate, currency)} {selectedCreator.startingRate.period ? `/${selectedCreator.startingRate.period}` : ''}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                  href={`/contact?hire=${selectedCreator.id}`}
                  style={{
                    backgroundColor: '#ec4899',
                    color: '#0f172a',
                    padding: '12px 28px',
                    borderRadius: '24px',
                    fontWeight: 600,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)',
                  }}
                  className="glow-button"
                >
                  <PhoneCall size={16} />
                  <span>Hire {selectedCreator.name}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .creator-card-item:hover {
          transform: translateY(-4px);
          border-color: rgba(236, 72, 153, 0.2) !important;
          background-color: rgba(0, 0, 0, 0.02) !important;
        }
        .hover-bg-white-005:hover {
          background-color: rgba(0, 0, 0, 0.06) !important;
        }
        @media (min-width: 768px) {
          .filter-top-row { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </div>
  );
}
