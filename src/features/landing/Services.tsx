'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Video, Megaphone, GraduationCap, Users, Tent, MapPin, Film, PenTool, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 18,
      }
    },
  };

  const categories = [
    {
      id: '01',
      emoji: '🎬',
      icon: <Video size={20} />,
      title: 'Content Creation',
      description: 'High-converting UGC videos, TikToks, Reels, and static social assets created to grab attention.',
      bullets: ['UGC video ads', 'Product photography', 'Short-form clips'],
      link: '/gigs?category=content-creation'
    },
    {
      id: '02',
      emoji: '📣',
      icon: <Megaphone size={20} />,
      title: 'Influencer Marketing',
      description: 'Partner with creators and influencers who match your brand persona to reach targeted audiences.',
      bullets: ['Influencer sourcing', 'Seeding campaigns', 'Brand ambassadors'],
      link: '/gigs?category=influencer-marketing'
    },
    {
      id: '03',
      emoji: '🎓',
      icon: <GraduationCap size={20} />,
      title: 'Campus Activation',
      description: 'Mobilize student groups for direct campus marketing, peer seeding, and campus events.',
      bullets: ['Student ambassadors', 'On-campus events', 'College community seeding'],
      link: '/gigs?category=campus-activation'
    },
    {
      id: '04',
      emoji: '🏘',
      icon: <Users size={20} />,
      title: 'Community Awareness',
      description: 'Tap into local associations, interest groups, and micro-communities for grassroots advocacy.',
      bullets: ['Micro-community seeding', 'Word of mouth', 'Group discussions'],
      link: '/gigs?category=community-awareness'
    },
    {
      id: '05',
      emoji: '🎪',
      icon: <Tent size={20} />,
      title: 'Event Marketing',
      description: 'Deploy specialized production teams and creators to cover, hype, and record offline events.',
      bullets: ['Live event coverage', 'Influencer attendance', 'Promo capturing'],
      link: '/gigs?category=event-marketing'
    },
    {
      id: '06',
      emoji: '📍',
      icon: <MapPin size={20} />,
      title: 'Hyperlocal Promotion',
      description: 'Geographically targeted campaigns to drive foot traffic, local app installs, and area buzz.',
      bullets: ['Location targeted UGC', 'Local influencer push', 'Store visit prompts'],
      link: '/gigs?category=hyperlocal-promotion'
    },
    {
      id: '07',
      emoji: '🎥',
      icon: <Film size={20} />,
      title: 'Production',
      description: 'Full-scale video production, scripting, high-end shooting, and expert editing.',
      bullets: ['Studio shoots', 'Professional editing', 'Direct-response assets'],
      link: '/gigs?category=production'
    },
    {
      id: '08',
      emoji: '✍️',
      icon: <PenTool size={20} />,
      title: 'Creative Strategy',
      description: 'Data-driven hook ideation, scriptwriting, creative testing guidelines, and performance audits.',
      bullets: ['Hook formulation', 'DR script drafts', 'Competitor creative analysis'],
      link: '/gigs?category=creative-strategy'
    }
  ];

  return (
    <section 
      id="services"
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Decorative Radial Grid Background Accent */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.02) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '72px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
               alignItems: 'center',
               gap: '6px',
               backgroundColor: 'rgba(79, 70, 229, 0.06)',
               border: '1px solid rgba(79, 70, 229, 0.15)',
               padding: '6px 14px',
               borderRadius: '20px',
               color: 'rgb(79, 70, 229)',
               fontSize: '11px',
               fontWeight: 700,
               letterSpacing: '0.08em',
               textTransform: 'uppercase',
             }}
           >
             <Sparkles size={13} className="text-secondary" />
             <span>Services Marketplace</span>
           </div>

           <TextReveal
             text="Categories of execution."
             tag="h2"
             mode="words"
             className="text-foreground"
             style={{
               fontSize: 'clamp(32px, 4.5vw, 48px)',
               fontWeight: 800,
               letterSpacing: '-0.03em',
               lineHeight: 1.1,
             }}
           />
           <TextReveal
             text="People who execute."
             tag="h2"
             mode="words"
             delay={0.25}
             style={{ 
               fontFamily: "'Playfair Display', serif", 
               fontStyle: 'italic', 
               fontWeight: 500,
               fontSize: 'clamp(32px, 4.5vw, 48px)',
               color: 'rgb(219, 39, 119)',
               marginTop: '-16px',
               letterSpacing: '-0.02em',
             }}
           />
           
           <motion.p 
             style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '16.5px', lineHeight: 1.6 }}
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5, duration: 0.6 }}
           >
             Browse targeted execution channels where creators, students, influencers, and agencies launch and scale campaigns.
           </motion.p>
        </div>

        {/* Modules Grid */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            width: '100%',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              style={{ height: '100%' }}
            >
              <GlowCard
                glowColor="rgba(79, 70, 229, 0.06)"
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  height: '100%',
                  position: 'relative',
                  border: '1px solid rgba(231, 229, 228, 0.7)',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {/* Meta details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span 
                    style={{
                      fontSize: '18px',
                    }}
                  >
                    {category.emoji}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(79, 70, 229, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgb(79, 70, 229)',
                      border: '1px solid rgba(79, 70, 229, 0.12)',
                    }}
                  >
                    {category.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                  <h3 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {category.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.45 }}>
                    {category.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', listStyle: 'none', margin: 0, padding: 0 }}>
                  {category.bullets.map((bullet, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                      <div 
                        style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(79, 70, 229, 0.05)', 
                          border: '1px solid rgba(79, 70, 229, 0.12)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: 'rgb(79, 70, 229)',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={9} strokeWidth={3} />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA */}
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                  <Link
                    href={category.link}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '30px',
                      backgroundColor: 'var(--foreground)',
                      color: 'var(--background)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s ease',
                    }}
                    className="hover-bg-primary-btn"
                  >
                    <span>Open Category</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
