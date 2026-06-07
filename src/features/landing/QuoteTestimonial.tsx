'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteTestimonial() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <section 
      style={{
        padding: '100px 24px 80px 24px',
        backgroundColor: '#F5F2EC', // Same warm cream/beige background matching client results
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '64px',
        }}
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Quote Card (lg:col-span-7) */}
          <motion.div 
            className="lg:col-span-7 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.div
              style={{
                position: 'relative',
                backgroundColor: '#FAF8F5', // Slightly lighter cream/white card background
                borderRadius: '24px',
                padding: '72px 48px 64px 48px',
                border: '1px solid rgba(28, 25, 22, 0.04)',
                boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.03)',
                width: '100%',
              }}
              variants={itemVariants}
            >
              {/* Quote Mark Badge overlapping the border */}
              <div
                style={{
                  position: 'absolute',
                  top: '-28px',
                  left: '48px',
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#000000',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.15)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M9.5 9.5C9.5 8.12 8.38 7 7 7C5.62 7 4.5 8.12 4.5 9.5C4.5 13 7 16 10 17L10.5 15.5C8.5 14.5 8 12.5 8 11.5C8.5 11.5 9.5 11 9.5 9.5ZM17.5 9.5C17.5 8.12 16.38 7 15 7C13.62 7 12.5 8.12 12.5 9.5C12.5 13 15 16 18 17L18.5 15.5C16.5 14.5 16 12.5 16 11.5C16.5 11.5 17.5 11 17.5 9.5Z" 
                    fill="#ffffff" 
                  />
                </svg>
              </div>

              {/* Quote Text */}
              <p 
                style={{
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  fontWeight: 600,
                  color: '#1c1917',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  marginBottom: '32px',
                }}
              >
                They took social media off our plate completely and our audience has never been{' '}
                <span 
                  style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontStyle: 'italic', 
                    fontWeight: 500,
                  }}
                >
                  more engaged.
                </span>
              </p>

              {/* Author / Company Info */}
              <div>
                <span 
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#78716c', // Warm stone gray
                    letterSpacing: '-0.01em',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Elena Chen • Bloom Skincare
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Video Card (lg:col-span-5) */}
          <motion.div 
            className="lg:col-span-5 w-full"
            style={{
              position: 'relative',
              maxWidth: '440px',
              aspectRatio: '4 / 5',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
              justifySelf: 'center',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <video
              src="https://framerusercontent.com/assets/6XfEmiD6m02yjpZAyc2nDmmOA.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            <div 
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none',
              }}
            >
              {/* Cursive Brand logo overlay "Bloom" using Dancing Script */}
              <h3 
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 600,
                  fontSize: 'clamp(48px, 8vw, 76px)',
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  textShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                Bloom
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Decorative Center Dot */}
        <motion.div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#000000',
            marginTop: '16px',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </section>
  );
}
