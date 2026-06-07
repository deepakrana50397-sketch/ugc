'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, ArrowRight, Star, DollarSign, Briefcase } from 'lucide-react';
import { getGigs } from '@/lib/services';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import { formatRelativeTime } from '@/lib/utils';
import { servicesData } from '@/data/services';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';

export default function FeaturedGigs() {
  const { currency } = useCurrency();
  const [filter, setFilter] = useState<'all' | 'ugc_creator' | 'editor' | 'motion_designer' | 'product_demo'>('all');

  // Load real gigs from services
  const allGigs = getGigs();
  const filteredGigs = filter === 'all' 
    ? allGigs.slice(0, 3) 
    : allGigs.filter(g => g.category === filter).slice(0, 3);

  const getCategoryLabel = (category: string) => {
    return servicesData.find(s => s.id === category)?.name || category;
  };

  const categories = [
    { id: 'all', label: 'ALL GIGS' },
    { id: 'ugc_creator', label: 'UGC CREATOR' },
    { id: 'editor', label: 'VIDEO EDITOR' },
    { id: 'motion_designer', label: 'MOTION DESIGNER' },
    { id: 'product_demo', label: 'PRODUCT DEMO' }
  ];

  // Random rotations to replicate the organic hand-placed paper styling from origin/main
  const rotations = ['rotate-[0.5deg]', 'rotate-[-0.5deg]', 'rotate-[1deg]', 'rotate-[-1deg]'];

  return (
    <section 
      id="gigs"
      style={{
        padding: '120px 24px',
        backgroundColor: '#F5F2EC', // Premium warm beige/off-white background matching the screenshots
        position: 'relative',
        borderTop: '1px solid rgba(28, 25, 22, 0.08)',
        borderBottom: '1px solid rgba(28, 25, 22, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Grid Lines to make it feel like an engineering brief board */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />

      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#E6E2DA',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#1c1917',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Briefcase size={13} style={{ color: 'rgb(79, 70, 229)' }} />
            <span>[ Open Gig Directory ]</span>
          </div>

          <TextReveal
            text="Live Creator Gigs Board"
            tag="h2"
            mode="words"
            className="text-foreground"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          />
          
          <p style={{ color: '#57534e', maxWidth: '600px', fontSize: '16.5px', lineHeight: 1.6 }}>
            Browse open campaigns posted directly by vetted brands. Apply for free, pitch your rates, and keep 100% of your earnings.
          </p>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '10px 20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                borderRadius: '8px',
                backgroundColor: filter === cat.id ? '#1c1917' : '#E6E2DA',
                color: filter === cat.id ? '#ffffff' : '#1c1917',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              [{cat.label}]
            </button>
          ))}
        </div>

        {/* Gigs List/Corkboard Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            width: '100%',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredGigs.map((gig, idx) => {
              const cardRotation = rotations[idx % rotations.length];
              const tapeClass = idx % 2 === 0 ? 'washi-tape-top-left' : 'washi-tape-top-right';

              return (
                <motion.div
                  layout
                  key={gig.id}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -30 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className={`${cardRotation}`}
                  style={{
                    backgroundColor: '#FAF8F5',
                    borderRadius: '24px',
                    padding: '36px 32px',
                    border: '1px solid rgba(28, 25, 22, 0.08)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    textAlign: 'left',
                    height: '100%',
                  }}
                >
                  {/* Washi Tape Accent */}
                  <div className={`washi-tape ${tapeClass}`} />

                  {/* Decorative Pushpin */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '50%', 
                      transform: 'translateX(-50%)', 
                      zIndex: 20, 
                      pointerEvents: 'none' 
                    }}
                  >
                    <div style={{ width: '14px', height: '14px', backgroundColor: 'rgb(219, 39, 119)', borderRadius: '50%', border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#ffffff', borderRadius: '50%', margin: '2px auto', opacity: 0.7 }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
                    {/* Metadata Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span 
                        style={{
                          fontSize: '10px',
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          color: '#78716c',
                          backgroundColor: '#E6E2DA',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                        }}
                      >
                        #{gig.id.substring(0, 5).toUpperCase()}
                      </span>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: 'rgb(79, 70, 229)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <DollarSign size={14} style={{ color: 'rgb(79, 70, 229)' }} />
                        {displayPrice(gig.price, currency)}
                      </span>
                    </div>

                    {/* Title & Brand */}
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1c1917', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                        <Link href={`/gigs/${gig.slug}`} style={{ transition: 'color 0.3s' }} className="hover-text-primary">
                          {gig.title}
                        </Link>
                      </h3>
                      <div style={{ fontSize: '13px', color: '#78716c' }}>
                        by <strong style={{ color: '#1c1917' }}>{gig.brandName}</strong> • {formatRelativeTime(gig.postedAt)}
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {gig.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          style={{ 
                            fontSize: '11px', 
                            fontWeight: 500,
                            color: '#78716c', 
                            backgroundColor: '#E6E2DA', 
                            padding: '4px 10px', 
                            borderRadius: '20px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata info */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      borderTop: '1px solid rgba(28, 25, 22, 0.06)', 
                      paddingTop: '16px', 
                      marginTop: '24px' 
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#78716c' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} style={{ color: 'rgb(79, 70, 229)' }} />
                        <strong style={{ color: '#1c1917' }}>{gig.applicantsCount}</strong> Applicants
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} style={{ color: 'rgb(219, 39, 119)' }} />
                        Due {gig.deadline}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Global Gig board redirect */}
        <motion.div
          style={{ alignSelf: 'center', marginTop: '16px' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Magnetic strength={0.15}>
            <Link
              href="/gigs"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgb(79, 70, 229)',
                fontSize: '14px',
                fontWeight: 700,
                padding: '12px 28px',
                borderRadius: '30px',
                border: '1px solid rgba(79, 70, 229, 0.2)',
                backgroundColor: 'rgba(255,255,255,0.7)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              }}
              className="hover-border-primary-full"
            >
              <span>Explore All Live Gigs</span>
              <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
