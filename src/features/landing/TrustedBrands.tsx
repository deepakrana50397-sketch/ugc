'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { landingPageContent } from '@/data/landing';

export default function TrustedBrands() {
  const { trustedBy } = landingPageContent;

  // Duplicate logos for seamless marquee effect
  const marqueeLogos = [...trustedBy.logos, ...trustedBy.logos, ...trustedBy.logos, ...trustedBy.logos];

  return (
    <section 
      style={{
        padding: '50px 0',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <motion.p 
          style={{ 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            color: 'var(--muted)',
            fontWeight: 600,
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {trustedBy.title}
        </motion.p>
        
        {/* Infinite Marquee Container */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <motion.div
            style={{
              display: 'flex',
              gap: '60px',
              padding: '10px 0',
            }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 25,
              repeat: Infinity,
            }}
          >
            {marqueeLogos.map((logo, idx) => (
              <div 
                key={`${logo}-${idx}`} 
                style={{ 
                  fontSize: '20px', 
                  fontWeight: 700, 
                  color: '#78716c', 
                  letterSpacing: '-0.03em',
                  fontFamily: 'var(--font-display)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'default',
                }}
                className="brand-logo-item"
              >
                <div 
                  style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    backgroundColor: idx % 2 === 0 ? 'rgb(79, 70, 229)' : 'rgb(219, 39, 119)' 
                  }} 
                />
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
