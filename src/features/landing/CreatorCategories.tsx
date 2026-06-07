'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { getCreators } from '@/lib/services';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';

export default function CreatorCategories() {
  const { currency } = useCurrency();
  const featuredCreators = getCreators().filter(c => c.isFeatured).slice(0, 3);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'video_creator': return 'UGC Content Creator';
      case 'editor': return 'Short-Form Editor';
      case 'motion_designer': return 'UI/Motion Designer';
      case 'voiceover': return 'Voiceover Artist';
      default: return category;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 }
    },
  };

  return (
    <section 
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        position: 'relative',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '60px',
        }}
      >
        {/* Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextReveal
              text="Meet Vetted UGC Talent"
              tag="h2"
              mode="words"
              className="text-foreground"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            />
            <motion.p 
              style={{ color: 'var(--muted)', maxWidth: '600px', fontSize: '16.5px', lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hire top-rated creators, editors, and designers. Click on profiles to view dynamic rate cards and portfolio videos.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Magnetic strength={0.15}>
              <Link
                href="/creators"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgb(219, 39, 119)',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: '1px solid rgba(219, 39, 119, 0.2)',
                  backgroundColor: 'rgba(219, 39, 119, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="hover-border-pink-full"
              >
                <span>View All Creators</span>
                <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Grid of Creators */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featuredCreators.map((creator) => (
            <motion.div
              key={creator.id}
              variants={cardVariants}
              style={{ height: '100%' }}
            >
              <GlowCard
                glowColor="rgba(219, 39, 119, 0.12)"
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  height: '100%',
                  border: '1px solid rgba(231, 229, 228, 0.8)',
                }}
              >
                {/* Profile Header */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img 
                    src={creator.avatar} 
                    alt={creator.name} 
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgb(219, 39, 119)' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h3 style={{ color: 'var(--foreground)', fontSize: '19px', fontWeight: 700, letterSpacing: '-0.02em' }}>{creator.name}</h3>
                      {creator.isVerified && (
                        <CheckCircle size={17} fill="rgb(79, 70, 229)" color="#ffffff" />
                      )}
                    </div>
                    <span style={{ color: 'rgb(79, 70, 229)', fontSize: '13px', fontWeight: 600 }}>
                      {getCategoryLabel(creator.category)}
                    </span>
                  </div>
                </div>

                {/* Bio & Details */}
                <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.6, flexGrow: 1 }}>
                  {creator.bio}
                </p>

                {/* Meta details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(28, 25, 22, 0.06)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} style={{ color: 'rgb(79, 70, 229)' }} /> {creator.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#d97706" color="#d97706" /> <strong style={{ color: 'var(--foreground)' }}>{creator.rating}</strong> ({creator.completedJobs} jobs)
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Starting rate:</span>
                    <span style={{ color: 'var(--foreground)', fontWeight: 800, fontSize: '16px' }}>
                      {displayPrice(creator.startingRate, currency)}
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {creator.skills.slice(0, 3).map(skill => (
                    <span key={skill} style={{ fontSize: '11px', fontWeight: 500, color: 'var(--muted)', backgroundColor: 'var(--muted-bg)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(28, 25, 22, 0.04)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
