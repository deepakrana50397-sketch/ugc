'use client';

import React, { useState } from 'react';
import { brandPricingPlans, creatorPricingPlans, platformPricing } from '@/data/pricing';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice, formatPrice } from '@/lib/currency';
import { Check, Info, ShieldAlert } from 'lucide-react';

export default function PricingPage() {
  const { currency } = useCurrency();
  const [roleType, setRoleType] = useState<'brand' | 'creator'>('brand');

  const plans = roleType === 'brand' ? brandPricingPlans : creatorPricingPlans;

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '80px 24px 100px 24px' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '56px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800 }}>
          Simple & <span className="accent-gradient-text">Transparent Pricing</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          No setup charges. No hefty commissions. Choose your path and pay only when connections are unlocked.
        </p>

        {/* Brand vs Creator Toggle */}
        <div 
          style={{
            display: 'inline-flex',
            padding: '4px',
            backgroundColor: 'rgba(0,0,0,0.02)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            alignSelf: 'center',
            marginTop: '12px'
          }}
        >
          <button
            onClick={() => setRoleType('brand')}
            style={{
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '20px',
              backgroundColor: roleType === 'brand' ? 'rgb(var(--primary))' : 'transparent',
              color: roleType === 'brand' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s',
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
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '20px',
              backgroundColor: roleType === 'creator' ? 'rgb(var(--primary))' : 'transparent',
              color: roleType === 'creator' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            I am a Creator
          </button>
        </div>
      </div>

      {/* Grid of plans */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
          marginBottom: '56px',
        }}
        className="stagger-container"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="glass-panel"
            style={{
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              border: plan.popular ? '2px solid rgb(var(--primary))' : '1px solid var(--card-border)',
              position: 'relative',
              borderRadius: '16px',
            }}
          >
            {plan.popular && (
              <span
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  backgroundColor: 'rgb(var(--primary))',
                  color: '#ffffff',
                  padding: '4px 14px',
                  borderRadius: '12px',
                }}
              >
                Most Popular
              </span>
            )}

            {/* Plan Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ color: '#0f172a', fontSize: '22px', fontWeight: 700 }}>{plan.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: 1.5 }}>{plan.description}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '12px' }}>
                <span style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-display)' }}>
                  {displayPrice(plan.price, currency)}
                </span>
                <span style={{ color: '#64748b', fontSize: '14px' }}>
                  /{plan.billing}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: '#475569' }}>
                  <Check size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={plan.ctaLink}
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: 600,
                fontSize: '14.5px',
                backgroundColor: plan.popular ? 'rgb(var(--primary))' : 'rgba(0, 0, 0, 0.06)',
                color: '#0f172a',
                border: plan.popular ? 'none' : '1px solid var(--card-border)',
                transition: 'all 0.2s',
              }}
              className={plan.popular ? 'glow-button' : 'hover-bg-white-01'}
            >
              {plan.ctaText}
            </a>
          </div>
        ))}
      </div>

      {/* Transaction Details Alert Panel */}
      <div 
        className="glass-panel"
        style={{
          maxWidth: '750px',
          margin: '0 auto',
          width: '100%',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          border: '1px solid rgba(124, 58, 237, 0.1)',
          backgroundColor: 'rgba(124, 58, 237, 0.02)',
        }}
      >
        <Info size={24} style={{ color: 'rgb(var(--primary))', flexShrink: 0 }} />
        <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>
          {roleType === 'brand' ? (
            <span>
              <strong>Brand Milestones Vetting:</strong> Gigs are posted at no cost. You only pay to unlock applicant contact information ({formatPrice(platformPricing.brand.connectionUnlock.INR, 'INR')} / {formatPrice(platformPricing.brand.connectionUnlock.USD, 'USD')}). Additionally, a 5% platform success fee is applied during escrow settlement once creator files are successfully verified.
            </span>
          ) : (
            <span>
              <strong>Creator Milestones Payouts:</strong> Applying is free of cost. Shortlisted creators pay a verification connection unlock fee ({formatPrice(platformPricing.creator.connectionShortlist.INR, 'INR')} / {formatPrice(platformPricing.creator.connectionShortlist.USD, 'USD')}) to retrieve client phone/email data. Standard platform payout service fee of 10% is processed at completion.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
