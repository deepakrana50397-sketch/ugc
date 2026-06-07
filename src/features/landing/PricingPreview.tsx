'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { brandPricingPlans, creatorPricingPlans, platformPricing } from '@/data/pricing';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice, formatPrice } from '@/lib/currency';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';
import Magnetic from '@/components/animation/Magnetic';

export default function PricingPreview() {
  const { currency } = useCurrency();
  const [roleType, setRoleType] = useState<'brand' | 'creator'>('brand');

  const plans = roleType === 'brand' ? brandPricingPlans : creatorPricingPlans;

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
      id="pricing"
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
          gap: '64px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <TextReveal
            text="Fair, Pay-As-You-Go Pricing"
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
            style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '17px', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            No heavy upfront subscriptions. We succeed only when you connect. Check the options below.
          </motion.p>
          
          {/* Toggle */}
          <div 
            style={{
              display: 'inline-flex',
              padding: '4px',
              backgroundColor: 'rgba(28, 25, 22, 0.04)',
              border: '1px solid rgba(28, 25, 22, 0.08)',
              borderRadius: '30px',
              marginTop: '16px',
              backdropFilter: 'blur(8px)',
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
                backgroundColor: roleType === 'brand' ? 'rgb(79, 70, 229)' : 'transparent',
                color: roleType === 'brand' ? '#ffffff' : 'var(--muted)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              I am a Brand
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
                backgroundColor: roleType === 'creator' ? 'rgb(79, 70, 229)' : 'transparent',
                color: roleType === 'creator' ? '#ffffff' : 'var(--muted)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              I am a Creator
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
              maxWidth: '960px',
              margin: '0 auto',
              width: '100%',
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                style={{ height: '100%' }}
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
                      : '1px solid rgba(231, 229, 228, 0.8)',
                    position: 'relative',
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
                    <h3 style={{ color: 'var(--foreground)', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>{plan.name}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.5 }}>{plan.description}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '16px' }}>
                      <span style={{ fontSize: '42px', fontWeight: 800, color: 'var(--foreground)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                        {displayPrice(plan.price, currency)}
                      </span>
                      <span style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 500 }}>
                        /{plan.billing}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--foreground)' }}>
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
                      fontSize: '14.5px',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      backgroundColor: plan.popular ? 'rgb(79, 70, 229)' : 'rgba(28, 25, 22, 0.05)',
                      color: plan.popular ? '#ffffff' : 'var(--foreground)',
                      border: plan.popular ? 'none' : '1px solid rgba(28, 25, 22, 0.08)',
                      boxShadow: plan.popular ? '0 8px 20px -6px rgba(79, 70, 229, 0.4)' : 'none',
                    }}
                    className={plan.popular ? 'glow-button' : 'premium-btn-secondary'}
                  >
                    {plan.ctaText}
                  </Link>
                </GlowCard>
              </motion.div>
            ))}
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
          <div style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.6 }}>
            {roleType === 'brand' ? (
              <span>
                <strong>Brand Connection & Success Policy:</strong> Post gigs for free. Unlock shortlisted creator contact rate cards for{' '}
                <strong style={{ color: 'var(--foreground)', fontWeight: 700 }}>{formatPrice(platformPricing.brand.connectionUnlock.INR, 'INR')}</strong> (or{' '}
                <strong style={{ color: 'var(--foreground)', fontWeight: 700 }}>{formatPrice(platformPricing.brand.connectionUnlock.USD, 'USD')}</strong>).
                A 5% success fee is only charged when creator milestone deliverables are completed.
              </span>
            ) : (
              <span>
                <strong>Creator Onboarding & Commission Policy:</strong> Submit applications for free. If you are shortlisted, verify connection details for{' '}
                <strong style={{ color: 'var(--foreground)', fontWeight: 700 }}>{formatPrice(platformPricing.creator.connectionShortlist.INR, 'INR')}</strong> (or{' '}
                <strong style={{ color: 'var(--foreground)', fontWeight: 700 }}>{formatPrice(platformPricing.creator.connectionShortlist.USD, 'USD')}</strong>).
                A standard 10% platform transaction fee applies on contract milestones.
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
