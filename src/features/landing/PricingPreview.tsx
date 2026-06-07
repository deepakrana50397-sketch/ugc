'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Info } from 'lucide-react';
import { creatorPricingPlans, platformPricing } from '@/data/pricing';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice, formatPrice } from '@/lib/currency';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';

export default function PricingPreview() {
  const { currency } = useCurrency();
  const [roleType, setRoleType] = useState<'brand' | 'creator'>('brand');

  // Transactional video packages for brands (remixed from origin/main)
  const brandPackages = [
    {
      id: 'pkg_starter',
      name: 'Starter Package',
      price: { INR: 12000, USD: 150 },
      billing: 'video asset',
      total: { INR: '₹12,000 total', USD: '$150 total' },
      description: 'Ideal for DTC brands testing direct-response scroll hooks.',
      features: [
        '1 Vetted Creator profile matching',
        'Direct-response script copywriting',
        'Mobile-native professional editing',
        'TikTok-native caption overlays',
        '90-day Paid usage license',
        '7-day turnaround delivery'
      ],
      popular: false,
      comparison: 'Save 57%',
      ctaText: 'Book Starter Creative',
      ctaLink: '/brand/post-gig?package=starter'
    },
    {
      id: 'pkg_growth',
      name: 'Growth Package',
      price: { INR: 10800, USD: 135 },
      billing: 'video asset',
      total: { INR: '₹32,400 total (3 videos)', USD: '$405 total (3 videos)' },
      description: 'Best choice. Test multiple creator handles & script hooks.',
      features: [
        '3 Vetted Creators matching (diverse)',
        '3 Custom direct-response scripts',
        'Competitor ad spying & hook audit',
        'Custom graphics, captions & SFX',
        'Full Whitelist partnership licensing',
        '6-day turnaround priority delivery'
      ],
      popular: true,
      comparison: 'Save 57%',
      ctaText: 'Book Growth Package',
      ctaLink: '/brand/post-gig?package=growth'
    },
    {
      id: 'pkg_scale',
      name: 'Scale Package',
      price: { INR: 9600, USD: 120 },
      billing: 'video asset',
      total: { INR: '₹48,000 total (5 videos)', USD: '$600 total (5 videos)' },
      description: 'Built for monthly creative testing & high ad-account scaling.',
      features: [
        '5 Vetted Creators matching (diverse)',
        '5 Script copywriting drafts + variations',
        'Full brand audio spying & audit',
        'Graphics, overlays, transition layouts',
        'Unlimited organic whitelist usage',
        'Dedicated brief asset manager',
        'Fast 5-day turnaround delivery'
      ],
      popular: false,
      comparison: 'Save 60%',
      ctaText: 'Book Scale Package',
      ctaLink: '/brand/post-gig?package=scale'
    }
  ];

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

  // Rotations for the video packages to give them a tactile paper layout
  const rotations = ['rotate-[0.5deg]', 'rotate-[-0.5deg]', 'rotate-[1deg]'];

  return (
    <section 
      id="pricing"
      style={{
        padding: '120px 24px',
        backgroundColor: '#F5F2EC', // Premium warm beige/off-white background matching Gigs list
        position: 'relative',
        borderTop: '1px solid rgba(28, 25, 22, 0.08)',
        borderBottom: '1px solid rgba(28, 25, 22, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '64px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
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
            <span>[ Pricing Matrix ]</span>
          </div>

          <TextReveal
            text="Transparent Pricing"
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
          <h2 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontStyle: 'italic', 
              fontWeight: 500,
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              color: 'rgb(219, 39, 119)',
              marginTop: '-16px',
              letterSpacing: '-0.02em',
            }}
          >
            No agency retainer fees.
          </h2>
          
          <motion.p 
            style={{ color: '#57534e', maxWidth: '600px', margin: '0 auto', fontSize: '16.5px', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Order video packages as a one-off campaign or refresh assets monthly. Vetted creator rates are passed directly with zero agency markup fees.
          </motion.p>
          
          {/* Toggle */}
          <div 
            style={{
              display: 'inline-flex',
              padding: '4px',
              backgroundColor: '#E6E2DA',
              borderRadius: '30px',
              marginTop: '16px',
              border: '1px solid rgba(28,25,22,0.08)'
            }}
          >
            <button
              onClick={() => setRoleType('brand')}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '8px 24px',
                fontSize: '13.5px',
                fontWeight: 700,
                borderRadius: '20px',
                backgroundColor: roleType === 'brand' ? '#1c1917' : 'transparent',
                color: roleType === 'brand' ? '#ffffff' : '#1c1917',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Order Video Assets
            </button>
            <button
              onClick={() => setRoleType('creator')}
              style={{
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: '8px 24px',
                fontSize: '13.5px',
                fontWeight: 700,
                borderRadius: '20px',
                backgroundColor: roleType === 'creator' ? '#1c1917' : 'transparent',
                color: roleType === 'creator' ? '#ffffff' : '#1c1917',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Creator Subscriptions
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={roleType}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              width: '100%',
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {roleType === 'brand' ? (
              // Display Video Packages (with washi-tape tactile look)
              brandPackages.map((pkg, index) => {
                const cardRotation = rotations[index % rotations.length];
                const tapeClass = index % 2 === 0 ? 'washi-tape-top-left' : 'washi-tape-top-right';

                return (
                  <motion.div
                    key={pkg.id}
                    variants={cardVariants}
                    style={{ height: '100%' }}
                    className={`${cardRotation}`}
                  >
                    <GlowCard
                      glowColor={pkg.popular ? 'rgba(79, 70, 229, 0.12)' : 'rgba(120, 113, 108, 0.08)'}
                      style={{
                        padding: '44px 36px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                        height: '100%',
                        border: pkg.popular 
                          ? '2px solid rgb(79, 70, 229)' 
                          : '1px solid rgba(28, 25, 22, 0.08)',
                        backgroundColor: '#FAF8F5',
                        position: 'relative',
                        textAlign: 'left',
                      }}
                      tiltActive={true}
                    >
                      {/* Washi Tape */}
                      <div className={`washi-tape ${tapeClass}`} />

                      {pkg.popular && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-14px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            backgroundColor: 'rgb(79, 70, 229)',
                            color: '#ffffff',
                            padding: '4px 16px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                            zIndex: 10,
                          }}
                        >
                          Best Value
                        </span>
                      )}

                      {/* Title & Price */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 style={{ color: '#1c1917', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>{pkg.name}</h3>
                          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(5, 150, 105, 0.08)', color: '#059669', padding: '2px 8px', borderRadius: '4px' }}>{pkg.comparison}</span>
                        </div>
                        <p style={{ color: '#78716c', fontSize: '13px', lineHeight: 1.5 }}>{pkg.description}</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '16px' }}>
                          <span style={{ fontSize: '42px', fontWeight: 800, color: '#1c1917', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                            {displayPrice(pkg.price, currency)}
                          </span>
                          <span style={{ color: '#78716c', fontSize: '14px', fontWeight: 500 }}>
                            /{pkg.billing}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(219, 39, 119)' }}>
                          {currency === 'USD' ? pkg.total.USD : pkg.total.INR}
                        </span>
                      </div>

                      {/* Features List */}
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13.5px', color: '#1c1917' }}>
                            <div style={{ 
                              width: '18px', 
                              height: '18px', 
                              borderRadius: '50%', 
                              backgroundColor: 'rgba(5, 150, 105, 0.1)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}>
                              <Check size={12} style={{ color: '#059669', strokeWidth: 3 }} />
                            </div>
                            <span style={{ lineHeight: 1.4 }}>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        href={pkg.ctaLink}
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          padding: '14px 28px',
                          borderRadius: '30px',
                          fontWeight: 700,
                          fontSize: '13.5px',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          backgroundColor: pkg.popular ? 'rgb(79, 70, 229)' : '#1c1917',
                          color: '#ffffff',
                          boxShadow: pkg.popular ? '0 8px 20px -6px rgba(79, 70, 229, 0.4)' : 'none',
                        }}
                        className={pkg.popular ? 'glow-button' : 'hover-bg-primary-btn'}
                      >
                        {pkg.ctaText}
                      </Link>
                    </GlowCard>
                  </motion.div>
                );
              })
            ) : (
              // Display Creator Plans (from v2 pricingPlans)
              creatorPricingPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  variants={cardVariants}
                  style={{ height: '100%', maxWidth: '440px', margin: '0 auto', width: '100%' }}
                >
                  <GlowCard
                    glowColor={plan.popular ? 'rgba(79, 70, 229, 0.15)' : 'rgba(120, 113, 108, 0.08)'}
                    style={{
                      padding: '44px 36px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '28px',
                      height: '100%',
                      border: plan.popular 
                        ? '2px solid rgb(79, 70, 229)' 
                        : '1px solid rgba(28, 25, 22, 0.08)',
                      backgroundColor: '#FAF8F5',
                      position: 'relative',
                      textAlign: 'left',
                    }}
                    tiltActive={true}
                  >
                    {plan.popular && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-14px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '11px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          backgroundColor: 'rgb(79, 70, 229)',
                          color: '#ffffff',
                          padding: '4px 16px',
                          borderRadius: '20px',
                          boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                          zIndex: 10,
                        }}
                      >
                        Most Popular
                      </span>
                    )}

                    {/* Title & Price */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <h3 style={{ color: '#1c1917', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>{plan.name}</h3>
                      <p style={{ color: '#78716c', fontSize: '13.5px', lineHeight: 1.5 }}>{plan.description}</p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '16px' }}>
                        <span style={{ fontSize: '42px', fontWeight: 800, color: '#1c1917', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                          {displayPrice(plan.price, currency)}
                        </span>
                        <span style={{ color: '#78716c', fontSize: '14px', fontWeight: 500 }}>
                          /{plan.billing}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13.5px', color: '#1c1917' }}>
                          <div style={{ 
                            width: '18px', 
                            height: '18px', 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(5, 150, 105, 0.1)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}>
                            <Check size={12} style={{ color: '#059669', strokeWidth: 3 }} />
                          </div>
                          <span style={{ lineHeight: 1.4 }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={plan.ctaLink}
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        padding: '14px 28px',
                        borderRadius: '30px',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        backgroundColor: plan.popular ? 'rgb(79, 70, 229)' : 'rgba(28, 25, 22, 0.05)',
                        color: plan.popular ? '#ffffff' : '#1c1917',
                        border: plan.popular ? 'none' : '1px solid rgba(28, 25, 22, 0.08)',
                        boxShadow: plan.popular ? '0 8px 20px -6px rgba(79, 70, 229, 0.4)' : 'none',
                      }}
                      className={plan.popular ? 'glow-button' : 'premium-btn-secondary'}
                    >
                      {plan.ctaText}
                    </Link>
                  </GlowCard>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Platform connection details banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            width: '100%',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            borderRadius: '16px',
            border: '1px solid rgba(79, 70, 229, 0.15)',
            backgroundColor: 'rgba(79, 70, 229, 0.02)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Info size={24} style={{ color: 'rgb(79, 70, 229)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13.5px', color: '#78716c', lineHeight: 1.6, textAlign: 'left' }}>
            {roleType === 'brand' ? (
              <span>
                <strong>Success Connection Unlock Policy:</strong> Connect with shortlisted creators for ₹99 ($2). A 5% success connection commission fee is only charged once video milestones are successfully completed.
              </span>
            ) : (
              <span>
                <strong>Creator Onboarding & Commission Policy:</strong> Verify shortlisted connections for ₹49 ($1). We collect a standard 10% platform transaction fee upon completion of hired campaign contracts.
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
