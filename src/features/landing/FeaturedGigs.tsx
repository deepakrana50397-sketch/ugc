'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Mail, Check, X, Briefcase } from 'lucide-react';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';

export default function FeaturedGigs() {
  const [activeTab, setActiveTab] = useState<'brands' | 'talent'>('brands');

  const brandOpportunities = [
    {
      id: 'o1',
      title: 'Hire UGC Creators',
      description: 'Access our catalog of verified creators who shoot native, high-retention short-form video assets.',
      tag: 'UGC Content',
      stat: 'Verified Talent',
      statLabel: '1,200+ creators active',
      cta: 'Browse Creators',
      link: '/creators'
    },
    {
      id: 'o2',
      title: 'Find Influencers',
      description: 'Connect with creators who have highly engaged, target demographics to run sponsored seeding campaigns.',
      tag: 'Distribution',
      stat: 'Targeted Reach',
      statLabel: 'Activate local communities',
      cta: 'Explore Channels',
      link: '/brands'
    },
    {
      id: 'o3',
      title: 'Book Teams',
      description: 'Hire a complete team of copywriters, creators, and editors who work in lockstep to deliver bulk assets.',
      tag: 'Bulk Execution',
      stat: 'Dedicated Slack',
      statLabel: 'Complete campaign delivery',
      cta: 'Hire a Team',
      link: '/contact'
    }
  ];

  const talentOpportunities = [
    {
      id: 't1',
      title: 'Earn through gigs',
      description: 'Apply for open briefs posted directly by verified brands. Set your own rates and keep 100% of your payout.',
      tag: 'Monetization',
      stat: '$150 - $600',
      statLabel: 'Average rate per video',
      cta: 'View Gigs Board',
      link: '/gigs'
    },
    {
      id: 't2',
      title: 'Join campaigns',
      description: 'Participate in community campaigns, campus activation, and product trials matching your lifestyle.',
      tag: 'Seeding Gigs',
      stat: 'Free Products',
      statLabel: 'Plus high-paying bonuses',
      cta: 'Browse Campaigns',
      link: '/gigs'
    },
    {
      id: 't3',
      title: 'Build portfolio',
      description: 'Get feedback, use testing tool templates, and build a verified profile page with clear conversion metrics.',
      tag: 'Portfolios',
      stat: 'Free Builder',
      statLabel: 'Increase your close rate',
      cta: 'Create Profile',
      link: '/register?role=creator'
    }
  ];

  const currentOpportunities = activeTab === 'brands' ? brandOpportunities : talentOpportunities;
  const rotations = ['rotate-[0.5deg]', 'rotate-[-0.5deg]', 'rotate-[1deg]'];

  return (
    <section 
      id="opportunities-section"
      style={{
        padding: '120px 24px',
        backgroundColor: '#F5F2EC', // Premium warm beige
        position: 'relative',
        borderTop: '1px solid rgba(28, 25, 22, 0.08)',
        borderBottom: '1px solid rgba(28, 25, 22, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Grid Lines */}
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
            <span>Opportunities Hub</span>
          </div>

          <TextReveal
            text="Featured Opportunities"
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
            Explore tailored pathways for brands seeking high-converting campaigns and creators looking for paid opportunities.
          </p>
        </div>

        {/* Two Tabs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => setActiveTab('brands')}
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '12px 28px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              borderRadius: '9999px',
              backgroundColor: activeTab === 'brands' ? '#1c1917' : '#E6E2DA',
              color: activeTab === 'brands' ? '#ffffff' : '#1c1917',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: activeTab === 'brands' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            For Brands
          </button>
          <button
            onClick={() => setActiveTab('talent')}
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '12px 28px',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              borderRadius: '9999px',
              backgroundColor: activeTab === 'talent' ? '#1c1917' : '#E6E2DA',
              color: activeTab === 'talent' ? '#ffffff' : '#1c1917',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: activeTab === 'talent' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            For Talent
          </button>
        </div>

        {/* Corkboard Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            width: '100%',
          }}
        >
          <AnimatePresence mode="popLayout">
            {currentOpportunities.map((opportunity, idx) => {
              const cardRotation = rotations[idx % rotations.length];
              const tapeClass = idx % 2 === 0 ? 'washi-tape-top-left' : 'washi-tape-top-right';

              return (
                <motion.div
                  layout
                  key={opportunity.id}
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

                  {/* Pushpin */}
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
                        {opportunity.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1c1917', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                        {opportunity.title}
                      </h3>
                      <p style={{ color: '#57534e', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                        {opportunity.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats & CTA */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '16px',
                      borderTop: '1px solid rgba(28, 25, 22, 0.06)', 
                      paddingTop: '20px', 
                      marginTop: '24px' 
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'rgb(79, 70, 229)' }}>
                        {opportunity.stat}
                      </span>
                      <span style={{ fontSize: '11px', color: '#78716c', fontWeight: 600 }}>
                        {opportunity.statLabel}
                      </span>
                    </div>

                    <Link
                      href={opportunity.link}
                      style={{
                        padding: '12px',
                        borderRadius: '30px',
                        backgroundColor: '#1c1917',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease',
                      }}
                      className="hover:bg-stone-800"
                    >
                      <span>{opportunity.cta}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Global redirect */}
        <motion.div
          style={{ alignSelf: 'center', marginTop: '16px' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Magnetic strength={0.15}>
            <Link
              href="/pricing"
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
              className="hover:border-primary-full"
            >
              <span>Explore Pricing Options</span>
              <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
