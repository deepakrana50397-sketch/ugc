'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { getGigs } from '@/lib/services';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice } from '@/lib/currency';
import { formatRelativeTime } from '@/lib/utils';
import { servicesData } from '@/data/services';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';

export default function FeaturedGigs() {
  const { currency } = useCurrency();
  
  // Get active/featured gigs
  const featuredGigs = getGigs().filter(g => g.isFeatured || g.isUrgent).slice(0, 3);

  const getCategoryLabel = (category: string) => {
    return servicesData.find(s => s.id === category)?.name || category;
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 90, damping: 15 },
    },
  };

  return (
    <section 
      id="gigs"
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
              text="Trending UGC Gigs"
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
              Explore high-paying short-form opportunities posted by vetted brands. Apply for free today.
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
                href="/gigs"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgb(79, 70, 229)',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: '1px solid rgba(79, 70, 229, 0.2)',
                  backgroundColor: 'rgba(79, 70, 229, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="hover-border-primary-full"
              >
                <span>Browse Job Board</span>
                <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Gigs List */}
        <motion.div 
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featuredGigs.map((gig) => (
            <motion.div
              key={gig.id}
              variants={rowVariants}
              className="gig-card-row"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid rgba(231, 229, 228, 0.8)',
                borderLeft: gig.isUrgent ? '4px solid rgb(239, 68, 68)' : '1px solid rgba(231, 229, 228, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Top Row: Categories & Budget */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(79, 70, 229, 0.08)', color: 'rgb(79, 70, 229)', padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.02em', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
                    {getCategoryLabel(gig.category)}
                  </span>
                  {gig.isUrgent && (
                    <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'rgb(220, 38, 38)', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                      🔥 Urgent Opportunity
                    </span>
                  )}
                  {gig.isFeatured && (
                    <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(219, 39, 119, 0.08)', color: 'rgb(219, 39, 119)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(219, 39, 119, 0.15)' }}>
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--foreground)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {displayPrice(gig.price, currency)}
                </span>
              </div>

              {/* Title & Brand */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--foreground)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                  <Link href={`/gigs/${gig.slug}`} style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} className="hover-text-primary">
                    {gig.title}
                  </Link>
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '14px' }}>
                  <span>by <strong style={{ color: 'var(--foreground)' }}>{gig.brandName}</strong></span>
                  <span>•</span>
                  <span>{formatRelativeTime(gig.postedAt)}</span>
                </div>
              </div>

              {/* Bottom Row: Tags & Metadata */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  gap: '16px', 
                  borderTop: '1px solid rgba(28, 25, 22, 0.06)', 
                  paddingTop: '16px', 
                  marginTop: '4px' 
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {gig.tags.map(tag => (
                    <span 
                      key={tag} 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 500,
                        color: 'var(--muted)', 
                        backgroundColor: 'var(--muted-bg)', 
                        padding: '4px 10px', 
                        borderRadius: '20px',
                        border: '1px solid rgba(28, 25, 22, 0.04)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px', color: 'var(--muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} style={{ color: 'rgb(79, 70, 229)' }} />
                    <strong style={{ color: 'var(--foreground)' }}>{gig.applicantsCount}</strong> Applicants
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} style={{ color: 'rgb(219, 39, 119)' }} />
                    Due {gig.deadline}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
