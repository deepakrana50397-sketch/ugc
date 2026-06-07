'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

function AnimatedCounter({ endValue }: { endValue: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, endValue, { 
        duration: 2.0, 
        ease: [0.16, 1, 0.3, 1] as const // Custom easeOutExpo
      });
      return controls.stop;
    }
  }, [isInView, endValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function ClientResults() {
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
        padding: '120px 24px',
        backgroundColor: '#F5F2EC', // Premium warm beige/off-white background matching the screenshot
        borderTop: '1px solid rgba(28, 25, 22, 0.08)',
        borderBottom: '1px solid rgba(28, 25, 22, 0.08)',
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
          gap: '120px', // Spacing between the two case studies
        }}
      >
        {/* Case Study 1: Glowhaus (Text Left, Video Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Metrics */}
          <motion.div 
            className="lg:col-span-7"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#E6E2DA',
                  color: '#1c1917',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Client results
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              style={{ 
                fontSize: 'clamp(36px, 5vw, 54px)', 
                fontWeight: 700, 
                color: '#1c1917',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
              variants={itemVariants}
            >
              Scaling a beauty brand with{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {/* Custom playhead/vinyl icon replacing the 'i' in 'with' */}
                <span>w</span>
                <span style={{ display: 'inline-flex', alignSelf: 'center', marginTop: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#1c1917" />
                    <circle cx="12" cy="12" r="3" fill="#F5F2EC" />
                    <path d="M12 12L17 17" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span>th</span>
              </span>{' '}
              <span 
                style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontStyle: 'italic', 
                  fontWeight: 500,
                }}
              >
                reels
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              style={{ 
                fontSize: '17px', 
                color: '#57534e',
                lineHeight: 1.6,
                maxWidth: '520px',
                fontFamily: 'var(--font-sans)',
              }}
              variants={itemVariants}
            >
              Beauty brand Glowhaus came to us with great products but low engagement. We developed a UGC-driven content strategy focused on short-form video, optimized for Reels.
            </motion.p>

            {/* Metrics */}
            <motion.div 
              style={{ 
                display: 'flex', 
                gap: '48px', 
                marginTop: '16px',
                flexWrap: 'wrap',
              }}
              variants={itemVariants}
            >
              {/* Metric 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: 800, 
                    color: '#1c1917',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter endValue={128} />
                  <span>K</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1c1917', fontFamily: 'var(--font-display)' }}>
                    Reel Views
                  </span>
                  <span style={{ fontSize: '14px', color: '#78716c', fontFamily: 'var(--font-sans)' }}>
                    In the first 30 days
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: 800, 
                    color: '#1c1917',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter endValue={245} />
                  <span>%</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1c1917', fontFamily: 'var(--font-display)' }}>
                    Engagement
                  </span>
                  <span style={{ fontSize: '14px', color: '#78716c', fontFamily: 'var(--font-sans)' }}>
                    Compared to previous month
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Video Card */}
          <motion.div 
            className="lg:col-span-5"
            style={{
              position: 'relative',
              width: '100%',
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
              src="https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4"
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
              <h3 
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: 'clamp(36px, 6vw, 54px)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                Glowhaus
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Case Study 2: Theo (Video Left, Text Right on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Video Card (order-2 on mobile, lg:order-1 on desktop) */}
          <motion.div 
            className="lg:col-span-5 order-2 lg:order-1"
            style={{
              position: 'relative',
              width: '100%',
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
              src="https://framerusercontent.com/assets/EnIr8BLCc5cHl97sMAoX13URc.mp4"
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
              {/* Elegant handwritten Signature overlay text "theo" using Dancing Script */}
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
                theo
              </h3>
            </div>
          </motion.div>

          {/* Right Column: Text & Metrics (order-1 on mobile, lg:order-2 on desktop) */}
          <motion.div 
            className="lg:col-span-7 order-1 lg:order-2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#E6E2DA',
                  color: '#1c1917',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Client results
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              style={{ 
                fontSize: 'clamp(36px, 5vw, 54px)', 
                fontWeight: 700, 
                color: '#1c1917',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
              variants={itemVariants}
            >
              Growing a clothing{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {/* Custom playhead/vinyl icon replacing the 'i' in 'with' */}
                <span>brand w</span>
                <span style={{ display: 'inline-flex', alignSelf: 'center', marginTop: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#1c1917" />
                    <circle cx="12" cy="12" r="3" fill="#F5F2EC" />
                    <path d="M12 12L17 17" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span>th</span>
              </span>{' '}
              <span 
                style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontStyle: 'italic', 
                  fontWeight: 500,
                }}
              >
                video
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              style={{ 
                fontSize: '17px', 
                color: '#57534e',
                lineHeight: 1.6,
                maxWidth: '520px',
                fontFamily: 'var(--font-sans)',
              }}
              variants={itemVariants}
            >
              Theo came to us ahead of a new collection launch, looking to grow their reach and build anticipation. We combined UGC with light influencer seeding and short-form video.
            </motion.p>

            {/* Metrics */}
            <motion.div 
              style={{ 
                display: 'flex', 
                gap: '48px', 
                marginTop: '16px',
                flexWrap: 'wrap',
              }}
              variants={itemVariants}
            >
              {/* Metric 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: 800, 
                    color: '#1c1917',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter endValue={18} />
                  <span>K</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1c1917', fontFamily: 'var(--font-display)' }}>
                    Followers
                  </span>
                  <span style={{ fontSize: '14px', color: '#78716c', fontFamily: 'var(--font-sans)' }}>
                    In six weeks
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: 800, 
                    color: '#1c1917',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter endValue={156} />
                  <span>%</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#1c1917', fontFamily: 'var(--font-display)' }}>
                    Engagement
                  </span>
                  <span style={{ fontSize: '14px', color: '#78716c', fontFamily: 'var(--font-sans)' }}>
                    Compared to previous month
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
