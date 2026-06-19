'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowUpRight, Info } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { formatPrice } from '@/lib/currency';
import { creatorPricingPlans, platformPricing } from '@/data/pricing';
import GlowCard from '@/components/animation/GlowCard';

export default function PricingPreview() {
  const { currency } = useCurrency();
  const [roleType, setRoleType] = useState<'brand' | 'creator'>('brand');

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
      ctaText: 'Book Scale Package',
      ctaLink: '/brand/post-gig?package=scale'
    }
  ];

  return (
    <section 
      id="pricing"
      style={{
        padding: '120px 20px',
        backgroundColor: '#fafaf9', // Seamless background with testimonials and FAQ
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px',
        }}
      >
        {/* Dynamic Column Grid Layout */}
        <div 
          className={`grid grid-cols-1 ${roleType === 'brand' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8 items-stretch`}
          style={{
            display: 'grid',
            gap: '32px',
          }}
        >
          {/* Column 1: Header Block & Toggle & Custom Card */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '40px',
              textAlign: 'left',
            }}
          >
            {/* Header, Badge, Switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
              {/* Pink PRICING Pill Badge */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#ffa8f2', // Soft pink background matching mockup
                  padding: '6px 14px',
                  borderRadius: '20px',
                  color: '#1c1917',
                  fontSize: '11px',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Pricing
              </div>

              {/* Title */}
              <h2 
                style={{
                  fontSize: 'clamp(36px, 4vw, 46px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: '#1c1917',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Flexible pricing for every stage
              </h2>

              {/* Role Toggle Switch */}
              <div 
                style={{
                  display: 'inline-flex',
                  padding: '4px',
                  backgroundColor: '#e5e5e5', // Light grey pill capsule
                  borderRadius: '30px',
                  border: '2px solid #2563eb', // Solid blue outline
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setRoleType('brand')}
                  style={{
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '24px',
                    backgroundColor: roleType === 'brand' ? '#ffffff' : 'transparent',
                    color: '#1c1917',
                    boxShadow: roleType === 'brand' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '24px',
                    backgroundColor: roleType === 'creator' ? '#ffffff' : 'transparent',
                    color: '#1c1917',
                    boxShadow: roleType === 'creator' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Creator Subscriptions
                </button>
              </div>
            </div>

            {/* Custom Plan Card: Desktop Bottom */}
            <div className="hidden lg:block">
              <CustomPlanCard />
            </div>
          </div>

          {/* Cards Area */}
          <AnimatePresence mode="wait">
            {roleType === 'brand' ? (
              // Brands packages (3 cards)
              <React.Fragment key="brand">
                {brandPackages.map((pkg) => {
                  const amount = currency === 'INR' ? pkg.price.INR : pkg.price.USD;
                  const priceText = formatPrice(amount, currency);
                  const subtext = currency === 'INR' ? pkg.total.INR : pkg.total.USD;

                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{ height: '100%' }}
                    >
                      <GlowCard
                        glowColor={pkg.popular ? 'rgba(255, 255, 255, 0.04)' : 'rgba(28, 25, 22, 0.04)'}
                        style={{
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '24px',
                          height: '100%',
                          borderRadius: '32px',
                          backgroundColor: pkg.popular ? '#1c1917' : '#ffffff',
                          border: pkg.popular ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(28, 25, 22, 0.06)',
                          boxShadow: pkg.popular ? '0 20px 40px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.02)',
                          position: 'relative',
                        }}
                        tiltActive={true}
                      >
                        {pkg.popular && (
                          <div 
                            style={{
                              position: 'absolute',
                              top: '20px',
                              right: '20px',
                              backgroundColor: '#ffa8f2',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              color: '#1c1917',
                              fontSize: '10px',
                              fontWeight: 900,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            Popular
                          </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <h3 style={{ color: pkg.popular ? '#ffffff' : '#1c1917', fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
                            {pkg.name}
                          </h3>
                          <p style={{ color: pkg.popular ? '#a8a29e' : '#78716c', fontSize: '13.5px', lineHeight: 1.4 }}>
                            {pkg.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '42px', fontWeight: 900, color: pkg.popular ? '#ffffff' : '#1c1917', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                              {priceText}
                            </span>
                            <span style={{ color: pkg.popular ? '#a8a29e' : '#78716c', fontSize: '13.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                              /{pkg.billing}
                            </span>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: pkg.popular ? '#ffa8f2' : 'rgb(219, 39, 119)' }}>
                            {subtext}
                          </span>
                        </div>

                        {/* Divider Line */}
                        <div style={{ height: '1px', backgroundColor: pkg.popular ? 'rgba(255, 255, 255, 0.08)' : 'rgba(28, 25, 22, 0.08)' }} />

                        {/* Features List */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1, padding: 0, margin: 0 }}>
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: pkg.popular ? '#e7e5e4' : '#1c1917', fontWeight: 500 }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: pkg.popular ? 'rgba(167, 139, 250, 0.3)' : '#d6d3d1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <Check size={12} style={{ color: '#ffffff', strokeWidth: 3 }} />
                              </div>
                              <span style={{ textAlign: 'left' }}>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Button CTA */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
                          <Link
                            href={pkg.ctaLink}
                            style={{
                              flexGrow: 1,
                              textAlign: 'center',
                              padding: '16px 24px',
                              borderRadius: '9999px',
                              fontWeight: 800,
                              fontSize: '14px',
                              backgroundColor: pkg.popular ? '#ffffff' : '#1c1917',
                              color: pkg.popular ? '#1c1917' : '#ffffff',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            className={pkg.popular ? 'hover:bg-stone-100' : 'hover:bg-black'}
                          >
                            {pkg.ctaText}
                          </Link>
                          <Link
                            href={pkg.ctaLink}
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '50%',
                              backgroundColor: '#ffa8f2',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              color: '#1c1917',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            className="hover:scale-105"
                          >
                            <ArrowUpRight size={22} style={{ strokeWidth: 2.5 }} />
                          </Link>
                        </div>
                      </GlowCard>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ) : (
              // Creators packages (2 cards)
              <React.Fragment key="creator">
                {creatorPricingPlans.map((plan) => {
                  const amount = plan.price[currency];
                  const priceText = formatPrice(amount, currency);

                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{ height: '100%' }}
                    >
                      <GlowCard
                        glowColor={plan.popular ? 'rgba(255, 255, 255, 0.04)' : 'rgba(28, 25, 22, 0.04)'}
                        style={{
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '24px',
                          height: '100%',
                          borderRadius: '32px',
                          backgroundColor: plan.popular ? '#1c1917' : '#ffffff',
                          border: plan.popular ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(28, 25, 22, 0.06)',
                          boxShadow: plan.popular ? '0 20px 40px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.02)',
                          position: 'relative',
                        }}
                        tiltActive={true}
                      >
                        {plan.popular && (
                          <div 
                            style={{
                              position: 'absolute',
                              top: '20px',
                              right: '20px',
                              backgroundColor: '#ffa8f2',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              color: '#1c1917',
                              fontSize: '10px',
                              fontWeight: 900,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            Popular
                          </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <h3 style={{ color: plan.popular ? '#ffffff' : '#1c1917', fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
                            {plan.name}
                          </h3>
                          <p style={{ color: plan.popular ? '#a8a29e' : '#78716c', fontSize: '13.5px', lineHeight: 1.4 }}>
                            {plan.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
                          <span style={{ fontSize: '42px', fontWeight: 900, color: plan.popular ? '#ffffff' : '#1c1917', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                            {priceText}
                          </span>
                          <span style={{ color: plan.popular ? '#a8a29e' : '#78716c', fontSize: '13.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                            /{plan.billing}
                          </span>
                        </div>

                        {/* Divider Line */}
                        <div style={{ height: '1px', backgroundColor: plan.popular ? 'rgba(255, 255, 255, 0.08)' : 'rgba(28, 25, 22, 0.08)' }} />

                        {/* Features List */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1, padding: 0, margin: 0 }}>
                          {plan.features.map((feature, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: plan.popular ? '#e7e5e4' : '#1c1917', fontWeight: 500 }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: plan.popular ? 'rgba(167, 139, 250, 0.3)' : '#d6d3d1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <Check size={12} style={{ color: '#ffffff', strokeWidth: 3 }} />
                              </div>
                              <span style={{ textAlign: 'left' }}>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Button CTA */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
                          <Link
                            href={plan.ctaLink}
                            style={{
                              flexGrow: 1,
                              textAlign: 'center',
                              padding: '16px 24px',
                              borderRadius: '9999px',
                              fontWeight: 800,
                              fontSize: '14px',
                              backgroundColor: plan.popular ? '#ffffff' : '#1c1917',
                              color: plan.popular ? '#1c1917' : '#ffffff',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            className={plan.popular ? 'hover:bg-stone-100' : 'hover:bg-black'}
                          >
                            {plan.ctaText}
                          </Link>
                          <Link
                            href={plan.ctaLink}
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '50%',
                              backgroundColor: '#ffa8f2',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              color: '#1c1917',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            className="hover:scale-105"
                          >
                            <ArrowUpRight size={22} style={{ strokeWidth: 2.5 }} />
                          </Link>
                        </div>
                      </GlowCard>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            )}
          </AnimatePresence>

          {/* Custom Plan Card: Mobile Stack */}
          <div className="block lg:hidden">
            <CustomPlanCard />
          </div>
        </div>

        {/* Transaction policy banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            borderRadius: '24px',
            border: '1px solid rgba(79, 70, 229, 0.12)',
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

// Subcomponent: CustomPlanCard
function CustomPlanCard() {
  return (
    <Link
      href="/contact"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        width: '100%',
        maxWidth: '360px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="hover:border-stone-300 hover:shadow-md"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Avatar with online dot */}
        <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Support Headshot"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          {/* Green online dot */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              border: '2px solid #ffffff',
            }}
          />
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#1c1917' }}>
            Need custom plan?
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#78716c' }}>
            Let's Talk
          </span>
        </div>
      </div>

      {/* Circle button with arrow icon */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#f5f5f4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1c1917',
        }}
      >
        <ArrowUpRight size={18} style={{ strokeWidth: 2.5 }} />
      </div>
    </Link>
  );
}
