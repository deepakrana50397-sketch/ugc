'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { landingPageContent } from '@/data/landing';
import { PlusCircle, Sparkles } from 'lucide-react';
import Magnetic from '@/components/animation/Magnetic';

export default function FinalCta() {
  const { cta } = landingPageContent;

  return (
    <section 
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Background Glowing Ambient Circles */}
      <div 
        className="morphing-blob-1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div 
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          className="glass-panel"
          style={{
            padding: '72px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
            borderRadius: '24px',
            border: '1px solid rgba(79, 70, 229, 0.2)',
            background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.04) 0%, rgba(219, 39, 119, 0.02) 100%)',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.04), var(--shadow-glow)',
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        >
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', color: 'var(--foreground)', maxWidth: '780px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {cta.title}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.6, maxWidth: '600px' }}>
            {cta.subtitle}
          </p>

          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '20px', 
              justifyContent: 'center', 
              marginTop: '12px',
              width: '100%',
              maxWidth: '640px'
            }}
          >
            <Magnetic strength={0.15}>
              <Link
                href="/brand/post-gig"
                style={{
                  backgroundColor: 'rgb(79, 70, 229)',
                  color: '#ffffff',
                  padding: '16px 32px',
                  borderRadius: '30px',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px -6px rgba(79, 70, 229, 0.4)',
                }}
                className="glow-button"
              >
                <PlusCircle size={18} />
                <span>{cta.brandCta}</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.15}>
              <Link
                href="/register?role=creator"
                style={{
                  backgroundColor: 'rgba(219, 39, 119, 0.06)',
                  border: '1px solid rgba(219, 39, 119, 0.15)',
                  color: 'rgb(219, 39, 119)',
                  padding: '16px 32px',
                  borderRadius: '30px',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(4px)',
                }}
                className="hover-bg-pink-full"
              >
                <Sparkles size={18} />
                <span>{cta.creatorCta}</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
