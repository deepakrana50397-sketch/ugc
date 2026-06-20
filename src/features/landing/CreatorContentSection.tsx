'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CreatorContentSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"]
  });

  // Lavender Ribbon SVG path scroll offset animation
  const ribbonDasharray = 1000;
  const ribbonDashoffset = useTransform(scrollYProgress, [0.1, 0.6], [ribbonDasharray, 0]);

  // Video card tilt / parallax floating effect on scroll
  const videoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      id="creator-content-section"
      className="relative w-full flex items-center justify-center"
      style={{ paddingTop: '120px', paddingBottom: '120px', paddingLeft: '20px', paddingRight: '20px' }}
    >
      <div className="max-w-[1200px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 section-grid-gap items-center">

        {/* Left Column: Creator Economy Section */}
        <div className="flex flex-col justify-center gap-6 relative z-10 text-left order-2 md:order-1 md-ml-auto-custom max-w-[480px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
            style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-display)' }}
          >
            Earn in the Creator Economy
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base leading-relaxed opacity-75"
            style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-sans)', margin: 0 }}
          >
            Leverage your skills, background, or local community presence to land high-paying gigs and campaigns that match your profile.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            {[
              { emoji: '🎓', role: 'Students', gig: 'Campus gigs' },
              { emoji: '🎬', role: 'Creators', gig: 'UGC work' },
              { emoji: '👩', role: 'Women', gig: 'Community campaigns' },
              { emoji: '✂️', role: 'Editors', gig: 'Production projects' }
            ].map((item, idx) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(28, 25, 22, 0.06)',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.01)'
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.emoji}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'rgb(28, 25, 23)', width: '90px' }}>{item.role}</span>
                <span style={{ fontSize: '14px', color: '#7c3aed', fontWeight: 700 }}>→</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#44403c' }}>{item.gig}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Video Card & Stats Card Overlay */}
        <div className="flex justify-center md:justify-start relative w-full order-1 md:order-2">

          {/* Decorative Lavender Loop SVG ribbon path behind the video card */}
          <div className="absolute -right-[15%] -top-[15%] w-[130%] h-[130%] pointer-events-none z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              fill="none"
              overflow="visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                d="M 100 -50 C 150 100, 250 150, 300 200 C 400 300, 520 300, 480 400 C 460 450, 380 420, 350 380 C 300 320, 350 200, 470 250 C 530 280, 550 400, 580 450"
                stroke="var(--token-36691d6b-fd51-40c3-90d4-8c2b90652b0a, rgb(170, 148, 255))"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: ribbonDasharray,
                  strokeDashoffset: ribbonDashoffset
                }}
              />
            </svg>
          </div>

          {/* Floating Video Wrapper */}
          <motion.div
            style={{ y: videoY }}
            className="relative w-full max-w-[450px] aspect-[4/3] z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-stone-100">
              <video
                src="https://framerusercontent.com/assets/aPqDWQqPVRqGBPXrnqHff4IYY.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlaid Lavender Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
              className="absolute z-20 select-none"
              style={{
                backgroundColor: 'rgb(170, 148, 255)',
                right: '-8%',
                bottom: '-5%',
                width: '190px',
                padding: '20px',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(170, 148, 255, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <span
                className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none mb-0.5"
                style={{ color: 'rgb(28, 25, 23)', fontFamily: 'var(--font-display)' }}
              >
                4.2M
              </span>
              <span
                className="text-[12px] md:text-xs font-semibold leading-tight"
                style={{ color: '#4f3c9e', fontFamily: 'var(--font-sans)' }}
              >
                Impressions
              </span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
